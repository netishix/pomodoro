import {createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'
import {ISettings, ICountdown, ITask} from '../../types/models';
import {DEFAULT_COUNTDOWN, DEFAULT_SETTINGS} from "../../constants";

type SliceState = {
  countdown: ICountdown;
  settings: ISettings;
  tasks: ITask[];
};

const initialState: SliceState = {
  countdown: DEFAULT_COUNTDOWN,
  settings: DEFAULT_SETTINGS,
  tasks: [],
};

const slice: Slice = createSlice({
  name: 'pomodoro',
  initialState,
  reducers: {
    changedCountdown(state: SliceState, action: PayloadAction<ICountdown>) {
      state.countdown = action.payload;
    },
    changedSettings(state: SliceState, action: PayloadAction<ISettings>) {
      state.settings = action.payload;
      if (!state.countdown.started) {
        state.countdown.secondsLeft = getSecondsLeftForMode(state.countdown.mode, state.settings);
      }
    },
    addedTask(state: SliceState, action: PayloadAction<ITask>) {
      const newTask = action.payload;
      state.tasks.push(newTask);
    },
    toggledTaskStatus(state: SliceState, action: PayloadAction<string>) {
      const targetTaskId = action.payload;
      const targetIdx = state.tasks.findIndex((task) => task.id === targetTaskId);
      state.tasks[targetIdx].finished = !state.tasks[targetIdx].finished;
    },
    removedTask(state: SliceState, action: PayloadAction<string>) {
      const targetTaskId = action.payload;
      const targetIdx = state.tasks.findIndex((task) => task.id === targetTaskId);
      state.tasks.splice(targetIdx, 1)
    },
  }
});

function getSecondsLeftForMode(mode: string, currentSettings: ISettings) {
  let secondsLeft: number;
  switch (mode) {
    case 'pomodoro':
      secondsLeft = currentSettings.pomodoroMinutes * 60;
      break;
    case 'shortBreak':
      secondsLeft = currentSettings.shortBreakMinutes * 60;
      break;
    case 'longBreak':
      secondsLeft = currentSettings.longBreakMinutes * 60;
      break;
  }
  return secondsLeft!;
}

// Selectors
export const getCountdown = (state: any): ICountdown => state.pomodoro.countdown;
export const getSettings = (state: any): ISettings => state.pomodoro.settings;
export const getTasks = (state: any): ITask[] => state.pomodoro.tasks;

// Reducers and actions
export const {
  changedCountdown,
  changedSettings,
  addedTask,
  toggledTaskStatus,
  removedTask,
} = slice.actions;
export default slice.reducer
