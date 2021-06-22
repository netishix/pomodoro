import {createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'
import { ISettings } from '../../types/models';
import {
  DEFAULT_SETTINGS,
} from "../../constants";

type SliceState = ISettings

const initialState: SliceState = DEFAULT_SETTINGS;

const slice: Slice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    settingsChange(state: SliceState, action: PayloadAction<ISettings>) {
      return action.payload;
    },
  }
})

// Selectors
export const getSettings = (state: any): ISettings => state.settings;

// Reducers and actions
export const {
  settingsChange,
} = slice.actions
export default slice.reducer
