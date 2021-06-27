import {createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'
import {IIteration, ISettings, ITask} from '../../../types/models';
import {DEFAULT_SETTINGS, DEFAULT_TASKS} from "../../../constants";
import {IReduxStore} from "../../../types/redux/store.interface";
import {TaskFactory} from "../../../utils/TaskFactory";

type SliceState = IReduxStore['pomodoro'];

const initialState: SliceState = {
  settings: DEFAULT_SETTINGS,
  tasks: DEFAULT_TASKS,
};

const slice: Slice = createSlice({
  name: 'pomodoro',
  initialState,
  reducers: {
    changedSettings(state: SliceState, action: PayloadAction<ISettings>) {
      state.settings = action.payload;
      // Update tasks based on new settings
      state.tasks.forEach((task, idx) => {
        state.tasks[idx] = TaskFactory.updateTaskBasedOnNewSettings(task, state.settings);
      });
    },
    addedTask(state: SliceState, action: PayloadAction<ITask>) {
      const newTask = action.payload;
      state.tasks.push(newTask);
    },
    activatedTask(state: SliceState, action: PayloadAction<string>) {
      const targetTaskId = action.payload;
      state.tasks.forEach((task) => {
        task.active = task.id === targetTaskId;
      });
    },
    toggledFinishedTask(state: SliceState, action: PayloadAction<string>) {
      const targetTaskId = action.payload;
      const targetIdx = state.tasks.findIndex((task) => task.id === targetTaskId);
      const isFinished = state.tasks[targetIdx].finished;
      if (!isFinished) {
        state.tasks[targetIdx].finished = true;
        state.tasks[targetIdx].active = false;
      } else {
        state.tasks[targetIdx].finished = false;
      }
    },
    removedTask(state: SliceState, action: PayloadAction<string>) {
      const targetTaskId = action.payload;
      const targetIdx = state.tasks.findIndex((task) => task.id === targetTaskId);
      if (targetIdx !== -1) {
        state.tasks.splice(targetIdx, 1);
      }
    },
    updatedIteration(state: SliceState, action: PayloadAction<{iterationId: string; updatedIteration: IIteration}>) {
      const {iterationId, updatedIteration} = action.payload;
      const {targetTaskIdx, targetIterationIdx} = findIterationIdxs(state, iterationId);
      if (targetTaskIdx !== -1 && targetIterationIdx !== -1) {
        state.tasks[targetTaskIdx].schedule[targetIterationIdx] = updatedIteration;
      }
    },
    finishedIteration(state: SliceState, action: PayloadAction<string>) {
      const iterationId = action.payload;
      const {targetTaskIdx, targetIterationIdx} = findIterationIdxs(state, iterationId);
      const currentTask = state.tasks[targetTaskIdx];
      // Deactivate current iteration
      const currentIteration = currentTask.schedule[targetIterationIdx];
      currentIteration.active = false;
      // Activate next iteration (could be for the same task or a different one)
      let nextIteration;
      const wasLastIteration = targetIterationIdx === currentTask.schedule.length - 1;
      if (!wasLastIteration) {
        // Another iteration is available for the current task
        nextIteration = currentTask.schedule[targetIterationIdx + 1];
        nextIteration.active = true;
        // Autostart iteration
        nextIteration.started = true
        nextIteration.running = true;
      } else {
        // All iterations have been finished for the current task
        // Deactivate current task and move to the following task
        currentTask.finished = true;
        currentTask.active = false;
      }
    }
  }
});

// Util functions
function findIterationIdxs(state: SliceState, iterationId: string): {targetIterationIdx: number; targetTaskIdx: number} {
  let targetTaskIdx!: number;
  let targetIterationIdx!: number;
  state.tasks.forEach((task, taskIdx) => {
    targetIterationIdx = task.schedule.findIndex((iteration) => {
      return iteration.id === iterationId;
    });
    if (targetIterationIdx !== -1) {
      targetTaskIdx = taskIdx;
    }
  });
  return {targetTaskIdx, targetIterationIdx};
}

// Reducers and actions
export const {
  changedSettings,
  addedTask,
  activatedTask,
  toggledFinishedTask,
  removedTask,
  updatedIteration,
  finishedIteration
} = slice.actions;
export default slice.reducer
