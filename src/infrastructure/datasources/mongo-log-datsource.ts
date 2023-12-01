import { LogModel } from "../../data/mongo";
import { LogDatasource } from "../../domain/datasources/log.datasources";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class MongoLogDataSource implements LogDatasource{
    async saveLog(log: LogEntity): Promise<void> {
        const newlog = await LogModel.create(log)
        console.log('mongo log created', newlog.id)
    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const logs = await LogModel.find({
            level: severityLevel
        })
        return logs.map(LogEntity.fromObject)
        
    }

}