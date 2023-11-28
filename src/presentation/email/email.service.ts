import nodemailer from 'nodemailer'
import { envs } from '../../config/plugins/envs.plugin'
import { LogRepository } from '../../domain/repository/log.repository'
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity'
interface SendMailOption{
    to: string | string[],
    subject: string,
    htmlBody: string
    attachments?: Attachment[]

}
interface Attachment{
    filename: string,
    path: string
}
export class EmailSerivice {

    constructor(

    ){}
    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth:{
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY,
        }
    })
    async sendEmail(options: SendMailOption):Promise<Boolean>{
        const {to, subject, htmlBody, attachments=[]} = options;
        try{
            const senInformation = await this.transporter.sendMail({
                to : to,
                subject : subject,
                html : htmlBody,
                attachments : attachments,

            })
            const log = new LogEntity({
                level: LogSeverityLevel.low,
                message: 'Email sent',
                origin: 'email.service.ts',
            })
            console.log(senInformation)
            return true
        }catch(error){
            const log = new LogEntity({
                level: LogSeverityLevel.high,
                message: 'Email not sent',
                origin: 'email.service.ts',
            })
             
            console.log(error)
            return false
        }

    }
    async sendEmailWithFileSystemLogs(to: string | string[]){
        const subject = 'Logs from the server'
        const htmlBody = `<h1>Logs from the server</h1>
        <p>Ver los adjuntos</p>
        `
        const attachments: Attachment[] = [
            {filename: 'logs-all.log', path: './logs/logs-all.log'},
            {filename: 'logs-high.log', path: './logs/logs-high.log'},
            {filename: 'logs-medium.log', path: './logs/logs-medium.log'}
        ]

        return this.sendEmail({
            to,
            subject,
            htmlBody,
            attachments
        })
    }
    

    
}