"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Filler = void 0;
const chalk_1 = __importDefault(require("chalk"));
const prompts_1 = __importDefault(require("prompts"));
const connectionHelper_1 = require("./connectionHelper");
class Filler {
    constructor(url, queue, logMessage, logMessageCsv, i18n) {
        this.url = url;
        this.queue = queue;
        this.logMessage = logMessage;
        this.logMessageCsv = logMessageCsv;
        this.i18n = i18n;
    }
    publishMessage() {
        return __awaiter(this, void 0, void 0, function* () {
            const channel = yield this.setupAndProcess();
            while (true) {
                yield this.publish(channel);
            }
        });
    }
    publish(channel) {
        return __awaiter(this, void 0, void 0, function* () {
            {
                const onCancel = () => {
                    process.exit(0);
                };
                const response = yield prompts_1.default({
                    type: 'text',
                    name: 'value',
                    message: 'Message to publish?',
                    validate: (value) => value.length === 0 ? `You need to enter something` : true,
                }, { onCancel });
                const buf = Buffer.from(response.value, 'utf8');
                Promise.resolve(channel.publish(this.exchange(), this.routingKey(), buf));
            }
        });
    }
    exchange() {
        return '';
    }
    routingKey() {
        return this.queue;
    }
    setupAndProcess() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield new connectionHelper_1.ConnectionHelper(this.i18n).createConnection(this.url);
                const channel = yield connection.createChannel();
                try {
                    const ok = yield channel.checkQueue(this.queue);
                    if (ok) {
                        console.info(` [*] Waiting for messages to send to ${chalk_1.default.bold.red(this.queue)}. ${chalk_1.default.inverse.greenBright('CTRL-C')} to exit`);
                        return Promise.resolve(channel);
                    }
                    else {
                        return Promise.reject('no channel');
                    }
                }
                catch (err) {
                    console.error(`${this.i18n.__('connect.error.msg.queue')}`, err);
                    return Promise.reject('no channel');
                }
            }
            catch (error) {
                console.error(`${this.i18n.__('connect.error.msg.server')}`, error.message);
                return Promise.reject('no channel');
            }
        });
    }
}
exports.Filler = Filler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2ZpbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFDQSxrREFBMEI7QUFDMUIsc0RBQTZCO0FBQzdCLHlEQUFzRDtBQUt0RCxNQUFhLE1BQU07SUFhakIsWUFDRSxHQUFXLEVBQ1gsS0FBYSxFQUNiLFVBQW1CLEVBQ25CLGFBQXNCLEVBQ3RCLElBQVM7UUFFVCxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzdCLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1FBQ25DLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ25CLENBQUM7SUFLWSxjQUFjOztZQUN6QixNQUFNLE9BQU8sR0FBb0IsTUFBTSxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDOUQsT0FBTyxJQUFJLEVBQUU7Z0JBQ1gsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQzdCO1FBQ0gsQ0FBQztLQUFBO0lBRWEsT0FBTyxDQUFDLE9BQXdCOztZQUM1QztnQkFDRSxNQUFNLFFBQVEsR0FBRyxHQUFHLEVBQUU7b0JBQ3BCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLENBQUMsQ0FBQztnQkFDRixNQUFNLFFBQVEsR0FBUSxNQUFNLGlCQUFNLENBQ2hDO29CQUNFLElBQUksRUFBRSxNQUFNO29CQUNaLElBQUksRUFBRSxPQUFPO29CQUNiLE9BQU8sRUFBRSxxQkFBcUI7b0JBQzlCLFFBQVEsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQ2xCLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDLENBQUMsSUFBSTtpQkFDNUQsRUFDRCxFQUFFLFFBQVEsRUFBRSxDQUNiLENBQUM7Z0JBRUYsTUFBTSxHQUFHLEdBQVcsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUN4RCxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQzNFO1FBQ0gsQ0FBQztLQUFBO0lBQ08sUUFBUTtRQUNkLE9BQU8sRUFBRSxDQUFDO0lBQ1osQ0FBQztJQUVPLFVBQVU7UUFDaEIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3BCLENBQUM7SUFFYSxlQUFlOztZQUMzQixJQUFJO2dCQUNGLE1BQU0sVUFBVSxHQUFHLE1BQU0sSUFBSSxtQ0FBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsZ0JBQWdCLENBQ3ZFLElBQUksQ0FBQyxHQUFHLENBQ1QsQ0FBQztnQkFDRixNQUFNLE9BQU8sR0FBRyxNQUFNLFVBQVUsQ0FBQyxhQUFhLEVBQUUsQ0FBQztnQkFFakQsSUFBSTtvQkFDRixNQUFNLEVBQUUsR0FBRyxNQUFNLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUVoRCxJQUFJLEVBQUUsRUFBRTt3QkFDTixPQUFPLENBQUMsSUFBSSxDQUNWLHdDQUF3QyxlQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FDcEQsSUFBSSxDQUFDLEtBQUssQ0FDWCxLQUFLLGVBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQ3BELENBQUM7d0JBQ0YsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO3FCQUNqQzt5QkFBTTt3QkFDTCxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7cUJBQ3JDO2lCQUNGO2dCQUFDLE9BQU8sR0FBRyxFQUFFO29CQUNaLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7b0JBQ2pFLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztpQkFDckM7YUFDRjtZQUFDLE9BQU8sS0FBSyxFQUFFO2dCQUNkLE9BQU8sQ0FBQyxLQUFLLENBQ1gsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQyxFQUFFLEVBQzdDLEtBQUssQ0FBQyxPQUFPLENBQ2QsQ0FBQztnQkFDRixPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDckM7UUFDSCxDQUFDO0tBQUE7Q0FDRjtBQWpHRCx3QkFpR0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBhbXFwbGliIGZyb20gJ2FtcXBsaWInO1xuaW1wb3J0IGNoYWxrIGZyb20gJ2NoYWxrJztcbmltcG9ydCBwcm9tcHQgZnJvbSAncHJvbXB0cyc7XG5pbXBvcnQgeyBDb25uZWN0aW9uSGVscGVyIH0gZnJvbSAnLi9jb25uZWN0aW9uSGVscGVyJztcblxuLyoqXG4gKiBUaGUgcXVldWUgZHJhaW5lciB0aGF0IGNvbm5lY3RzIHRvIGFuIEFNUSBxdWV1ZSBhbmQgY29uc3VtZXMgYWxsIHRoZSBtZXNzYWdlcy5cbiAqL1xuZXhwb3J0IGNsYXNzIEZpbGxlciB7XG4gIHByaXZhdGUgdXJsOiBzdHJpbmc7XG4gIHByaXZhdGUgcXVldWU6IHN0cmluZztcbiAgcHJpdmF0ZSBsb2dNZXNzYWdlOiBib29sZWFuO1xuICBwcml2YXRlIGxvZ01lc3NhZ2VDc3Y6IGJvb2xlYW47XG4gIHByaXZhdGUgaTE4bjogYW55O1xuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBxdWV1ZVxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGxvZ01lc3NhZ2VcbiAgICovXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihcbiAgICB1cmw6IHN0cmluZyxcbiAgICBxdWV1ZTogc3RyaW5nLFxuICAgIGxvZ01lc3NhZ2U6IGJvb2xlYW4sXG4gICAgbG9nTWVzc2FnZUNzdjogYm9vbGVhbixcbiAgICBpMThuOiBhbnlcbiAgKSB7XG4gICAgdGhpcy51cmwgPSB1cmw7XG4gICAgdGhpcy5xdWV1ZSA9IHF1ZXVlO1xuICAgIHRoaXMubG9nTWVzc2FnZSA9IGxvZ01lc3NhZ2U7XG4gICAgdGhpcy5sb2dNZXNzYWdlQ3N2ID0gbG9nTWVzc2FnZUNzdjtcbiAgICB0aGlzLmkxOG4gPSBpMThuO1xuICB9XG5cbiAgLyoqXG4gICAqIGNvbm5lY3QgYW5kIGNvbnN1bWUgbWVzc2FnZXNcbiAgICovXG4gIHB1YmxpYyBhc3luYyBwdWJsaXNoTWVzc2FnZSgpIHtcbiAgICBjb25zdCBjaGFubmVsOiBhbXFwbGliLkNoYW5uZWwgPSBhd2FpdCB0aGlzLnNldHVwQW5kUHJvY2VzcygpO1xuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICBhd2FpdCB0aGlzLnB1Ymxpc2goY2hhbm5lbCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBwdWJsaXNoKGNoYW5uZWw6IGFtcXBsaWIuQ2hhbm5lbCkge1xuICAgIHtcbiAgICAgIGNvbnN0IG9uQ2FuY2VsID0gKCkgPT4ge1xuICAgICAgICBwcm9jZXNzLmV4aXQoMCk7XG4gICAgICB9O1xuICAgICAgY29uc3QgcmVzcG9uc2U6IGFueSA9IGF3YWl0IHByb21wdChcbiAgICAgICAge1xuICAgICAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgICAgICBuYW1lOiAndmFsdWUnLFxuICAgICAgICAgIG1lc3NhZ2U6ICdNZXNzYWdlIHRvIHB1Ymxpc2g/JyxcbiAgICAgICAgICB2YWxpZGF0ZTogKHZhbHVlKSA9PlxuICAgICAgICAgICAgdmFsdWUubGVuZ3RoID09PSAwID8gYFlvdSBuZWVkIHRvIGVudGVyIHNvbWV0aGluZ2AgOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgICB7IG9uQ2FuY2VsIH1cbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IGJ1ZjogQnVmZmVyID0gQnVmZmVyLmZyb20ocmVzcG9uc2UudmFsdWUsICd1dGY4Jyk7XG4gICAgICBQcm9taXNlLnJlc29sdmUoY2hhbm5lbC5wdWJsaXNoKHRoaXMuZXhjaGFuZ2UoKSwgdGhpcy5yb3V0aW5nS2V5KCksIGJ1ZikpO1xuICAgIH1cbiAgfVxuICBwcml2YXRlIGV4Y2hhbmdlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgcHJpdmF0ZSByb3V0aW5nS2V5KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMucXVldWU7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIHNldHVwQW5kUHJvY2VzcygpOiBQcm9taXNlPGFueT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBjb25uZWN0aW9uID0gYXdhaXQgbmV3IENvbm5lY3Rpb25IZWxwZXIodGhpcy5pMThuKS5jcmVhdGVDb25uZWN0aW9uKFxuICAgICAgICB0aGlzLnVybFxuICAgICAgKTtcbiAgICAgIGNvbnN0IGNoYW5uZWwgPSBhd2FpdCBjb25uZWN0aW9uLmNyZWF0ZUNoYW5uZWwoKTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3Qgb2sgPSBhd2FpdCBjaGFubmVsLmNoZWNrUXVldWUodGhpcy5xdWV1ZSk7XG5cbiAgICAgICAgaWYgKG9rKSB7XG4gICAgICAgICAgY29uc29sZS5pbmZvKFxuICAgICAgICAgICAgYCBbKl0gV2FpdGluZyBmb3IgbWVzc2FnZXMgdG8gc2VuZCB0byAke2NoYWxrLmJvbGQucmVkKFxuICAgICAgICAgICAgICB0aGlzLnF1ZXVlXG4gICAgICAgICAgICApfS4gJHtjaGFsay5pbnZlcnNlLmdyZWVuQnJpZ2h0KCdDVFJMLUMnKX0gdG8gZXhpdGBcbiAgICAgICAgICApO1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoY2hhbm5lbCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCdubyBjaGFubmVsJyk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmVycm9yKGAke3RoaXMuaTE4bi5fXygnY29ubmVjdC5lcnJvci5tc2cucXVldWUnKX1gLCBlcnIpO1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoJ25vIGNoYW5uZWwnKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgYCR7dGhpcy5pMThuLl9fKCdjb25uZWN0LmVycm9yLm1zZy5zZXJ2ZXInKX1gLFxuICAgICAgICBlcnJvci5tZXNzYWdlXG4gICAgICApO1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCdubyBjaGFubmVsJyk7XG4gICAgfVxuICB9XG59XG4iXX0=