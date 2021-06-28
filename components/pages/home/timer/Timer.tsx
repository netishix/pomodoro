import {useEffect, useRef} from "react";
import {connect, ConnectedProps} from "react-redux";
import {Dispatch} from "@reduxjs/toolkit";
import styles from "./Timer.module.scss";
import * as reducers from "../../../../lib/redux/slices/pomodoro/slice";
import TimeTracker from "../../../../lib/utils/TimeTracker";
import {IReduxStore} from "../../../../lib/types/redux/store.interface";
import {
  getSoundFile,
  getActiveIteration,
  getActiveTask,
} from "../../../../lib/redux/slices/pomodoro/selectors";
import formatTimeLeft from "../../../../lib/utils/format-time-left";
import {IIteration} from "../../../../lib/types/models";

const mapStateToProps = (state: IReduxStore) => ({
  soundFile: getSoundFile(state),
  activeTask: getActiveTask(state),
  activeIteration: getActiveIteration(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateIteration: (data: {iterationId: string, updatedIteration: IIteration}) => dispatch(reducers.updatedIteration(data)),
  finishIteration: (iterationId: string) => dispatch(reducers.finishedIteration(iterationId))
});

const connector = connect(mapStateToProps, mapDispatchToProps);

interface Props extends ConnectedProps<typeof connector> {}

function Timer (
  {
    soundFile,
    activeIteration,
    updateIteration,
    finishIteration,
  }: Props) {

  if (activeIteration) {
    const timeTracker = new TimeTracker({
      state: {...activeIteration},
      soundFile,
    });
    const timeTrackerRef = useRef(timeTracker);
    useEffect(() => {
      console.log('mounted');
      timeTrackerRef.current.on('changed', (e: CustomEvent) => {
        const {data, description} = e.detail;
        const updatedIteration = data as IIteration;
        updateIteration({iterationId: updatedIteration.id, updatedIteration});
        if (description === 'FINISHED') {
          finishIteration(updatedIteration.id);
        }
      });
    }, []);

    useEffect(() => {
      timeTrackerRef.current.state = {...activeIteration};
      if (activeIteration.started && activeIteration.running) {
        timeTrackerRef.current.resume();
      } else {
        timeTrackerRef.current.pause();
      }
    }, [activeIteration.totalMinutes, activeIteration.id]);

    useEffect(() => {
      timeTrackerRef.current.soundFile = soundFile
    }, [soundFile]);

    return (
      <div>
        <div className={`position-relative ${!activeIteration.finished ? 'animate__animated animate__bounce animate__repeat-2' : 'animate__animated animate__swing animate__infinite'}`}>
          <img className={`img-fluid ${activeIteration.type !== 'pomodoro' ? 'visually-hidden' : ''}`} src="/images/tomato.png" alt="tomato red"/>
          <img className={`img-fluid ${(activeIteration.type !== 'shortBreak' && activeIteration.type !== 'longBreak') ? 'visually-hidden' : ''}`} src="/images/tomato-green.png" alt="tomato green"/>
          <div id={styles.timer} className="animate__animated animate__fadeIn animate__delay-1s">
            <span className="text-white">{formatTimeLeft(activeIteration.secondsLeft)}</span>
          </div>
          <div id={styles.controllerBtn} className="animate__animated animate__fadeIn animate__delay-1s">
            {
              !activeIteration.finished ?
                (!activeIteration.started ?
                  <button className={`btn btn-light fw-bold ${activeIteration.type === 'pomodoro' ? 'text-danger' : 'text-success'}`} onClick={() => timeTrackerRef.current.start()}>
                    <i className="bi bi-play-fill me-2" />START</button> :
                  activeIteration.running ?
                    <button className="btn btn-light text-info fw-bold" onClick={() => timeTrackerRef.current.pause()}>
                      <i className="bi bi-pause-fill me-2" />Pause</button> :
                    <button className={`btn btn-light fw-bold ${activeIteration.type === 'pomodoro' ? 'text-danger' : 'text-success'}`} onClick={() => timeTrackerRef.current.resume()}>
                      <i className="bi bi-play-fill me-2" />Resume</button>)
                : null
            }
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="position-relative animate__animated animate__bounce animate__repeat-2'">
        <img className="img-fluid" src="/images/tomato.png" alt="tomato red"/>
      </div>
    );
  }



}

export default connector(Timer);
