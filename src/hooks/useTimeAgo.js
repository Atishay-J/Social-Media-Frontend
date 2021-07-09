import { parseJSON, formatDistanceToNow } from "date-fns";
const useTimeAgo = (timestamp) => {
  const parsedTime = parseJSON(timestamp);
  const timePeriod = formatDistanceToNow(parsedTime);
  return timePeriod;
};

export default useTimeAgo;
