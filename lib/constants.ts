import {ISettings, ICountdown} from "./types/models";

export const VERSION = 'v0.6.0';
export const MODE_POMODORO_DEFAULT_MINUTES = 25;
export const MODE_SHORT_BREAK_DEFAULT_MINUTES = 5;
export const MODE_LONG_BREAK_DEFAULT_MINUTES = 15;
export const DEFAULT_SETTINGS: ISettings = {
  pomodoroMinutes: MODE_POMODORO_DEFAULT_MINUTES,
  shortBreakMinutes: MODE_SHORT_BREAK_DEFAULT_MINUTES,
  longBreakMinutes: MODE_LONG_BREAK_DEFAULT_MINUTES,
  soundId: 1,
}
export const DEFAULT_COUNTDOWN: ICountdown = {
  mode: 'pomodoro',
  started: false,
  running: false,
  finished: false,
  secondsLeft: MODE_POMODORO_DEFAULT_MINUTES * 60,
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
