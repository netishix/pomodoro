import styles from './Task.module.scss';
import {MODE_POMODORO_SECONDS} from '../../lib/constants';

interface Props {
  idx: number;
  title: string;
  iterations: number;
  finished: boolean;
  onRemove: () => void;
  onFinish: () => void;
}

export default function Task ({idx, title, iterations, finished, onRemove, onFinish}: Props) {
  return (
    <div className={`row align-items-center flex-nowrap p-2 border-bottom ${finished ? styles.finishedTask : ''}`}>
      <div className="col-1 text-center">
        {idx}.
      </div>
      <div className="col-8 col-md-4 text-truncate">
        <span className="text-muted">{title}</span>
      </div>
      <div className="d-none d-md-inline-block col-md-5 text-truncate">
        <span className="align-middle me-1">
            {
              Array.from(Array(iterations), (_, i) => i+1).map((value, idx) => {
                return <i key={idx} className={styles.tomato}/>
              })
            }
        </span>
        <span className="align-middle text-muted small">({iterations * (MODE_POMODORO_SECONDS / 60)} min)</span>
      </div>
      <div className="col-3 col-md-2 text-center">
        <div className="btn-group">
          <button className={`btn btn-outline-success btn-sm shadow-none ${finished ? 'active' : ''}`} onClick={() => onFinish()} title="Flag task as finished">
            <i className="bi bi-check" />
          </button>
          <button className="btn btn-outline-danger btn-sm shadow-none" onClick={() => onRemove()} title="Remove task">
            <i className="bi bi-trash" />
          </button>
        </div>
      </div>
    </div>
  );
}
