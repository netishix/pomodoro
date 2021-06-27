import moment from "moment";

export default function formatTimeLeft(secondsLeft: number): string {
  const duration = moment.utc(moment.duration(secondsLeft, "seconds").asMilliseconds());
  return duration.format("mm:ss");
};
