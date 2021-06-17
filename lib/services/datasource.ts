import { BrowserDatasource } from "./browser-datasource";
import { DatasourceConnector } from "../../interfaces/datasource-connector.interface";
import { DEFAULT_DATASOURCE } from "../constants";

export class Datasource {

  private readonly connector: DatasourceConnector | null;

  constructor() {
    switch (DEFAULT_DATASOURCE) {
      case 'browser':
        const browserDatasource = new BrowserDatasource();
        this.connector = browserDatasource;
        break;
      default:
        this.connector = null;
        throw new Error(`The configured datasource ${DEFAULT_DATASOURCE} is not supported`);
    }
  }

  public getConnector(): DatasourceConnector {
    return this.connector;
  }

}
