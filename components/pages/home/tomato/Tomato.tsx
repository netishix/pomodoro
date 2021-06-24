// @ts-ignore
import {Timer as EasyTimer} from 'easytimer.js/dist/easytimer.min.js';
import {useEffect, useRef} from "react";
import {useDispatch} from "react-redux";
import styles from "./Tomato.module.scss";
import * as reducers from "../../../../lib/redux/slices/pomodoro";
import Countdown from "../../../../lib/class/countdown";
import {ICountdown, ISettings} from "../../../../lib/types/models";

interface Props {
  countdown: ICountdown,
  settings: ISettings,
}

export default function Tomato({countdown, settings}: Props) {

  const countdownInstance = new Countdown({...countdown}, {...settings});
  const countdownRef = useRef(countdownInstance);
  const dispatch = useDispatch();
  useEffect(() => {
    if (countdown.started && countdown.running) {
      countdownRef.current.start();
    }
    countdownRef.current.on('changed', (e: CustomEvent) => {
      const countdownState = e.detail.data;
      dispatch(reducers.changedCountdown(countdownState));
    });
  }, []);

  useEffect(() => {
    countdownRef.current.setSettings(settings);
  }, [settings]);

  function reset(mode: ICountdown['mode']) {
    const confirmed = countdown.running ? confirm('The timer is still running. Are you sure you want to end this iteration?') : true;
    if (confirmed) {
      countdownRef.current.reset(mode);
    }
  }

  return (
    <div>
      <div className="text-center mb-4">
        <div className="btn-group btn-group" role="group">
          <button type="button" className={`btn btn-outline-primary shadow-none ${countdown.mode === 'pomodoro' ? 'active' : ''}`} onClick={() => reset('pomodoro')}>Pomodoro</button>
          <button type="button" className={`btn btn-outline-success shadow-none ${countdown.mode === 'shortBreak' ? 'active' : ''}`} onClick={() => reset('shortBreak')}>Short Break</button>
          <button type="button" className={`btn btn-outline-success shadow-none ${countdown.mode === 'longBreak' ? 'active' : ''}`} onClick={() => reset('longBreak')}>Long Break</button>
        </div>
      </div>
      <div className="position-relative animate__animated animate__bounce animate__repeat-2">
        <img className={`img-fluid ${countdown.mode !== 'pomodoro' ? 'visually-hidden' : ''}`} src="/images/tomato.png" alt="tomato red"/>
        <img className={`img-fluid ${(countdown.mode !== 'shortBreak' && countdown.mode !== 'longBreak') ? 'visually-hidden' : ''}`} src="/images/tomato-green.png" alt="tomato green"/>
        <div id={styles.timer} className="animate__animated animate__fadeIn animate__delay-1s">
          <span className="text-white">{countdownRef.current.getTimeLeft()}</span>
        </div>
        <div id={styles.controllerBtn} className="animate__animated animate__fadeIn animate__delay-1s">
          {
            !countdown.started ?
              <button className={`btn btn-light fw-bold ${countdown.mode === 'pomodoro' ? 'text-danger' : 'text-success'}`} onClick={() => countdownRef.current.start()}>
                <i className="bi bi-play-fill me-2" />START</button> :
              countdown.running ?
                <button className="btn btn-light text-info fw-bold" onClick={() => countdownRef.current.pause()}>
                  <i className="bi bi-pause-fill me-2" />Pause</button> :
                <button className={`btn btn-light fw-bold ${countdown.mode === 'pomodoro' ? 'text-danger' : 'text-success'}`} onClick={() => countdownRef.current.resume()}>
                  <i className="bi bi-play-fill me-2" />Resume</button>
          }
        </div>
      </div>
    </div>

  )
}
