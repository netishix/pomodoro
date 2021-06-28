import {ITask} from "../../../../lib/types/models";
import styles from './TaskSchedule.module.scss';
import TaskScheduleSegment from "../task-schedule-segment/TaskScheduleSegment";

interface Props {
  task: ITask
}

export default function TaskSchedule(
  {
    task,
  }: Props) {

  return (
    <div className="row">
      <div className="col-12">
        <div className="row mb-4">
          <div className="col-12">
            <h4 className="text-muted text-truncate">
              <span className="me-3"> Working on:</span>
              <span className="small fw-light">{task.title}</span>
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div id={styles.timeLine}>
              {
                task.schedule
                  .map((iteration, idx) => {
                    return <TaskScheduleSegment key={idx} iteration={iteration} isFirst={idx === 0} isLast={idx === task.schedule.length - 1}/>;
                  })
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
