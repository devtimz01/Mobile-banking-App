"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const logger = (0, winston_1.createLogger)({
    transports: [
        new winston_1.transports.File({
            filename: '..logger/index.log',
            level: 'error',
            format: winston_1.format.combine(winston_1.format.timestamp({ format: 'YYY-MM-DD, HH:mm:ss' }), winston_1.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`))
        })
    ]
});
//logger.log({level: 'error', message});
//logger.error(message);
exports.default = logger;
