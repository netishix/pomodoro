import {IIteration, ITask} from "../../../../lib/types/models";
import styles from './TaskScheduleSegment.module.scss';

interface Props {
  iteration: IIteration;
  isFirst: boolean;
  isLast: boolean;
}

const DEFAULT_ARROW_LEFT_POSITION = '-8px';

export default function TaskScheduleSegment(
  {
    iteration,
    isFirst,
    isLast
  }: Props) {

  function getArrowLeftPosition(): string {
    // Calculate completed percentage
    const totalSeconds = iteration.totalMinutes * 60;
    const elapsedSeconds = totalSeconds - iteration.secondsLeft;
    const completedPercentage = elapsedSeconds * 100 / totalSeconds;
    return `calc(${completedPercentage}% + ${DEFAULT_ARROW_LEFT_POSITION}`;
  }

  return (
    <div className={`${styles.segment} ${iteration.type === 'pomodoro' ? styles.segmentPomodoro : styles.segmentBreak}`}
         style={{width: `${iteration.percentageOfTask}%`}}>
      {
        isFirst ?
          <span className={styles.firstIteration}>
            <i className="bi bi-circle-fill" />
          </span>
          : null
      }
      {
        iteration.active ?
          <div className={styles.segmentArrow} style={{left: getArrowLeftPosition()}}>
            <i className="bi bi-caret-down-fill" />
          </div>
          : null
      }
      <span className={`small text-muted ${styles.segmentDescription}`}>{iteration.totalMinutes}'</span>
      {
        isLast ?
          <span className={styles.lastIteration}>
            <i className="bi bi-flag-fill" />
          </span>
          : null
      }
    </div>
  );
}
