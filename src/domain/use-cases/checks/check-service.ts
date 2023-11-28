import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceCase {
    execute( url : string ): Promise<boolean>
}

type SuccessCallback = (() => void)| undefined;
type ErrorCallback = (( error : string) => void) | undefined;


export class CheckService implements CheckServiceCase {
    constructor(
        private readonly logRespository: LogRepository,
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback
    ){}

       public async execute( url : string ): Promise<boolean> {
        
    try{
            const req = await fetch(url)
            if (!req.ok ){
                throw new Error(`Request failed with status ${url}`)
            }

            const log = new LogEntity({
                message: `service ${url} working`, 
                level: LogSeverityLevel.low,
                origin: 'chech-serives.ts'});
            this.logRespository.saveLog( log );
            this.successCallback && this.successCallback();
            return true;

    } catch( error ){
            const error1 = new LogEntity(
                {
                    message: `service ${url} not working`,
                    level: LogSeverityLevel.high,
                    origin: 'chech-serives.ts'
                });    
            this.logRespository.saveLog( error1 );
            this.errorCallback && this.errorCallback(`${error}`)
            return false;

        }

    }

    
}