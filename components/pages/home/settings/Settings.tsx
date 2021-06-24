import styles from "./Settings.module.scss";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {SettingsForm} from "../../../index";
import { ISettings } from "../../../../lib/types/models";
import * as reducers from "../../../../lib/redux/slices/pomodoro";

interface Props {
  settings: ISettings,
}

export default function Settings({ settings } : Props) {

  const [isFormVisible, setFormVisible] = useState(false);
  const dispatch = useDispatch();

  function updateSettings(newSettings: ISettings) {
    dispatch(reducers.changedSettings(newSettings));
    setFormVisible(false);
  }

  return (
    <div id={styles.settings} className="row p-2">
      <div className="col-12">
        <div className="row align-items-center" onClick={() => setFormVisible(!isFormVisible)} role="button">
          <h4 className="col-6 text-muted m-0">
            <i className="bi bi-gear-fill me-2" />Settings
          </h4>
          <div className="col-6 text-end">
            <i className={`bi ${isFormVisible ? 'bi-caret-up-fill': 'bi-caret-down-fill'}`}/>
          </div>
        </div>
        { isFormVisible ? <SettingsForm settings={settings} onSubmit={updateSettings} onCancel={() => setFormVisible(false)}/> : null }
      </div>
    </div>
  );
}
