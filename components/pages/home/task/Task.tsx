import styles from './Task.module.scss';
import {IIteration, ITask} from "../../../../lib/types/models";

interface Props {
  idx: number;
  task: ITask;
  onActivate: () => void;
  onFinish: () => void;
  onRemove: () => void;
}

export default function Task ({idx, task, onActivate, onFinish, onRemove, }: Props) {
  return (
    <div className={`row align-items-center flex-nowrap p-2 border-bottom ${task.active ? styles.activeTask : null} ${task.finished ? styles.finishedTask : null}`}>
      <div className="col-1 col-lg-1 text-center">
        {idx}.
      </div>
      <div className="col-7 col-lg-5 text-truncate">
        <span className="text-muted">{task.title}</span>
      </div>
      <div className="d-none d-lg-inline-block col-lg-3 text-truncate">
        <span className="align-middle me-1">
            {
              task.schedule
                .filter((iteration) => iteration.type === 'pomodoro')
                .map((iteration: IIteration, idx) => {
                return <i key={idx} className={iteration.finished ? styles.tomatoFinished : styles.tomato}/>
              })
            }
        </span>
      </div>
      <div className="col-4 col-lg-3 text-end">
        <div className="btn-group">
          {
            !task.finished ?
              <button className={`btn btn-outline-danger btn-sm shadow-none ${task.active ? 'active' : null}`} onClick={() => onActivate()} title="Work on this task">
                <i className="bi bi-play-fill" />
              </button>
              : null
          }
          <button className={`btn btn-outline-success btn-sm shadow-none ${task.finished ? 'active' : null}`} onClick={() => onFinish()} title="Flag task as finished">
            <i className="bi bi-check-circle" />
          </button>
          <button className="btn btn-outline-secondary btn-sm shadow-none" onClick={() => onRemove()} title="Remove task">
            <i className="bi bi-trash" />
          </button>
        </div>
      </div>
    </div>
  );
}
