import { v4 as uuidv4 } from 'uuid';
import {ChangeEvent, FormEvent, useState} from "react";
import styles from './TaskForm.module.scss';
import {IIteration, ITask} from "../../../../lib/types/models";
import {MAX_POMODOROS_PER_TASK} from "../../../../lib/constants";
import {IReduxStore} from "../../../../lib/types/redux/store.interface";
import {getSettings, getTasks} from "../../../../lib/redux/slices/pomodoro/selectors";
import {connect, ConnectedProps} from "react-redux";
import {TaskFactory} from "../../../../lib/utils/TaskFactory";

const mapStateToProps = (state: IReduxStore) => ({
  settings: getSettings(state),
  tasks: getTasks(state)
});

const connector = connect(mapStateToProps);

interface State {
  isValid: boolean,
  errors: {[key: string]: string},
  value: {
    title: string,
    pomodoros: number,
    hoveredPomodoros: number,
  }
}

interface Props extends ConnectedProps<typeof connector>{
  onSubmit: (task: ITask) => void;
  onCancelForm: () => void;
}

function TaskForm ({
    settings,
    tasks,
    onSubmit,
    onCancelForm
  }: Props) {

  const initialState: State = {
    isValid: false,
    errors: {
      title: ''
    },
    value: {
      title: '',
      pomodoros: 1,
      hoveredPomodoros: 1,
    }
  };
  const [form, setForm] = useState<State>(initialState);

  function updateHoveredPomodoros(total: number) {
    const value = {...form.value, hoveredPomodoros: total };
    setForm({...form, value});
  }

  function selectPomodoros (total: number) {
    const value = {...form.value, pomodoros: total };
    setForm({...form, value});
  }

  function shouldFillTomato (hoveredValue: number) {
    return ((form.value.pomodoros && form.value.pomodoros >= hoveredValue) || (hoveredValue <= form.value.hoveredPomodoros));
  }

  function handleValueChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    const newFormValue = {...form.value, [name]: value};
    setForm({...form, value: newFormValue});
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const { title, pomodoros } = form.value;
    if (title !== '') {
      const newTask = TaskFactory.create({
        title,
        pomodoros,
        activated: tasks.length === 0
      }, settings);
      // Reset form
      setForm(initialState);
      onSubmit(newTask);
    } else {
      // Update state with an error
      setForm({ ...form, errors: { title: 'Please add a title for the task'} });
    }
  }

  return (
    <form className="row animate__animated animate__fadeIn p-2" onSubmit={handleSubmit}>
      <div className="col-12 mb-2">
        <h6 className="text-muted">New Task</h6>
      </div>
      <div className="col-12 col-sm-8 form-group mb-3">
          <input className="form-control text-muted shadow-none" name="title" value={form.value.title} onChange={handleValueChange} placeholder="What are you working on?"/>
          <div className="small text-danger">{form.errors.title}</div>
      </div>
      <div className="col-12 form-group mb-3">
        <label className="text-muted mb-2">Estimated pomodoros ({form.value.pomodoros || form.value.hoveredPomodoros}):</label>
        <div>
          {
            Array.from(new Array(MAX_POMODOROS_PER_TASK), (i, idx) => idx + 1)
              .map((value) => {
              return <i key={value} className={`${styles.tomato} ${shouldFillTomato(value) ? styles.filled : null} `} onMouseEnter={() => updateHoveredPomodoros(value)} onMouseLeave={() => updateHoveredPomodoros(1)} onClick={() => selectPomodoros(value)}/>;
            })
          }
        </div>
      </div>
      <div className="col-12 form-group text-end">
        <button type="button" className="btn btn-outline-secondary me-3" onClick={onCancelForm}>Cancel</button>
        <button type="submit" className="btn btn-success">Add Task</button>
      </div>
    </form>
  )

}


export default connector(TaskForm);
