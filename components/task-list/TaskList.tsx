import {ITask} from "../../interfaces/models/task.interface";
import {Task, TaskForm} from "../";
import {useRef, useState} from "react";
import styles from "./TaskList.module.scss";
import {Datasource} from "../../lib/services/datasource";

interface Props {
  tasks: ITask[],
}

export default function TaskList ({ tasks }: Props) {
  const initialState = {
    tasks,
    isFormVisible: false,
  };
  const [state, setState] = useState(initialState);
  const connectorRef = useRef(new Datasource().getConnector());

  function toggleForm() {
    setState({...state, isFormVisible: !state.isFormVisible});
  }

  function addTask(task: ITask) {
    const updatedTasks = [...state.tasks, task];
    setState({...state, tasks: updatedTasks});
  }

  function removeTask (task: ITask) {
    const confirmed = confirm('Are you sure you want to remove this task?');
    if (confirmed) {
      const targetIdx = state.tasks.indexOf(task);
      const updatedTasks = state.tasks.filter((task, idx) => targetIdx !== idx);
      setState({...state, tasks: updatedTasks});
      connectorRef.current.removeTask(task);
    }
  }

  function toggleTaskStatus (task: ITask) {
    const targetIdx = state.tasks.indexOf(task);
    const updatedTasks = state.tasks.map((task, idx) => {
      if (targetIdx === idx) {
        task.finished = !task.finished;
      }
      return task;
    });
    setState({...state, tasks: updatedTasks});
    connectorRef.current.updateTask(task);
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
              state.tasks.length > 0 ?
              state.tasks.map((task, idx) => <Task key={idx} {...task} idx={idx + 1} onFinish={() => toggleTaskStatus(task)} onRemove={() => removeTask(task)} />) :
                <p className="text-center text-muted">You haven't added any tasks yet</p>
            }
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            {
              !state.isFormVisible ?
                <div className="row mb-3">
                  <div className="col-12 text-center text-muted fw-bold">
                    <div id={styles.newTask} className="p-2" onClick={() => toggleForm()}>
                      <i className="bi bi-plus-circle me-2"/> Add Task
                    </div>
                  </div>
                </div> :
                <TaskForm onSubmit={(task) => addTask(task)} onCancelForm={toggleForm}/>
            }
          </div>
        </div>
      </div>
    </div>
  );
}
