import { ISettings } from "../../interfaces/models/settings.interface";
import styles from "../settings/Settings.module.scss";
import {useState} from "react";
import {SettingsForm} from "../index";

interface State {
  isFormVisible: boolean,
  settings: ISettings,
}

interface Props {
  settings: ISettings,
}

export default function Settings({ settings } : Props) {

  const initialState: State = {
    settings,
    isFormVisible: false,
  }
  const [state, setState] = useState<State>(initialState);

  function toggleForm() {
    setState({...state, isFormVisible: !state.isFormVisible});
  }

  function saveNewSettings(newSettings: ISettings) {
    setState({...state, settings: newSettings, isFormVisible: !state.isFormVisible});
  }

  return (
    <div id={styles.settings} className="row p-2">
      <div className="col-12">
        <div className="row align-items-center" onClick={toggleForm} role="button">
          <h4 className="col-6 text-muted m-0">
            <i className="bi bi-gear-fill me-2" />Settings
          </h4>
          <div className="col-6 text-end">
            <i className={`bi ${state.isFormVisible ? 'bi-caret-up-fill': 'bi-caret-down-fill'}`}/>
          </div>
        </div>
        { state.isFormVisible ? <SettingsForm settings={state.settings} onSubmit={saveNewSettings} onCancel={toggleForm}/> : null }
      </div>
    </div>
  );
}
