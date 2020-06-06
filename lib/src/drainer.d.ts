export declare class Drainer {
    private url;
    private queue;
    private logMessage;
    private logMessageCsv;
    private i18n;
    private spinner;
    constructor(url: string, queue: string, logMessage: boolean, logMessageCsv: boolean, i18n: any);
    consumeMessages(): Promise<any>;
    consumeNmessages(numToConsume: number): Promise<any>;
    private setupAndProcess;
    private log;
}
