import {IStatus} from "../interfaces/models/status.interface";
import {ISettings} from "../interfaces/models/settings.interface";

export const DEFAULT_DATASOURCE = 'browser';
export const MODE_POMODORO_SECONDS = 25 * 60;
export const MODE_SHORT_BREAK_SECONDS = 5 * 60;
export const MODE_LONG_BREAK_SECONDS = 15 * 60;
export const DEFAULT_SETTINGS: ISettings = {
  pomodoroMinutes: 25,
  shortBreakMinutes: 5,
  longBreakMinutes: 15,
  soundId: 1,
};
export const DEFAULT_STATUS: IStatus = {
  mode: 'pomodoro',
  started: false,
  running: false,
  secondsLeft: MODE_POMODORO_SECONDS,
  currentTaskId: null
};
export const AVAILABLE_SOUNDS = [
  {
    id: 1,
    name: 'Kitchen',
    file: '/sounds/kitchen.mp3'
  },
  {
    id: 2,
    name: 'Clock',
    file: '/sounds/clock.mp3'
  },
  {
    id: 3,
    name: 'Nyan Cat',
    file: '/sounds/nyan_cat.mp3'
  },
  {
    id: 4,
    name: 'Epic Sax Guy',
    file: '/sounds/epic_sax_guy.mp3'
  }
]
