import {AVAILABLE_SOUNDS} from "../../lib/constants";
import {ISettings} from "../../interfaces/models/settings.interface";
import {ChangeEvent, FormEvent, useEffect, useRef, useState} from "react";
import {Datasource} from "../../lib/services/datasource";
import {useForm, useWatch} from "react-hook-form";
import {useComponentDidMount} from "../../lib/hooks/use-component-did-mount";


interface FormData {
    pomodoroMinutes: string,
    shortBreakMinutes: string,
    longBreakMinutes: string,
    soundId: string,
}

interface Props {
  settings: ISettings;
  onSubmit: (newSettings: ISettings) => void;
  onCancel: () => void;
}

export default function SettingsForm({ settings, onSubmit, onCancel }: Props) {


  const connectorRef = useRef(new Datasource().getConnector());
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      pomodoroMinutes: settings.pomodoroMinutes as unknown as string,
      shortBreakMinutes: settings.shortBreakMinutes as unknown as string,
      longBreakMinutes: settings.longBreakMinutes as unknown as string,
      soundId: settings.soundId as unknown as string,
    }
  });
  function submit(data: FormData) {
    const newSettings = {
      pomodoroMinutes: parseInt(data.pomodoroMinutes),
      shortBreakMinutes: parseInt(data.shortBreakMinutes),
      longBreakMinutes: parseInt(data.longBreakMinutes),
      soundId: parseInt(data.soundId),
    };
    connectorRef.current.saveSettings(newSettings);
    onSubmit(newSettings);
  }

  const isComponentMounted = useComponentDidMount();
  const playingAudioRef = useRef<HTMLAudioElement>();
  const soundId = watch('soundId');
  useEffect(() => {
    if (isComponentMounted) {
      const selectedSound = AVAILABLE_SOUNDS.find(sound => sound.id === parseInt(soundId))!;
      const audio = new Audio(selectedSound.file);
      audio.volume = 0.2;
      if (playingAudioRef.current && playingAudioRef.current.duration > 0 && !playingAudioRef.current.paused) {
        playingAudioRef.current.pause();
      }
      audio.play();
      playingAudioRef.current = audio;
    }
  }, [soundId]);

  // function handleValueChange (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
  //   const { name, value } = e.target;
  //   const newFormValue = {...form.value, [name]: value};
  //   setForm({...form, value: newFormValue});
  // }
  //
  // function handleSubmit(e: FormEvent) {
  //   e.preventDefault();
  //   const { pomodoroMinutes, shortBreakMinutes, longBreakMinutes, soundId } = form.value;
  //   if (pomodoroMinutes !== '' && shortBreakMinutes != '' && longBreakMinutes != '') {
  //     const newSettings: ISettings = {
  //       pomodoroMinutes: parseInt(pomodoroMinutes),
  //       shortBreakMinutes: parseInt(shortBreakMinutes),
  //       longBreakMinutes: parseInt(longBreakMinutes),
  //       soundId: parseInt(soundId),
  //     };
  //     // Persist new settings
  //     connectorRef.current.saveSettings(newSettings);
  //     // Reset form
  //     setForm(initialState);
  //     onCancel();
  //   } else {
  //     // Update state with an error
  //     setForm({ ...form, errors: { time: 'Please complete all the fields'} });
  //   }
  // }


  return (
    <div className="row border-top mt-3 p-2 pt-4">
      <form className="col-12" onSubmit={handleSubmit(submit)}>
        <div className="row form-group mb-3">
          <div className="col-12">
            <h6 className="text-muted">Time (minutes)</h6>
          </div>
          <div className="col-12 col-md-3 mb-2">
            <label className="small text-muted">Pomodoro</label>
            <input className="form-control form-control-sm text-center" {...register("pomodoroMinutes", { required: true, min: 1, max: 60 })} type="number"/>
          </div>
          <div className="col-12 col-md-3 mb-2">
            <label className="small text-muted">Short break</label>
            <input className="form-control form-control-sm text-center" {...register("shortBreakMinutes", { required: true, min: 1, max: 60 })} type="number"/>
          </div>
          <div className="col-12 col-md-3 mb-2">
            <label className="small text-muted">Long break</label>
            <input className="form-control form-control-sm text-center" {...register("longBreakMinutes", { required: true, min: 1, max: 60 })} type="number"/>
          </div>
          <div className="col-12">
            {
              (errors.pomodoroMinutes && errors.pomodoroMinutes.type === 'required') ||
              (errors.shortBreakMinutes && errors.shortBreakMinutes.type === 'required') ||
              (errors.longBreakMinutes && errors.longBreakMinutes.type === 'required') ?
                <div className="small text-danger">Please complete all the fields</div> : null
            }
            {
              (errors.pomodoroMinutes && (errors.pomodoroMinutes.type === 'min' || errors.pomodoroMinutes.type === 'max')) ||
              (errors.shortBreakMinutes && (errors.shortBreakMinutes.type === 'min' || errors.shortBreakMinutes.type === 'max')) ||
              (errors.longBreakMinutes && (errors.longBreakMinutes.type === 'min' || errors.longBreakMinutes.type === 'max')) ?
                <div className="small text-danger">Please use a number between 1 and 60</div> : null
            }
          </div>
        </div>
        <div className="row form-group">
          <div className="col-12 col-md-4">
            <label className="small text-muted">Alarm sound:</label>
            <select className="form-select form-select-sm" {...register("soundId", { required: true })}>
              {
                AVAILABLE_SOUNDS.map((sound) => {
                  return <option key={sound.id} value={sound.id}>{sound.name}</option>
                })
              }
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-12 text-end">
            <button type="button" className="btn btn-outline-secondary me-3" onClick={onCancel}>Cancel</button>
            <button type="submit" className="btn btn-success">Save</button>
          </div>
        </div>
      </form>
    </div>
  );
}
