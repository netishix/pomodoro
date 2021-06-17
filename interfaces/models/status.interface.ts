export interface IStatus {
  mode: 'pomodoro' | 'shortBreak' | 'longBreak';
  started: boolean;
  running: boolean;
  secondsLeft: number;
  currentTaskId: string | null;
}
