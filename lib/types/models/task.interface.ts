import IIteration from "./iteration.interface";

export default interface ITask {
  id: string;
  title: string;
  totalMinutes: number;
  active: boolean;
  finished: boolean;
  schedule: IIteration[];
}
