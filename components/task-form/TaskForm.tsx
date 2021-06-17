import { v4 as uuidv4 } from 'uuid';
import {ChangeEvent, FormEvent, useRef, useState} from "react";
import styles from './TaskForm.module.scss';
import {ITask} from "../../interfaces/models/task.interface";
import {Datasource} from "../../lib/services/datasource";

interface State {
  isValid: boolean,
  errors: {[key: string]: string},
  value: {
    title: string,
    iterations: number,
    hoveredIterations: number,
  }
}

interface Props {
  onSubmit: (task: ITask) => void;
  onCancelForm: () => void;
}

export default function TaskForm (props: Props) {
  const { onSubmit, onCancelForm } = props;

  const initialState = {
    isValid: false,
    errors: {
      title: ''
    },
    value: {
      title: '',
      iterations: 1,
      hoveredIterations: 1,
    }
  };
  const [form, setForm] = useState(initialState);
  const connectorRef = useRef(new Datasource().getConnector());


  function updateHoveredIterations(total: number) {
    const value = {...form.value, hoveredIterations: total };
    setForm({...form, value});
  };

  function selectIterations (total: number) {
    const value = {...form.value, iterations: total };
    setForm({...form, value});
  }

  function shouldFillTomato (hoveredValue: number) {
    return ((form.value.iterations && form.value.iterations >= hoveredValue) || (hoveredValue <= form.value.hoveredIterations));
  }

  function handleValueChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    const newFormValue = {...form.value, [name]: value};
    setForm({...form, value: newFormValue});
  };

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const { title, iterations } = form.value;
    if (title !== '') {
      const newTask: ITask = {
        id: uuidv4(),
        title,
        iterations,
        finished: false,
      };
      // Persist new task
      connectorRef.current.createTask(newTask);
      // Reset form
      setForm(initialState);
      onSubmit(newTask);
    } else {
      // Update state with an error
      setForm({ ...form, errors: { title: 'Please add a title for the task'} });
    }
  };

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
        <label className="text-muted mb-2">Estimated iterations ({form.value.iterations || form.value.hoveredIterations}):</label>
        <div>
          {
            [1,2,3,4,5].map((value) => {
              return <i key={value} className={`${styles.tomato} ${shouldFillTomato(value) ? styles.filled : null} `} onMouseEnter={() => updateHoveredIterations(value)} onMouseLeave={() => updateHoveredIterations(1)} onClick={() => selectIterations(value)}/>;
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
