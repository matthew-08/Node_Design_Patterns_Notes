import { log, timeStamp } from 'console';

type Options = {
  timestamp?: boolean;
};

const logger = (level: 'Info' | 'Error' | 'Debug', options: Options) => {
  return (log: string) => {
    let date = '';
    if (options.timestamp) {
      date = new Date();
    }
    console.log(`${date} [${level}]: ${log}`);
  };
};

logger('Debug', {
  timestamp: true,
})('hello');
