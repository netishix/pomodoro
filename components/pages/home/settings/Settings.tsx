import styles from "./Settings.module.scss";
import {useState} from "react";
import {connect, ConnectedProps, useDispatch} from "react-redux";
import {Dispatch} from "@reduxjs/toolkit";
import {SettingsForm} from "../../../index";
import { ISettings } from "../../../../lib/types/models";
import * as reducers from "../../../../lib/redux/slices/pomodoro/slice";
import {IReduxStore} from "../../../../lib/types/redux/store.interface";
import {getSettings} from "../../../../lib/redux/slices/pomodoro/selectors";
import {changedSettings} from "../../../../lib/redux/slices/pomodoro/slice";

const mapStateToProps = (state: IReduxStore) => ({
  settings: getSettings(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  changeSettings: (settings: ISettings) => dispatch(reducers.changedSettings(settings))
});

const connector = connect(mapStateToProps, mapDispatchToProps);

interface Props extends ConnectedProps<typeof connector>{}

function Settings (
  {
    settings,
    changeSettings
  } : Props) {

  const [isFormVisible, setFormVisible] = useState(false);

  function updateSettings(newSettings: ISettings) {
    changeSettings(newSettings);
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

export default connector(Settings);
