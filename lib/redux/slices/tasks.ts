import {createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'
import { ITask } from '../../types/models';

type SliceState = ITask[]

const initialState: SliceState = [];

const slice: Slice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addedTask(state: SliceState, action: PayloadAction<ITask>) {
      const newTask = action.payload;
      state.push(newTask);
    },
    toggledTaskStatus(state: SliceState, action: PayloadAction<string>) {
      const targetTaskId = action.payload;
      const targetIdx = state.findIndex((task) => task.id === targetTaskId);
      state[targetIdx].finished = !state[targetIdx].finished;
    },
    removedTask(state: SliceState, action: PayloadAction<string>) {
      const targetTaskId = action.payload;
      const targetIdx = state.findIndex((task) => task.id === targetTaskId);
      state.splice(targetIdx, 1)
    },
  }
})

// Selectors
export const getTasks = (state: any) => state.tasks;

// Reducers and actions
export const {
  addedTask,
  toggledTaskStatus,
  removedTask,
} = slice.actions
export default slice.reducer
