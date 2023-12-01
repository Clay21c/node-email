import { LogSeverityLevel } from "../domain/entities/log.entity";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import { SendEmailLogs } from "../domain/use-cases/email/send-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasources";
import { MongoLogDataSource } from "../infrastructure/datasources/mongo-log-datsource";
import { PostgresLogDataSource } from "../infrastructure/datasources/postgres-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.respository.impl";
import { CronService } from "./cron/con-service"
import { EmailSerivice } from "./email/email.service";

const LogRepository = new LogRepositoryImpl(
  new FileSystemDatasource(),
  // new PostgresLogDataSource(),
  // new MongoLogDataSource(),
);
const mongoLogRespository = new LogRepositoryImpl(
  new MongoLogDataSource(),
);
const postgresLogRespository = new LogRepositoryImpl(
  new PostgresLogDataSource(),
)

export class Server {
    public static async start() {
        console.log('server started...')

      //   const emailSerivice = new EmailSerivice() 
      // new SendEmailLogs(
      //   emailSerivice,
      //   LogRepository
      // ).execute("clay21c00@gmail.com")
      
        // send email
      //   const emailSerivice = new EmailSerivice(
      //       FilelogRespository
      //   );
      //   emailSerivice.sendEmailWithFileSystemLogs(
      //    ['jonymedin@hotmail.com', 'clay21c99@gmail.com']
      // )

          CronService.createJob('*/10 * * * * *',
          () => {
              new CheckServiceMultiple(

            [LogRepository, mongoLogRespository, postgresLogRespository],

            () => console.log('success'),
              (error) => console.log(error)
          ).execute('https://google.com')
        }
        );
    const logs = await LogRepository.getLogs(LogSeverityLevel.low);
    console.log(logs)

  }

}
