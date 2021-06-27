import {ISettings, ITask} from "../models";

export interface IReduxStore {
  pomodoro: {
    settings: ISettings;
    tasks: ITask[];
  }
}

