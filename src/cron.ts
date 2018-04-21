import { 
    main
} from './lib'
import { CronJob } from 'cron'

var taskEveryMinute = new CronJob('15 17 * * *', function() {
    // run every minute
    main()
}, () => {}, true, 'Europe/London');
