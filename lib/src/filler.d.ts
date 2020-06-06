export declare class Filler {
    private url;
    private queue;
    private logMessage;
    private logMessageCsv;
    private i18n;
    constructor(url: string, queue: string, logMessage: boolean, logMessageCsv: boolean, i18n: any);
    publishMessage(): Promise<void>;
    private publish;
    private exchange;
    private routingKey;
    private setupAndProcess;
}
