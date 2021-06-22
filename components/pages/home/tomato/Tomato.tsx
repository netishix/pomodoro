// @ts-ignore
import {Timer as EasyTimer} from 'easytimer.js/dist/easytimer.min.js';
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import styles from "./Tomato.module.scss";
import { IStatus } from "../../../../lib/types/models";
import * as reducers from '../../../../lib/redux/slices/status';
import {getSettings} from "../../../../lib/redux/slices/settings";
import {AVAILABLE_SOUNDS} from "../../../../lib/constants";

interface Props {
  status: IStatus,
}

export default function Tomato({status}: Props) {
  const [timer, setTimer] = useState(new EasyTimer({
    countdown: true, startValues: {seconds: status.secondsLeft}
  }));
  const settings = useSelector(getSettings);
  const dispatch = useDispatch();

  useEffect(() => {
    const newTimer = new EasyTimer({
      countdown: true, startValues: {seconds: status.secondsLeft}
    });
    if (status.started && status.running) {
      newTimer.start();
    }
    newTimer.on('secondsUpdated', () => {
      const secondsLeft = newTimer.getTotalTimeValues().seconds
      dispatch(reducers.timeLeftChange(secondsLeft));
    });
    newTimer.on('targetAchieved', () => {
      const sound = AVAILABLE_SOUNDS.find((sound) => sound.id === settings.soundId);
      if (sound) {
        const alarm = new Audio(sound.file);
        alarm.play();
        setTimeout(() => {
          if (status.mode === 'pomodoro') {
            setMode('shortBreak');
          } else {
            setMode('pomodoro');
          }
        }, 5000);
      }
      dispatch(reducers.finishedTimer(null));
    });
    setTimer(newTimer);
    return () => newTimer.off('secondsUpdated');
  }, [status.mode]);

  function startTimer() {
    timer.start();
    dispatch(reducers.startedTimer(null));
  }
  function pauseTimer() {
    timer.pause();
    dispatch(reducers.pausedTimer(null));
  }
  function resumeTimer() {
    timer.start();
    dispatch(reducers.resumedTimer(null));
  }
  function setMode(mode: IStatus['mode']) {
    const confirmed = status.running ? confirm('The timer is still running. Are you sure you want to end this iteration?') : true;
    if (confirmed) {
      dispatch(reducers.modeChange({mode, settings}));
    }
  }

  return (
    <div>
      <div className="text-center mb-4">
        <div className="btn-group btn-group" role="group">
          <button type="button" className={`btn btn-outline-primary shadow-none ${status.mode === 'pomodoro' ? 'active' : ''}`} onClick={() => setMode('pomodoro')}>Pomodoro</button>
          <button type="button" className={`btn btn-outline-success shadow-none ${status.mode === 'shortBreak' ? 'active' : ''}`} onClick={() => setMode('shortBreak')}>Short Break</button>
          <button type="button" className={`btn btn-outline-success shadow-none ${status.mode === 'longBreak' ? 'active' : ''}`} onClick={() => setMode('longBreak')}>Long Break</button>
        </div>
      </div>
      <div className="position-relative animate__animated animate__bounce animate__repeat-2">
        <img className={`img-fluid ${status.mode !== 'pomodoro' ? 'visually-hidden' : ''}`} src="/images/tomato.png" alt="tomato red"/>
        <img className={`img-fluid ${(status.mode !== 'shortBreak' && status.mode !== 'longBreak') ? 'visually-hidden' : ''}`} src="/images/tomato-green.png" alt="tomato green"/>
        <div id={styles.timer} className="animate__animated animate__fadeIn animate__delay-1s">
          <span className="text-white">{timer.getTimeValues().toString()}</span>
        </div>
        <div id={styles.controllerBtn} className="animate__animated animate__fadeIn animate__delay-1s">
          {
            !status.started ?
              <button className={`btn btn-light fw-bold ${status.mode === 'pomodoro' ? 'text-danger' : 'text-success'}`} onClick={startTimer}>
                <i className="bi bi-play-fill me-2" />START</button> :
              status.running ?
                <button className="btn btn-light text-info fw-bold" onClick={pauseTimer}>
                  <i className="bi bi-pause-fill me-2" />Pause</button> :
                <button className={`btn btn-light fw-bold ${status.mode === 'pomodoro' ? 'text-danger' : 'text-success'}`} onClick={resumeTimer}>
                  <i className="bi bi-play-fill me-2" />Resume</button>
          }
        </div>
      </div>
    </div>

  )
}
