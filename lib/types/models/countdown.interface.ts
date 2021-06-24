export default interface ICountdown {
  mode: 'pomodoro' | 'shortBreak' | 'longBreak';
  secondsLeft: number;
  started: boolean;
  running: boolean;
  finished: boolean;
}
