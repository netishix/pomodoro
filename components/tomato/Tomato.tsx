// @ts-ignore
import {Timer as EasyTimer} from 'easytimer.js/dist/easytimer.min.js';
import styles from "./Tomato.module.scss";
import {
  MODE_LONG_BREAK_SECONDS,
  MODE_POMODORO_SECONDS,
  MODE_SHORT_BREAK_SECONDS
} from "../../lib/constants";
import {useEffect, useRef, useState} from "react";
import {IStatus} from "../../interfaces/models/status.interface";
import {Head} from "next/document";

type State = IStatus;

interface Props {
  status: IStatus,
}

export default function Tomato({status}: Props) {
  const initialState: State = status;
  const [state, setState] = useState<State>(initialState);
  const easyTimer = new EasyTimer({
    countdown: true, startValues: {seconds: status.secondsLeft}
  });
  const timerRef = useRef(easyTimer);

  useEffect(() => {
    timerRef.current.on('secondsUpdated', () => {
      setState((prevState) => ({...prevState, secondsLeft: timerRef.current.getTotalTimeValues().seconds}));
    });
    return () => timerRef.current.off('secondsUpdated');
  }, [timerRef.current]);

  function startTimer() {
    timerRef.current.start();
    setState({...state, started: true, running: true});
  }
  function pauseTimer() {
    timerRef.current.pause();
    setState({...state, running: false});
  }
  function resumeTimer() {
    timerRef.current.start();
    setState({...state, running: true});
  }
  function changeMode(mode: IStatus['mode']) {
    let confirmed;
    if (state.running) {
      confirmed = confirm('The timer is still running. Are you sure you want to end this iteration?');
    } else {
      confirmed = true;
    }
    if (confirmed) {
      let secondsLeft: number;
      switch (mode) {
        case 'pomodoro':
          secondsLeft = MODE_POMODORO_SECONDS;
          break;
        case 'shortBreak':
          secondsLeft = MODE_SHORT_BREAK_SECONDS;
          break;
        case 'longBreak':
          secondsLeft = MODE_LONG_BREAK_SECONDS;
          break;
      }
      timerRef.current = new EasyTimer({
        countdown: true, startValues: {seconds: secondsLeft}
      });
      setState({...state, secondsLeft, mode, started: false, running: false});
    }
  }

  return (
    <div>
      <div className="text-center mb-4">
        <div className="btn-group btn-group" role="group">
          <button type="button" className={`btn btn-outline-primary shadow-none ${state.mode === 'pomodoro' ? 'active' : ''}`} onClick={() => changeMode('pomodoro')}>Pomodoro</button>
          <button type="button" className={`btn btn-outline-success shadow-none ${state.mode === 'shortBreak' ? 'active' : ''}`} onClick={() => changeMode('shortBreak')}>Short Break</button>
          <button type="button" className={`btn btn-outline-success shadow-none ${state.mode === 'longBreak' ? 'active' : ''}`} onClick={() => changeMode('longBreak')}>Long Break</button>
        </div>
      </div>
      <div className="position-relative animate__animated animate__bounce">
        <img className="img-fluid" src={state.mode === 'pomodoro' ? '/images/tomato.png' : '/images/tomato-green.png'} />
        <div id={styles.timer}>
          <span className="text-white">{timerRef.current.getTimeValues().toString()}</span>
        </div>
        <div id={styles.controllerBtn}>
          {
            !state.started ?
              <button className={`btn btn-light fw-bold ${state.mode === 'pomodoro' ? 'text-danger' : 'text-success'}`} onClick={startTimer}>
                <i className="bi bi-play-fill me-2" />START</button> :
              state.running ?
                <button className="btn btn-light text-info fw-bold" onClick={pauseTimer}>
                  <i className="bi bi-pause-fill me-2" />Pause</button> :
                <button className={`btn btn-light fw-bold ${state.mode === 'pomodoro' ? 'text-danger' : 'text-success'}`} onClick={resumeTimer}>
                  <i className="bi bi-play-fill me-2" />Resume</button>
          }
        </div>
      </div>
    </div>

  )
}
