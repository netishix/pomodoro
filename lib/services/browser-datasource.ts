import { DatasourceConnector } from "../../interfaces/datasource-connector.interface";
import {ITask} from "../../interfaces/models/task.interface";
import {ISettings} from "../../interfaces/models/settings.interface";
import {IStatus} from "../../interfaces/models/status.interface";
import {DEFAULT_SETTINGS, DEFAULT_STATUS} from "../constants";

const LOCAL_STORAGE_TASKS_KEY = 'tasks';
const LOCAL_STORAGE_SETTINGS_KEY = 'settings';
const LOCAL_STORAGE_STATUS_KEY = 'status';

export class BrowserDatasource implements DatasourceConnector {

  public localstorage: Storage;

  constructor() {
    this.localstorage = localStorage;
    this.initializeLocalStorageVariables();
  }

  public initializeLocalStorageVariables() {
    const tasks = this.localstorage.getItem(LOCAL_STORAGE_TASKS_KEY);
    if (!tasks) {
      this.localstorage.setItem(LOCAL_STORAGE_TASKS_KEY, JSON.stringify([]));
    }
    const settings = this.localstorage.getItem(LOCAL_STORAGE_SETTINGS_KEY);
    if (!settings) {
      this.localstorage.setItem(LOCAL_STORAGE_SETTINGS_KEY, JSON.stringify(DEFAULT_SETTINGS));
    }
    const status = this.localstorage.getItem(LOCAL_STORAGE_STATUS_KEY);
    if (!status) {
      this.localstorage.setItem(LOCAL_STORAGE_STATUS_KEY, JSON.stringify(DEFAULT_STATUS));
    }
  }

  async getTasks(): Promise<ITask[]> {
    const localStorageTasks = this.localstorage.getItem(LOCAL_STORAGE_TASKS_KEY)!;
    return JSON.parse(localStorageTasks);
  }

  async createTask(task: ITask): Promise<void> {
      const localStorageTasks = this.localstorage.getItem(LOCAL_STORAGE_TASKS_KEY)!;
      const tasks: ITask[] = JSON.parse(localStorageTasks);
      tasks.push(task);
      this.localstorage.setItem(LOCAL_STORAGE_TASKS_KEY, JSON.stringify(tasks));
  }

  public async updateTask(task: ITask): Promise<void> {
      const localStorageTasks = this.localstorage.getItem(LOCAL_STORAGE_TASKS_KEY)!;
      const tasks: ITask[] = JSON.parse(localStorageTasks);
      const foundTask = tasks.find((t: ITask) => t.id === task.id);
      if (!foundTask) {
        throw new Error(`Cannot update task: The task with id ${task.id} does not exist`);
      }
      const idx = tasks.indexOf(foundTask);
      tasks[idx] = task;
      this.localstorage.setItem(LOCAL_STORAGE_TASKS_KEY, JSON.stringify(tasks));
  }

  public async removeTask(task: ITask): Promise<void> {
    const localStorageTasks = this.localstorage.getItem(LOCAL_STORAGE_TASKS_KEY)!;
    const tasks: ITask[] = JSON.parse(localStorageTasks);
    const foundTask = tasks.find((t: ITask) => t.id === task.id);
    if (!foundTask) {
      throw new Error(`Cannot remove task: The task with id ${task.id} does not exist`);
    }
    const idx = tasks.indexOf(foundTask);
    tasks.splice(idx, 1);
    this.localstorage.setItem(LOCAL_STORAGE_TASKS_KEY, JSON.stringify(tasks));
  }

  public async getSettings(): Promise<ISettings> {
    const localStorageSettings = this.localstorage.getItem(LOCAL_STORAGE_SETTINGS_KEY)!;
    return JSON.parse(localStorageSettings);
  }

  public async saveSettings(settings: ISettings): Promise<void> {
    this.localstorage.setItem(LOCAL_STORAGE_SETTINGS_KEY, JSON.stringify(settings));
  }

  public async getStatus(): Promise<IStatus> {
    const localStorageStatus = this.localstorage.getItem(LOCAL_STORAGE_STATUS_KEY)!;
    return JSON.parse(localStorageStatus);
  }

  public async saveStatus(status: IStatus): Promise<void> {
    this.localstorage.setItem(LOCAL_STORAGE_STATUS_KEY, JSON.stringify(status));
  }

}
