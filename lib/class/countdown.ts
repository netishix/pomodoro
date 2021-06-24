import moment from "moment";
import {ICountdown, ISettings} from "../types/models";
import {AVAILABLE_SOUNDS} from "../constants";

type CountdownEvent = 'changed' | 'finished';

export default class Countdown {

  private _interval!: NodeJS.Timeout;
  private _eventEmitter: EventTarget;
  public state: ICountdown;
  public settings: ISettings;

  constructor(state: ICountdown, settings: ISettings) {
    this.state = state;
    this.settings = settings;
    this._eventEmitter = new EventTarget();
    if (this.state.started && this.state.running) {
      this.resume();
    }
  }

  public start(): void {
    this.state.started = true;
    this.state.running = true;
    this._interval = this._createInterval();
    this._notifyChange('STARTED');
  }

  public pause(): void {
    this.state.running = false;
    clearInterval(this._interval);
    this._notifyChange('PAUSED');
  }

  public resume(): void {
    this.state.running = true;
    this._interval = this._createInterval();
    this._notifyChange('RESUMED');
  }

  private _finish(): void {
    this.state.finished = true;
    this.state.running = false;
    this.state.started = false;
    clearInterval(this._interval);
    this._playAlarm();
    setTimeout(() => {
      const nextMode = this.state.mode === 'pomodoro' ? 'shortBreak' : 'pomodoro';
      this.setMode(nextMode);
      this.start();
    }, 5000);
    this._notifyChange('FINISHED');
  }

  public setMode(newMode: Countdown['state']['mode']): void {
    let secondsLeft: number;
    switch (newMode) {
      case 'pomodoro':
        secondsLeft = this.settings.pomodoroMinutes * 60;
        break;
      case 'shortBreak':
        secondsLeft = this.settings.shortBreakMinutes * 60;
        break;
      case 'longBreak':
        secondsLeft = this.settings.longBreakMinutes * 60;
        break;
    }
    this.state.mode = newMode;
    this.state.secondsLeft = secondsLeft;
    this.state.started = false;
    this.state.running = false;
    this.state.finished = false;
    this._notifyChange('SET_MODE');
  }

  public setSettings(settings: ISettings) {
    this.settings = settings;
    if (!this.state.started) {
      this.setMode(this.state.mode);
    }
  }

  public getTimeLeft(): string {
    const duration = moment.utc(moment.duration(this.state.secondsLeft, "seconds").asMilliseconds());
    return duration.format("HH:mm:ss");
  }

  public on(eventName: CountdownEvent, callback: ((event : CustomEvent) => void)) {
    this._eventEmitter.addEventListener(eventName, ((event: CustomEvent) => {
      callback(event);
    }) as EventListener);
  }

  private _createInterval(): NodeJS.Timeout {
    return setInterval(() => {
      if (this.state.secondsLeft >= 1) {
        this.state.secondsLeft -= 1;
        this._notifyChange('SECOND_PASSED');
      } else {
        this._finish();
      }
    }, 1000);
  }

  private _notifyChange(description: string): void {
    const state = {...this.state};
    const customEvent = new CustomEvent('changed', {detail: {description, data: state}})
    this._eventEmitter.dispatchEvent(customEvent);
  }

  private _playAlarm() {
    const sound = AVAILABLE_SOUNDS.find((sound) => sound.id === this.settings.soundId);
    if (sound) {
      const alarm = new Audio(sound.file);
      alarm.play();
    }
  }



}
