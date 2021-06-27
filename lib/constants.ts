import {ISettings, ITask} from "./types/models";
import {TaskFactory} from "./utils/TaskFactory";

export const VERSION = 'v0.6.0';
export const MAX_POMODOROS_PER_TASK = 5;
export const DEFAULT_SETTINGS: ISettings = {
  time: {
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
  },
  soundId: 1,
}
export const DEFAULT_TASKS: ITask[] = [
  TaskFactory.create({title: 'Example: Design a new icon', pomodoros: 3, activated: true}, DEFAULT_SETTINGS)
]
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
