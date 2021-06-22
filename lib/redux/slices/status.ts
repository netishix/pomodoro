import {createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'
import {ISettings, IStatus, ITask} from '../../types/models';
import {DEFAULT_STATUS} from "../../constants";

type SliceState = IStatus;

const initialState: SliceState = DEFAULT_STATUS;

const slice: Slice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    startedTimer(state: SliceState, action: PayloadAction<null>): void {
      state.running = true;
      state.started = true;
      state.finished = false;
    },
    pausedTimer(state: SliceState, action: PayloadAction<null>): void {
      state.running = false;
    },
    resumedTimer(state: SliceState, action: PayloadAction<null>): void {
      state.running = true;
    },
    finishedTimer(state: SliceState, action: PayloadAction<null>): void {
      state.started = false;
      state.running = false;
      state.finished = true;
    },
    timeLeftChange(state: SliceState, action: PayloadAction<number>): void {
      state.secondsLeft = action.payload;
    },
    modeChange(state: SliceState, action: PayloadAction<{ mode: IStatus['mode']; settings: ISettings }>): void {
      const {mode, settings} = action.payload;
      let secondsLeft: number;
      switch (mode) {
        case 'pomodoro':
          secondsLeft = settings.pomodoroMinutes * 60;
          break;
        case 'shortBreak':
          secondsLeft = settings.shortBreakMinutes * 60;
          break;
        case 'longBreak':
          secondsLeft = settings.longBreakMinutes * 60;
          break;
      }
      state.started = false;
      state.running = false;
      state.mode = mode;
      state.secondsLeft = secondsLeft;
    },
    currentTaskChange(state: SliceState, action: PayloadAction<ITask>): void {
      state.currentTask = action.payload;
    },
  },
})

// Selectors
export const getStatus = (state: any): IStatus => state.status;

// Reducers and actions
export const {
  startedTimer,
  pausedTimer,
  resumedTimer,
  finishedTimer,
  timeLeftChange,
  modeChange,
  currentTaskChange
} = slice.actions
export default slice.reducer
