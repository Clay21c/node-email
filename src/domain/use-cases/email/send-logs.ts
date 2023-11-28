import { EmailSerivice } from "../../../presentation/email/email.service"
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository"

interface SendLogEmailUseCase {
    execute(to: string | string[]): Promise<boolean>

}

export class SendEmailLogs implements SendLogEmailUseCase {
    constructor(
        private readonly emailService: EmailSerivice,
        private readonly logRepository: LogRepository
    ){}

    async execute(to: string | string[]): Promise<boolean> {

        try{
            const send = await this.emailService.sendEmailWithFileSystemLogs(to);
            if( !send ){
                throw new Error('Email log not sent')
            }
            const log = new LogEntity({
                message: 'Email log sent',
                level: LogSeverityLevel.high,
                origin: 'send-logs.ts',
            })
            this.logRepository.saveLog( log )
            
            return true;
        }catch(error){
            const log = new LogEntity({
                message: `${error}`,
                level: LogSeverityLevel.high,
                origin: 'send-logs.ts',
            })
            this.logRepository.saveLog(log)
            return false;
        }
    }
}