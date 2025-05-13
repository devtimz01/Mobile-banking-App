import { createLogger,format, transports } from "winston";

const logger = createLogger({
    transports:[
        new transports.File({
            filename: '..logger/index.log',
            level:'error',
            format: format.combine(format.timestamp({format:'YYY-MM-DD, HH:mm:ss'}),format.printf((info)=>
                `${info.timestamp} ${info.level}: ${info.message}`
            ))      
        })
    ]
})
//logger.log({level: 'error', message});
//logger.error(message);

export default logger;
