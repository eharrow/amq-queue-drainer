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
exports.Drainer = void 0;
const cli_spinner_1 = require("cli-spinner");
const chalk_1 = __importDefault(require("chalk"));
const node_emoji_1 = __importDefault(require("node-emoji"));
const connectionHelper_1 = require("./connectionHelper");
class Drainer {
    constructor(url, queue, logMessage, logMessageCsv, i18n) {
        this.url = url;
        this.queue = queue;
        this.logMessage = logMessage;
        this.logMessageCsv = logMessageCsv;
        this.i18n = i18n;
        this.spinner = new cli_spinner_1.Spinner('waiting.. %s ');
    }
    consumeMessages() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.setupAndProcess((channel, logMessageCsv, logMessage) => {
                let count = 0;
                return channel
                    .consume(this.queue, (message) => {
                    this.spinner.stop(true);
                    if (message != null) {
                        count++;
                        this.log(count, message, logMessage, logMessageCsv);
                        this.spinner.start();
                        return channel.ack(message);
                    }
                })
                    .catch((error) => {
                    console.error('error when consuming a message', error);
                });
            }).catch((err) => console.error('oh oh', err));
        });
    }
    consumeNmessages(numToConsume) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.setupAndProcess((channel, logMessageCsv, logMessage) => {
                let count = 0;
                const consumers = [];
                for (let i = 0; i < numToConsume; i++) {
                    consumers.push(channel.get(this.queue));
                }
                return Promise.all(consumers)
                    .then((messages) => {
                    this.spinner.stop(true);
                    messages.forEach((message) => {
                        if (message) {
                            count++;
                            this.log(count, message, logMessage, logMessageCsv);
                            return channel.ack(message);
                        }
                    });
                    channel.close().then(() => {
                        return process.exit(0);
                    });
                })
                    .catch((error) => {
                    console.error('error when consuming a message', error);
                });
            });
        });
    }
    setupAndProcess(processFn) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield new connectionHelper_1.ConnectionHelper(this.i18n).createConnection(this.url);
                const channel = yield connection.createChannel();
                try {
                    const ok = yield channel.checkQueue(this.queue);
                    if (ok) {
                        console.info(` [*] Waiting for messages in ${chalk_1.default.bold.red(this.queue)}. ${chalk_1.default.inverse.greenBright('CTRL-C')} to exit`);
                        this.spinner.start();
                        const logMessage = this.logMessage;
                        const logMessageCsv = this.logMessageCsv;
                        return processFn(channel, logMessageCsv, logMessage);
                    }
                }
                catch (err) {
                    console.error(`${this.i18n.__('connect.error.msg.queue')}`, err);
                }
            }
            catch (error) {
                console.error(`${this.i18n.__('connect.error.msg.server')}`, error.message);
            }
        });
    }
    log(count, message, logMessage, logMessageCsv) {
        if (logMessageCsv) {
            if (count === 1) {
                console.debug('----8<---------8<---------8<--------8<---------8<--------8<----------');
                console.debug(`${this.i18n.__('log.csv.header')}`);
            }
            console.debug(`${count},"${message.content.toString()}"`);
        }
        else {
            if (logMessage) {
                console.debug(message.content.toString());
            }
            console.info(`message: ${count} ${node_emoji_1.default.get('white_check_mark')}`);
        }
    }
}
exports.Drainer = Drainer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhaW5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kcmFpbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDZDQUFzQztBQUN0QyxrREFBMEI7QUFDMUIsNERBQStCO0FBRS9CLHlEQUFzRDtBQUt0RCxNQUFhLE9BQU87SUFjbEIsWUFDRSxHQUFXLEVBQ1gsS0FBYSxFQUNiLFVBQW1CLEVBQ25CLGFBQXNCLEVBQ3RCLElBQVM7UUFFVCxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzdCLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1FBQ25DLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxxQkFBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFLWSxlQUFlOztZQUMxQixPQUFPLElBQUksQ0FBQyxlQUFlLENBQ3pCLENBQ0UsT0FBd0IsRUFDeEIsYUFBc0IsRUFDdEIsVUFBbUIsRUFDbkIsRUFBRTtnQkFDRixJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7Z0JBRWQsT0FBTyxPQUFPO3FCQUNYLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsT0FBZ0IsRUFBRSxFQUFFO29CQUN4QyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFFeEIsSUFBSSxPQUFPLElBQUksSUFBSSxFQUFFO3dCQUNuQixLQUFLLEVBQUUsQ0FBQzt3QkFDUixJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLGFBQWEsQ0FBQyxDQUFDO3dCQUNwRCxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFB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RUFBRSxDQUFDLENBQUM7U0FDcEU7SUFDSCxDQUFDO0NBQ0Y7QUExSkQsMEJBMEpDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgYW1xcGxpYiBmcm9tICdhbXFwbGliJztcbmltcG9ydCB7IFNwaW5uZXIgfSBmcm9tICdjbGktc3Bpbm5lcic7XG5pbXBvcnQgY2hhbGsgZnJvbSAnY2hhbGsnO1xuaW1wb3J0IGVtb2ppIGZyb20gJ25vZGUtZW1vamknO1xuaW1wb3J0IHsgTWVzc2FnZSB9IGZyb20gJ2FtcXBsaWInO1xuaW1wb3J0IHsgQ29ubmVjdGlvbkhlbHBlciB9IGZyb20gJy4vY29ubmVjdGlvbkhlbHBlcic7XG5cbi8qKlxuICogVGhlIHF1ZXVlIGRyYWluZXIgdGhhdCBjb25uZWN0cyB0byBhbiBBTVEgcXVldWUgYW5kIGNvbnN1bWVzIGFsbCB0aGUgbWVzc2FnZXMuXG4gKi9cbmV4cG9ydCBjbGFzcyBEcmFpbmVyIHtcbiAgcHJpdmF0ZSB1cmw6IHN0cmluZztcbiAgcHJpdmF0ZSBxdWV1ZTogc3RyaW5nO1xuICBwcml2YXRlIGxvZ01lc3NhZ2U6IGJvb2xlYW47XG4gIHByaXZhdGUgbG9nTWVzc2FnZUNzdjogYm9vbGVhbjtcbiAgcHJpdmF0ZSBpMThuOiBhbnk7XG4gIHByaXZhdGUgc3Bpbm5lcjogU3Bpbm5lcjtcblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHVybFxuICAgKiBAcGFyYW0ge3N0cmluZ30gcXVldWVcbiAgICogQHBhcmFtIHtib29sZWFufSBsb2dNZXNzYWdlXG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3IoXG4gICAgdXJsOiBzdHJpbmcsXG4gICAgcXVldWU6IHN0cmluZyxcbiAgICBsb2dNZXNzYWdlOiBib29sZWFuLFxuICAgIGxvZ01lc3NhZ2VDc3Y6IGJvb2xlYW4sXG4gICAgaTE4bjogYW55XG4gICkge1xuICAgIHRoaXMudXJsID0gdXJsO1xuICAgIHRoaXMucXVldWUgPSBxdWV1ZTtcbiAgICB0aGlzLmxvZ01lc3NhZ2UgPSBsb2dNZXNzYWdlO1xuICAgIHRoaXMubG9nTWVzc2FnZUNzdiA9IGxvZ01lc3NhZ2VDc3Y7XG4gICAgdGhpcy5pMThuID0gaTE4bjtcbiAgICB0aGlzLnNwaW5uZXIgPSBuZXcgU3Bpbm5lcignd2FpdGluZy4uICVzICcpO1xuICB9XG5cbiAgLyoqXG4gICAqIGNvbm5lY3QgYW5kIGNvbnN1bWUgbWVzc2FnZXNcbiAgICovXG4gIHB1YmxpYyBhc3luYyBjb25zdW1lTWVzc2FnZXMoKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5zZXR1cEFuZFByb2Nlc3MoXG4gICAgICAoXG4gICAgICAgIGNoYW5uZWw6IGFtcXBsaWIuQ2hhbm5lbCxcbiAgICAgICAgbG9nTWVzc2FnZUNzdjogYm9vbGVhbixcbiAgICAgICAgbG9nTWVzc2FnZTogYm9vbGVhblxuICAgICAgKSA9PiB7XG4gICAgICAgIGxldCBjb3VudCA9IDA7XG5cbiAgICAgICAgcmV0dXJuIGNoYW5uZWxcbiAgICAgICAgICAuY29uc3VtZSh0aGlzLnF1ZXVlLCAobWVzc2FnZTogTWVzc2FnZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zcGlubmVyLnN0b3AodHJ1ZSk7XG5cbiAgICAgICAgICAgIGlmIChtZXNzYWdlICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgY291bnQrKztcbiAgICAgICAgICAgICAgdGhpcy5sb2coY291bnQsIG1lc3NhZ2UsIGxvZ01lc3NhZ2UsIGxvZ01lc3NhZ2VDc3YpO1xuICAgICAgICAgICAgICB0aGlzLnNwaW5uZXIuc3RhcnQoKTtcbiAgICAgICAgICAgICAgcmV0dXJuIGNoYW5uZWwuYWNrKG1lc3NhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdlcnJvciB3aGVuIGNvbnN1bWluZyBhIG1lc3NhZ2UnLCBlcnJvcik7XG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgKS5jYXRjaCgoZXJyKSA9PiBjb25zb2xlLmVycm9yKCdvaCBvaCcsIGVycikpO1xuICB9XG5cbiAgLyoqXG4gICAqIGNvbm5lY3QgYW5kIGNvbnN1bWUgYSBzcGVjaWZpYyBudW1iZXIgb2YgbWVzc2FnZXNcbiAgICovXG4gIHB1YmxpYyBhc3luYyBjb25zdW1lTm1lc3NhZ2VzKG51bVRvQ29uc3VtZTogbnVtYmVyKSB7XG4gICAgcmV0dXJuIHRoaXMuc2V0dXBBbmRQcm9jZXNzKFxuICAgICAgKFxuICAgICAgICBjaGFubmVsOiBhbXFwbGliLkNoYW5uZWwsXG4gICAgICAgIGxvZ01lc3NhZ2VDc3Y6IGJvb2xlYW4sXG4gICAgICAgIGxvZ01lc3NhZ2U6IGJvb2xlYW5cbiAgICAgICkgPT4ge1xuICAgICAgICBsZXQgY291bnQgPSAwO1xuICAgICAgICBjb25zdCBjb25zdW1lcnMgPSBbXTtcblxuICAgICAgICBmb3IgKGxldCBpOiBudW1iZXIgPSAwOyBpIDwgbnVtVG9Db25zdW1lOyBpKyspIHtcbiAgICAgICAgICBjb25zdW1lcnMucHVzaChjaGFubmVsLmdldCh0aGlzLnF1ZXVlKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKGNvbnN1bWVycylcbiAgICAgICAgICAudGhlbigobWVzc2FnZXMpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc3Bpbm5lci5zdG9wKHRydWUpO1xuXG4gICAgICAgICAgICBtZXNzYWdlcy5mb3JFYWNoKChtZXNzYWdlKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChtZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgY291bnQrKztcbiAgICAgICAgICAgICAgICB0aGlzLmxvZyhjb3VudCwgbWVzc2FnZSwgbG9nTWVzc2FnZSwgbG9nTWVzc2FnZUNzdik7XG4gICAgICAgICAgICAgICAgLy9zcGlubmVyLnN0YXJ0KCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNoYW5uZWwuYWNrKG1lc3NhZ2UpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgY2hhbm5lbC5jbG9zZSgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gcHJvY2Vzcy5leGl0KDApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ2Vycm9yIHdoZW4gY29uc3VtaW5nIGEgbWVzc2FnZScsIGVycm9yKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBzZXR1cEFuZFByb2Nlc3MocHJvY2Vzc0ZuOiBGdW5jdGlvbikge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBjb25uZWN0aW9uID0gYXdhaXQgbmV3IENvbm5lY3Rpb25IZWxwZXIodGhpcy5pMThuKS5jcmVhdGVDb25uZWN0aW9uKFxuICAgICAgICB0aGlzLnVybFxuICAgICAgKTtcbiAgICAgIGNvbnN0IGNoYW5uZWwgPSBhd2FpdCBjb25uZWN0aW9uLmNyZWF0ZUNoYW5uZWwoKTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3Qgb2sgPSBhd2FpdCBjaGFubmVsLmNoZWNrUXVldWUodGhpcy5xdWV1ZSk7XG5cbiAgICAgICAgaWYgKG9rKSB7XG4gICAgICAgICAgY29uc29sZS5pbmZvKFxuICAgICAgICAgICAgYCBbKl0gV2FpdGluZyBmb3IgbWVzc2FnZXMgaW4gJHtjaGFsay5ib2xkLnJlZChcbiAgICAgICAgICAgICAgdGhpcy5xdWV1ZVxuICAgICAgICAgICAgKX0uICR7Y2hhbGsuaW52ZXJzZS5ncmVlbkJyaWdodCgnQ1RSTC1DJyl9IHRvIGV4aXRgXG4gICAgICAgICAgKTtcbiAgICAgICAgICB0aGlzLnNwaW5uZXIuc3RhcnQoKTtcbiAgICAgICAgICBjb25zdCBsb2dNZXNzYWdlID0gdGhpcy5sb2dNZXNzYWdlO1xuICAgICAgICAgIGNvbnN0IGxvZ01lc3NhZ2VDc3YgPSB0aGlzLmxvZ01lc3NhZ2VDc3Y7XG5cbiAgICAgICAgICByZXR1cm4gcHJvY2Vzc0ZuKGNoYW5uZWwsIGxvZ01lc3NhZ2VDc3YsIGxvZ01lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihgJHt0aGlzLmkxOG4uX18oJ2Nvbm5lY3QuZXJyb3IubXNnLnF1ZXVlJyl9YCwgZXJyKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgYCR7dGhpcy5pMThuLl9fKCdjb25uZWN0LmVycm9yLm1zZy5zZXJ2ZXInKX1gLFxuICAgICAgICBlcnJvci5tZXNzYWdlXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgbG9nKFxuICAgIGNvdW50OiBudW1iZXIsXG4gICAgbWVzc2FnZTogTWVzc2FnZSxcbiAgICBsb2dNZXNzYWdlOiBib29sZWFuLFxuICAgIGxvZ01lc3NhZ2VDc3Y6IGJvb2xlYW5cbiAgKSB7XG4gICAgaWYgKGxvZ01lc3NhZ2VDc3YpIHtcbiAgICAgIC8vIGFkZCBoZWFkZXIgd2hlbiBmaXJzdCBlbnRyeVxuICAgICAgaWYgKGNvdW50ID09PSAxKSB7XG4gICAgICAgIGNvbnNvbGUuZGVidWcoXG4gICAgICAgICAgJy0tLS04PC0tLS0tLS0tLTg8LS0tLS0tLS0tODwtLS0tLS0tLTg8LS0tLS0tLS0tODwtLS0tLS0tLTg8LS0tLS0tLS0tLSdcbiAgICAgICAgKTtcbiAgICAgICAgY29uc29sZS5kZWJ1ZyhgJHt0aGlzLmkxOG4uX18oJ2xvZy5jc3YuaGVhZGVyJyl9YCk7XG4gICAgICB9XG4gICAgICBjb25zb2xlLmRlYnVnKGAke2NvdW50fSxcIiR7bWVzc2FnZS5jb250ZW50LnRvU3RyaW5nKCl9XCJgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGxvZ01lc3NhZ2UpIHtcbiAgICAgICAgY29uc29sZS5kZWJ1ZyhtZXNzYWdlLmNvbnRlbnQudG9TdHJpbmcoKSk7XG4gICAgICB9XG4gICAgICBjb25zb2xlLmluZm8oYG1lc3NhZ2U6ICR7Y291bnR9ICR7ZW1vamkuZ2V0KCd3aGl0ZV9jaGVja19tYXJrJyl9YCk7XG4gICAgfVxuICB9XG59XG4iXX0=