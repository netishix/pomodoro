import {IReduxStore} from "../../../types/redux/store.interface";
import {IIteration, ISettings, ITask} from "../../../types/models";
import {AVAILABLE_SOUNDS} from "../../../constants";

export const getSettings = (state: IReduxStore): ISettings => state.pomodoro.settings;
export const getSoundFile = (state: IReduxStore): string => {
  const sound = AVAILABLE_SOUNDS.find((sound) => sound.id === state.pomodoro.settings.soundId);
  return sound!.file;
}
export const getTasks = (state: IReduxStore): ITask[] => state.pomodoro.tasks;
export const getActiveTask = (state: IReduxStore): ITask | null => {
  const activeTask = state.pomodoro.tasks.find(task => task.active);
  return activeTask || null;
};
export const getActiveIteration = (state: IReduxStore): IIteration | null => {
  let activeIteration;
  const activeTask = state.pomodoro.tasks.find(task => task.active);
  if (activeTask) {
     activeIteration = activeTask.schedule.find((iteration) => iteration.active);
  }
  return activeIteration || null;
};
