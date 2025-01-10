import winston from "winston";

const logger = winston.createLogger({
    transports: [new winston.transports.Console()],
});

const loggerWithNameSpace = (namespace: string) => {
    return logger.child({ namespace });
};

export { loggerWithNameSpace };
