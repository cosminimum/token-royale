import {CronJob} from "cron";

export class CronService
{
    public static set(endDate: string, callback: any): void
    {
        let date = new Date(endDate);
        let day = date.getDay() + 1;
        let month = date.getMonth() + 1;
        let cronTime = `${date.getMinutes()} ${date.getHours()} ${day} ${month} *`;

        let cronJob = new CronJob(cronTime, async () => {
            try {
                callback();
            } catch (e) {
                console.error(e);
            }
        });

        if (!cronJob.running) {
            cronJob.start();
        }
    }
}