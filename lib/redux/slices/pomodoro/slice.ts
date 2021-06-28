import {createSlice, current, PayloadAction, Slice} from '@reduxjs/toolkit'
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
      // Pause active iteration if any
      let activeIteration;
      const activeTask = state.tasks.find(task => task.active);
      if (activeTask) {
        activeIteration = activeTask.schedule.find((iteration) => iteration.active);
        if (activeIteration) {
          console.log('paused');
          activeIteration.running = false;
        }
      }
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
      const {taskIdx, iterationIdx} = findIterationIdx(state, iterationId);
      if (taskIdx !== -1 && iterationIdx !== -1) {
        state.tasks[taskIdx].schedule[iterationIdx] = updatedIteration;
      }
    },
    finishedIteration(state: SliceState, action: PayloadAction<string>) {
      const iterationId = action.payload;
      const {taskIdx, iterationIdx} = findIterationIdx(state, iterationId);
      const currentTask = state.tasks[taskIdx];
      // Deactivate current iteration
      const currentIteration = currentTask.schedule[iterationIdx];
      currentIteration.active = false;
      // Activate next iteration (could be for the same task or a different one)
      let nextIteration;
      const wasLastIteration = iterationIdx === currentTask.schedule.length - 1;
      if (!wasLastIteration) {
        // Another iteration is available for the current task
        nextIteration = currentTask.schedule[iterationIdx + 1];
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
function findIterationIdx(state: SliceState, iterationId: string): {taskIdx: number; iterationIdx: number} {
  let taskIdx!: number;
  let iterationIdx!: number;
  state.tasks.forEach((task, idx1) => {
    task.schedule.forEach((iteration, idx2) => {
      if (iteration.id === iterationId) {
        taskIdx = idx1;
        iterationIdx = idx2;
      }
    });
  });
  return {taskIdx, iterationIdx};
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
