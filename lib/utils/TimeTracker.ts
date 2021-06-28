import {IIteration, ITask} from "../types/models";

type IterationEvent = 'changed' | 'finished';

export default class TimeTracker {

  private _interval!: NodeJS.Timeout;
  private _eventTarget: EventTarget;
  public state: IIteration;
  public soundFile: string;

  constructor(data: { state: IIteration, soundFile: string}) {
    this.state = data.state;
    this.soundFile = data.soundFile;
    this._eventTarget = new EventTarget();
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
    clearInterval(this._interval);
    this._playAlarm();
    this._notifyChange('ALARM_SOUND');
    setTimeout(() => {
      this._notifyChange('FINISHED');
    }, 8000);
  }

  public on(eventName: IterationEvent, callback: ((event : CustomEvent) => void)) {
    this._eventTarget.addEventListener(eventName, ((event: CustomEvent) => {
      callback(event);
    }) as EventListener);
  }

  private _createInterval(): NodeJS.Timeout {
    return setInterval(() => {
      if (this.state.secondsLeft >= 1) {
        this.state.secondsLeft -= 1;
        this._notifyChange('UPDATED_TIME_LEFT');
      } else {
        this._finish();
      }
    }, 1000);
  }

  private _notifyChange(description: string): void {
    const state = JSON.parse(JSON.stringify(this.state));
    const customEvent = new CustomEvent('changed', {detail: {description, data: state}})
    this._eventTarget.dispatchEvent(customEvent);
  }

  private _playAlarm() {
    const alarm = new Audio(this.soundFile);
    alarm.play();
  }



}
