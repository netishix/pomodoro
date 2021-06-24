export default interface ICountdown {
  mode: 'pomodoro' | 'shortBreak' | 'longBreak';
  secondsLeft: number;
  timeLeft?: string;
  started: boolean;
  running: boolean;
  finished: boolean;
}
