import { 
    main
} from './lib'
import { CronJob } from 'cron'

var taskEveryMinute = new CronJob('* * * * *', function() {
    // run every minute
    main()
}, () => {}, true, 'Europe/London');
