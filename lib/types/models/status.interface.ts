import ITask from "./task.interface";

export default interface IStatus {
  mode: 'pomodoro' | 'shortBreak' | 'longBreak';
  started: boolean;
  running: boolean;
  finished: boolean;
  secondsLeft: number;
  currentTask: ITask | null;
}
