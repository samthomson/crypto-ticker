import { 
    main
} from './lib'
import { CronJob } from 'cron'

var taskEveryMinute = new CronJob('0 6 * * *', function() {
    // run every minute
    main()
}, () => {}, true, 'Europe/London');
