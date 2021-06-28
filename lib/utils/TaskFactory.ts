import {IIteration, ISettings, ITask} from "../types/models";
import {v4 as uuidv4} from "uuid";

export class TaskFactory {

  public static create(data: {title: string, pomodoros: number, activated: boolean}, settings: ISettings): ITask {
    const totalIterations = data.pomodoros + (data.pomodoros - 1);
    // Create schedule
    const schedule = Array.from(new Array(totalIterations), (i, idx): IIteration => {
      const isPomodoro = idx % 2 === 0;
      let type: IIteration['type'];
      if (isPomodoro) {
        type = 'pomodoro';
      } else {
        // Check if it is short break or long break
        type = idx !== 7 ? 'shortBreak' : 'longBreak';
      }
      return {
        id: uuidv4(),
        type,
        percentageOfTask: '0',
        totalMinutes: settings.time[type],
        secondsLeft: settings.time[type] * 60,
        active: idx === 0,
        started: false,
        running: false,
        finished: false,
      };
    });
    const taskTotalMinutes = schedule
      .reduce((a, b) => {
        return a + settings.time[b.type];
      }, 0);
    schedule.forEach((iteration) => {
      const percentage = iteration.totalMinutes * 100 / taskTotalMinutes;
      iteration.percentageOfTask = percentage.toFixed(2);
    });
    return {
      id: uuidv4(),
      title: data.title,
      totalMinutes: taskTotalMinutes,
      active: data.activated,
      finished: false,
      schedule,
    };
  }

  public static updateTaskBasedOnNewSettings(task: ITask, newSettings: ISettings): ITask {
    const wasTaskStarted = task.schedule.find((i) => i.started)!!;
    if (!wasTaskStarted && !task.finished) {
      task.schedule.forEach((iteration) => {
        if (!iteration.started) {
          iteration.totalMinutes = newSettings.time[iteration.type];
          iteration.secondsLeft = newSettings.time[iteration.type] * 60;
        }
      });
      const taskTotalMinutes = task.schedule
        .reduce((a, b) => {
          return a + newSettings.time[b.type];
        }, 0);
      task.schedule.forEach((iteration) => {
        const percentage = iteration.totalMinutes * 100 / taskTotalMinutes;
        iteration.percentageOfTask = percentage.toFixed(2);
      });
      task.totalMinutes = taskTotalMinutes;
    }
    return task;
  }

}
