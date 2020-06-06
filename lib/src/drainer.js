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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhaW5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kcmFpbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsNkNBQXNDO0FBQ3RDLGtEQUEwQjtBQUMxQiw0REFBK0I7QUFFL0IseURBQXNEO0FBS3RELE1BQWEsT0FBTztJQWNsQixZQUNFLEdBQVcsRUFDWCxLQUFhLEVBQ2IsVUFBbUIsRUFDbkIsYUFBc0IsRUFDdEIsSUFBUztRQUVULElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDN0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7UUFDbkMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLHFCQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUtZLGVBQWU7O1lBQzFCLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FDekIsQ0FDRSxPQUF3QixFQUN4QixhQUFzQixFQUN0QixVQUFtQixFQUNuQixFQUFFO2dCQUNGLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztnQkFFZCxPQUFPLE9BQU87cUJBQ1gsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxPQUFnQixFQUFFLEVBQUU7b0JBQ3hDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUV4QixJQUFJLE9BQU8sSUFBSSxJQUFJLEVBQUU7d0JBQ25CLEtBQUssRUFBRSxDQUFDO3dCQUNSLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsYUFBYSxDQUFDLENBQUM7d0JBQ3BELElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFF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QUFFLENBQUMsQ0FBQztTQUNwRTtJQUNILENBQUM7Q0FDRjtBQTFKRCwwQkEwSkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBhbXFwbGliIGZyb20gJ2FtcXBsaWInO1xuaW1wb3J0IHsgU3Bpbm5lciB9IGZyb20gJ2NsaS1zcGlubmVyJztcbmltcG9ydCBjaGFsayBmcm9tICdjaGFsayc7XG5pbXBvcnQgZW1vamkgZnJvbSAnbm9kZS1lbW9qaSc7XG5pbXBvcnQgeyBNZXNzYWdlIH0gZnJvbSAnYW1xcGxpYic7XG5pbXBvcnQgeyBDb25uZWN0aW9uSGVscGVyIH0gZnJvbSAnLi9jb25uZWN0aW9uSGVscGVyJztcblxuLyoqXG4gKiBUaGUgcXVldWUgZHJhaW5lciB0aGF0IGNvbm5lY3RzIHRvIGFuIEFNUSBxdWV1ZSBhbmQgY29uc3VtZXMgYWxsIHRoZSBtZXNzYWdlcy5cbiAqL1xuZXhwb3J0IGNsYXNzIERyYWluZXIge1xuICBwcml2YXRlIHVybDogc3RyaW5nO1xuICBwcml2YXRlIHF1ZXVlOiBzdHJpbmc7XG4gIHByaXZhdGUgbG9nTWVzc2FnZTogYm9vbGVhbjtcbiAgcHJpdmF0ZSBsb2dNZXNzYWdlQ3N2OiBib29sZWFuO1xuICBwcml2YXRlIGkxOG46IGFueTtcbiAgcHJpdmF0ZSBzcGlubmVyOiBTcGlubmVyO1xuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBxdWV1ZVxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGxvZ01lc3NhZ2VcbiAgICovXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihcbiAgICB1cmw6IHN0cmluZyxcbiAgICBxdWV1ZTogc3RyaW5nLFxuICAgIGxvZ01lc3NhZ2U6IGJvb2xlYW4sXG4gICAgbG9nTWVzc2FnZUNzdjogYm9vbGVhbixcbiAgICBpMThuOiBhbnlcbiAgKSB7XG4gICAgdGhpcy51cmwgPSB1cmw7XG4gICAgdGhpcy5xdWV1ZSA9IHF1ZXVlO1xuICAgIHRoaXMubG9nTWVzc2FnZSA9IGxvZ01lc3NhZ2U7XG4gICAgdGhpcy5sb2dNZXNzYWdlQ3N2ID0gbG9nTWVzc2FnZUNzdjtcbiAgICB0aGlzLmkxOG4gPSBpMThuO1xuICAgIHRoaXMuc3Bpbm5lciA9IG5ldyBTcGlubmVyKCd3YWl0aW5nLi4gJXMgJyk7XG4gIH1cblxuICAvKipcbiAgICogY29ubmVjdCBhbmQgY29uc3VtZSBtZXNzYWdlc1xuICAgKi9cbiAgcHVibGljIGFzeW5jIGNvbnN1bWVNZXNzYWdlcygpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLnNldHVwQW5kUHJvY2VzcyhcbiAgICAgIChcbiAgICAgICAgY2hhbm5lbDogYW1xcGxpYi5DaGFubmVsLFxuICAgICAgICBsb2dNZXNzYWdlQ3N2OiBib29sZWFuLFxuICAgICAgICBsb2dNZXNzYWdlOiBib29sZWFuXG4gICAgICApID0+IHtcbiAgICAgICAgbGV0IGNvdW50ID0gMDtcblxuICAgICAgICByZXR1cm4gY2hhbm5lbFxuICAgICAgICAgIC5jb25zdW1lKHRoaXMucXVldWUsIChtZXNzYWdlOiBNZXNzYWdlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNwaW5uZXIuc3RvcCh0cnVlKTtcblxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UgIT0gbnVsbCkge1xuICAgICAgICAgICAgICBjb3VudCsrO1xuICAgICAgICAgICAgICB0aGlzLmxvZyhjb3VudCwgbWVzc2FnZSwgbG9nTWVzc2FnZSwgbG9nTWVzc2FnZUNzdik7XG4gICAgICAgICAgICAgIHRoaXMuc3Bpbm5lci5zdGFydCgpO1xuICAgICAgICAgICAgICByZXR1cm4gY2hhbm5lbC5hY2sobWVzc2FnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ2Vycm9yIHdoZW4gY29uc3VtaW5nIGEgbWVzc2FnZScsIGVycm9yKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH1cbiAgICApLmNhdGNoKChlcnIpID0+IGNvbnNvbGUuZXJyb3IoJ29oIG9oJywgZXJyKSk7XG4gIH1cblxuICAvKipcbiAgICogY29ubmVjdCBhbmQgY29uc3VtZSBhIHNwZWNpZmljIG51bWJlciBvZiBtZXNzYWdlc1xuICAgKi9cbiAgcHVibGljIGFzeW5jIGNvbnN1bWVObWVzc2FnZXMobnVtVG9Db25zdW1lOiBudW1iZXIpIHtcbiAgICByZXR1cm4gdGhpcy5zZXR1cEFuZFByb2Nlc3MoXG4gICAgICAoXG4gICAgICAgIGNoYW5uZWw6IGFtcXBsaWIuQ2hhbm5lbCxcbiAgICAgICAgbG9nTWVzc2FnZUNzdjogYm9vbGVhbixcbiAgICAgICAgbG9nTWVzc2FnZTogYm9vbGVhblxuICAgICAgKSA9PiB7XG4gICAgICAgIGxldCBjb3VudCA9IDA7XG4gICAgICAgIGNvbnN0IGNvbnN1bWVycyA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCBudW1Ub0NvbnN1bWU7IGkrKykge1xuICAgICAgICAgIGNvbnN1bWVycy5wdXNoKGNoYW5uZWwuZ2V0KHRoaXMucXVldWUpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoY29uc3VtZXJzKVxuICAgICAgICAgIC50aGVuKChtZXNzYWdlcykgPT4ge1xuICAgICAgICAgICAgdGhpcy5zcGlubmVyLnN0b3AodHJ1ZSk7XG5cbiAgICAgICAgICAgIG1lc3NhZ2VzLmZvckVhY2goKG1lc3NhZ2UpID0+IHtcbiAgICAgICAgICAgICAgaWYgKG1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICBjb3VudCsrO1xuICAgICAgICAgICAgICAgIHRoaXMubG9nKGNvdW50LCBtZXNzYWdlLCBsb2dNZXNzYWdlLCBsb2dNZXNzYWdlQ3N2KTtcbiAgICAgICAgICAgICAgICAvL3NwaW5uZXIuc3RhcnQoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2hhbm5lbC5hY2sobWVzc2FnZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBjaGFubmVsLmNsb3NlKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiBwcm9jZXNzLmV4aXQoMCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaCgoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignZXJyb3Igd2hlbiBjb25zdW1pbmcgYSBtZXNzYWdlJywgZXJyb3IpO1xuICAgICAgICAgIH0pO1xuICAgICAgfVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIHNldHVwQW5kUHJvY2Vzcyhwcm9jZXNzRm46IEZ1bmN0aW9uKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGNvbm5lY3Rpb24gPSBhd2FpdCBuZXcgQ29ubmVjdGlvbkhlbHBlcih0aGlzLmkxOG4pLmNyZWF0ZUNvbm5lY3Rpb24oXG4gICAgICAgIHRoaXMudXJsXG4gICAgICApO1xuICAgICAgY29uc3QgY2hhbm5lbCA9IGF3YWl0IGNvbm5lY3Rpb24uY3JlYXRlQ2hhbm5lbCgpO1xuXG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBvayA9IGF3YWl0IGNoYW5uZWwuY2hlY2tRdWV1ZSh0aGlzLnF1ZXVlKTtcblxuICAgICAgICBpZiAob2spIHtcbiAgICAgICAgICBjb25zb2xlLmluZm8oXG4gICAgICAgICAgICBgIFsqXSBXYWl0aW5nIGZvciBtZXNzYWdlcyBpbiAke2NoYWxrLmJvbGQucmVkKFxuICAgICAgICAgICAgICB0aGlzLnF1ZXVlXG4gICAgICAgICAgICApfS4gJHtjaGFsay5pbnZlcnNlLmdyZWVuQnJpZ2h0KCdDVFJMLUMnKX0gdG8gZXhpdGBcbiAgICAgICAgICApO1xuICAgICAgICAgIHRoaXMuc3Bpbm5lci5zdGFydCgpO1xuICAgICAgICAgIGNvbnN0IGxvZ01lc3NhZ2UgPSB0aGlzLmxvZ01lc3NhZ2U7XG4gICAgICAgICAgY29uc3QgbG9nTWVzc2FnZUNzdiA9IHRoaXMubG9nTWVzc2FnZUNzdjtcblxuICAgICAgICAgIHJldHVybiBwcm9jZXNzRm4oY2hhbm5lbCwgbG9nTWVzc2FnZUNzdiwgbG9nTWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmVycm9yKGAke3RoaXMuaTE4bi5fXygnY29ubmVjdC5lcnJvci5tc2cucXVldWUnKX1gLCBlcnIpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICBgJHt0aGlzLmkxOG4uX18oJ2Nvbm5lY3QuZXJyb3IubXNnLnNlcnZlcicpfWAsXG4gICAgICAgIGVycm9yLm1lc3NhZ2VcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBsb2coXG4gICAgY291bnQ6IG51bWJlcixcbiAgICBtZXNzYWdlOiBNZXNzYWdlLFxuICAgIGxvZ01lc3NhZ2U6IGJvb2xlYW4sXG4gICAgbG9nTWVzc2FnZUNzdjogYm9vbGVhblxuICApIHtcbiAgICBpZiAobG9nTWVzc2FnZUNzdikge1xuICAgICAgLy8gYWRkIGhlYWRlciB3aGVuIGZpcnN0IGVudHJ5XG4gICAgICBpZiAoY291bnQgPT09IDEpIHtcbiAgICAgICAgY29uc29sZS5kZWJ1ZyhcbiAgICAgICAgICAnLS0tLTg8LS0tLS0tLS0tODwtLS0tLS0tLS04PC0tLS0tLS0tODwtLS0tLS0tLS04PC0tLS0tLS0tODwtLS0tLS0tLS0tJ1xuICAgICAgICApO1xuICAgICAgICBjb25zb2xlLmRlYnVnKGAke3RoaXMuaTE4bi5fXygnbG9nLmNzdi5oZWFkZXInKX1gKTtcbiAgICAgIH1cbiAgICAgIGNvbnNvbGUuZGVidWcoYCR7Y291bnR9LFwiJHttZXNzYWdlLmNvbnRlbnQudG9TdHJpbmcoKX1cImApO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAobG9nTWVzc2FnZSkge1xuICAgICAgICBjb25zb2xlLmRlYnVnKG1lc3NhZ2UuY29udGVudC50b1N0cmluZygpKTtcbiAgICAgIH1cbiAgICAgIGNvbnNvbGUuaW5mbyhgbWVzc2FnZTogJHtjb3VudH0gJHtlbW9qaS5nZXQoJ3doaXRlX2NoZWNrX21hcmsnKX1gKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==