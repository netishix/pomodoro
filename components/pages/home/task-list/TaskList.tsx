import { useDispatch } from "react-redux";
import {useState} from "react";
import { ITask } from "../../../../lib/types/models";
import {Task, TaskForm} from "../../../index";
import styles from "./TaskList.module.scss";
import * as reducers from "../../../../lib/redux/slices/tasks";

interface Props {
  tasks: ITask[],
}

export default function TaskList ({ tasks }: Props) {

  const [isFormVisible, setFormVisible] = useState(false);

  const dispatch = useDispatch();

  function addTask(task: ITask) {
    dispatch(reducers.addedTask(task));
  }

  function removeTask (taskId: string) {
    const confirmed = confirm('Are you sure you want to remove this task?');
    if (confirmed) {
      dispatch(reducers.removedTask(taskId));
    }
  }

  function toggleTaskStatus (taskId: string) {
    dispatch(reducers.toggledTaskStatus(taskId));
  }

  return (
    <div id={styles.taskList} className="row p-2">
      <div className="col-12">
        <div className="row">
          <h4 className="col-12 text-muted">My tasks</h4>
        </div>
        <div className="row border-bottom mb-3">
          <div className="col-12">
            {
              tasks.length > 0 ?
              tasks.map((task, idx) => <Task key={idx} {...task} idx={idx + 1} onFinish={() => toggleTaskStatus(task.id)} onRemove={() => removeTask(task.id)} />) :
                <p className="text-center text-muted">You haven't added any tasks yet</p>
            }
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            {
              !isFormVisible ?
                <div className="row mb-3">
                  <div className="col-12 text-center text-muted fw-bold">
                    <div id={styles.newTask} className="p-2" onClick={() => setFormVisible(!isFormVisible)}>
                      <i className="bi bi-plus-circle me-2"/> Add Task
                    </div>
                  </div>
                </div> :
                <TaskForm onSubmit={(task) => addTask(task)} onCancelForm={() => setFormVisible(false)}/>
            }
          </div>
        </div>
      </div>
    </div>
  );
}
