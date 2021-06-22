import Head from 'next/head'
import { Tomato, Settings } from "../components";
import {useEffect, useState} from "react";
import TaskList from "../components/pages/home/task-list/TaskList";
import {useSelector} from "react-redux";
import {getTasks} from "../lib/redux/slices/tasks";
import {getSettings} from "../lib/redux/slices/settings";
import {getStatus} from "../lib/redux/slices/status";


export default function Home() {

  const tasks = useSelector(getTasks);
  const settings = useSelector(getSettings);
  const status = useSelector(getStatus);

  return (
    <div>
      <Head>
        <title>Pomodoro</title>
        <meta name="description" content="Embrace Pomodoro!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container">
        <div className="row justify-content-center">
          <div className="col-11 order-1 col-md-11 order-lg-0 col-lg-6 col-xxl-6 mb-5">
            <div className="row mb-3">
              <div className="col-12">
                <Settings settings={settings}/>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <TaskList tasks={tasks}/>
              </div>
            </div>
          </div>
          <div className="col-11 order-0 col-md-9 order-lg-1 offset-lg-1 col-lg-5 offset-xxl-2 col-xl-4 mb-5">
            <Tomato status={status} />
          </div>
        </div>
      </main>
    </div>
  )
}
