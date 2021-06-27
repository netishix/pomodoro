import {connect, ConnectedProps, useDispatch} from "react-redux";
import { useState } from "react";
import {Dispatch} from "@reduxjs/toolkit";
import { ITask } from "../../../../lib/types/models";
import {Task, TaskForm} from "../../../index";
import styles from "./TaskList.module.scss";
import * as reducers from "../../../../lib/redux/slices/pomodoro/slice";
import {getTasks} from "../../../../lib/redux/slices/pomodoro/selectors";
import {IReduxStore} from "../../../../lib/types/redux/store.interface";

const mapStateToProps = (state: IReduxStore) => ({
  tasks: getTasks(state)
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  addTask: (task: ITask) => dispatch(reducers.addedTask(task)),
  activateTask: (taskId: string) => dispatch(reducers.activatedTask(taskId)),
  toggleFinishedTask: (taskId: string) => dispatch(reducers.toggledFinishedTask(taskId)),
  removeTask: (taskId: string) => dispatch(reducers.removedTask(taskId))
});

const connector = connect(mapStateToProps, mapDispatchToProps);

interface Props extends ConnectedProps<typeof connector>{}

function TaskList (
  {
    tasks,
    addTask,
    activateTask,
    toggleFinishedTask,
    removeTask
  } : Props) {

  const [isFormVisible, setFormVisible] = useState(false);

  function confirmTaskRemoval (taskId: string) {
    const confirmed = confirm('Are you sure you want to remove this task?');
    if (confirmed) {
      removeTask(taskId);
    }
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
              tasks.map((task, idx) => <Task key={idx} task={task} idx={idx + 1} onActivate={() => activateTask(task.id)} onFinish={() => toggleFinishedTask(task.id)} onRemove={() => confirmTaskRemoval(task.id)}/>) :
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

export default connector(TaskList);
