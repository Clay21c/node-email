import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasources";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.respository.impl";
import { CronService } from "./cron/con-service"
import { EmailSerivice } from "./email/email.service";

const FilelogRespository = new LogRepositoryImpl(
  new FileSystemDatasource(),
);

export class Server {
    public static start() {
        console.log('server started...')

        const emailSerivice = new EmailSerivice() 
      new SendEmailLogs(
        emailSerivice,
        FilelogRespository
      ).execute("clay21c00@gmail.com")
      
        // send email
      //   const emailSerivice = new EmailSerivice(
      //       FilelogRespository
      //   );
      //   emailSerivice.sendEmailWithFileSystemLogs(
      //    ['jonymedin@hotmail.com', 'clay21c99@gmail.com']
      // )

    //     CronService.createJob('*/10 * * * * *',
    //     () => {
    //       new CheckService(

    //         FilelogRespository,

    //         () => console.log('success'),
    //           (error) => console.log(error)
    //       ).execute('https://google.com')
    //     }
    //     );
     }

}
