import Head from 'next/head'
import { Tomato, Settings } from "../components";
import {useEffect, useState} from "react";
import TaskList from "../components/task-list/TaskList";
import {Datasource} from "../lib/services/datasource";
import {DEFAULT_SETTINGS, DEFAULT_STATUS} from "../lib/constants";
import {ISettings} from "../interfaces/models/settings.interface";
import {IStatus} from "../interfaces/models/status.interface";
import {ITask} from "../interfaces/models/task.interface";

interface State {
  isLoading: boolean,
  tasks: ITask[],
  settings: ISettings,
  status: IStatus
}

export default function Home() {
  const initialState: State = {
    isLoading: true,
    tasks: [],
    settings: DEFAULT_SETTINGS,
    status: DEFAULT_STATUS
  };
  const [state, setState] = useState<State>(initialState);
  useEffect(() => {
    async function fetchData() {
      const datasource = new Datasource();
      const connector = datasource.getConnector();
      const [tasks, settings, status] = await Promise.all([
        connector.getTasks(),
        connector.getSettings(),
        connector.getStatus(),
      ]);
      setState({...state, isLoading: false, tasks, settings, status});
    }
    fetchData();
  }, []);
  return (
    <div>
      <Head>
        <title>Pomodoro</title>
        <meta name="description" content="Embrace Pomodoro!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container">
        <div className="row justify-content-center">
          <div className="col-10 col-md-5">
            <div className="row mb-3">
              <div className="col-12">
                {!state.isLoading && <Settings settings={state.settings}/>}
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                {!state.isLoading && <TaskList tasks={state.tasks}/>}
              </div>
            </div>
          </div>
          <div className="col-8 offset-md-1 col-md-6 offset-lg-2 col-lg-4">
            {!state.isLoading && <Tomato status={state.status} />}
          </div>
        </div>
      </main>
    </div>
  )
}
