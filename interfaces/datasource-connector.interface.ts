import {ISettings} from "./models/settings.interface";
import {IStatus} from "./models/status.interface";
import {ITask} from "./models/task.interface";

export interface DatasourceConnector {
  getTasks: () => Promise<ITask[]>,
  createTask: (task: ITask) => Promise<void>,
  updateTask: (task: ITask) => Promise<void>,
  removeTask: (task: ITask) => Promise<void>,
  getSettings: () => Promise<ISettings>,
  saveSettings: (settings: ISettings) => Promise<void>,
  getStatus: () => Promise<IStatus>,
  saveStatus: (status: IStatus) => Promise<void>,
}
