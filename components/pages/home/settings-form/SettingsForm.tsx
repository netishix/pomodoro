import {AVAILABLE_SOUNDS} from "../../../../lib/constants";
import {ISettings} from "../../../../lib/types/models";
import {useEffect, useRef} from "react";
import {useForm} from "react-hook-form";
import {useComponentDidMount} from "../../../../lib/hooks/use-component-did-mount";

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

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      pomodoroMinutes: settings.time.pomodoro as unknown as string,
      shortBreakMinutes: settings.time.shortBreak as unknown as string,
      longBreakMinutes: settings.time.longBreak as unknown as string,
      soundId: settings.soundId as unknown as string,
    }
  });
  function submit(data: FormData) {
    const newSettings: ISettings = {
      time: {
        pomodoro: parseInt(data.pomodoroMinutes),
        shortBreak: parseInt(data.shortBreakMinutes),
        longBreak: parseInt(data.longBreakMinutes),
      },
      soundId: parseInt(data.soundId),
    };
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
      setTimeout(() => {
        audio.pause();
      }, 5000);
      playingAudioRef.current = audio;
    }
  }, [soundId]);

  return (
    <div className="row border-top mt-3 p-2 pt-4 animate__animated animate__fadeIn">
      <form className="col-12" onSubmit={handleSubmit(submit)}>
        <div className="row form-group mb-3">
          <div className="col-12">
            <h6 className="text-muted">Time (minutes)</h6>
          </div>
          <div className="col-4 col-md-3 mb-2">
            <label className="small text-muted text-truncate">Pomodoro</label>
            <input className="form-control form-control-sm text-center" {...register("pomodoroMinutes", { required: true, min: 1, max: 60 })} type="number"/>
          </div>
          <div className="col-4 col-md-3 mb-2">
            <label className="small text-muted text-truncate">Short break</label>
            <input className="form-control form-control-sm text-center" {...register("shortBreakMinutes", { required: true, min: 1, max: 60 })} type="number"/>
          </div>
          <div className="col-4 col-md-3 mb-2">
            <label className="small text-muted text-truncate">Long break</label>
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
        <div className="row form-group mb-3">
          <div className="col-5 col-md-4">
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
