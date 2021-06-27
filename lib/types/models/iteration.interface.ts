export default interface IIteration {
  id: string;
  type: 'pomodoro' | 'shortBreak' | 'longBreak';
  percentageOfTask: string;
  totalMinutes: number;
  secondsLeft: number;
  active: boolean;
  started: boolean;
  running: boolean;
  finished: boolean;
}
