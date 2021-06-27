import Head from 'next/head'
import { Tomato, Settings, TaskList, TaskSchedule } from "../components";
import {connect, ConnectedProps, useSelector} from "react-redux";
import {getActiveIteration, getActiveTask} from "../lib/redux/slices/pomodoro/selectors";
import {IReduxStore} from "../lib/types/redux/store.interface";
import formatTimeLeft from "../lib/utils/format-time-left";
import Timer from "../components/pages/home/timer/Timer";

const mapStateToProps = (state: IReduxStore) => ({
  activeTask: getActiveTask(state),
  activeIteration: getActiveIteration(state)
});

const connector = connect(mapStateToProps);

interface Props extends ConnectedProps<typeof connector> {}

function Home({activeTask, activeIteration }: Props) {
  let title;
  if (activeIteration) {
    const timeLeft = formatTimeLeft(activeIteration.secondsLeft);
    if (!activeIteration.finished) {
      const titleSlogan = activeIteration.type === 'pomodoro' ? 'Time to work!' : 'Time for a break';
      title = `${timeLeft} - ${titleSlogan}`;
    } else {
      title = `---- ${timeLeft} ----`
    }
  } else {
    title = 'Pomodoro'
  }
  const favicon = !activeIteration || (activeIteration && activeIteration.type) === 'pomodoro' ? '/favicon-pomodoro.ico' : '/favicon-break.ico';
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Embrace Pomodoro!" />
        <link rel="icon" href={favicon} />
      </Head>
      <main className="container">
        <div className="row justify-content-center">
          <div className="col-11 order-1 col-md-11 order-lg-0 col-lg-6 col-xxl-6 mb-5">
            {
              activeTask ?
                <div className="row mb-5">
                  <div className="col-12">
                    <TaskSchedule task={activeTask} />
                  </div>
                </div>
                : null
            }
            <div className="row mb-4">
              <div className="col-12">
                <TaskList/>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <Settings/>
              </div>
            </div>
          </div>
          <div className="col-11 order-0 col-md-9 order-lg-1 offset-lg-1 col-lg-5 offset-xxl-2 col-xl-4 mb-5">
            <Timer/>
          </div>
        </div>
      </main>
    </div>
  )
}

export default connector(Home);
