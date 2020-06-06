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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2ZpbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUNBLGtEQUEwQjtBQUMxQixzREFBNkI7QUFDN0IseURBQXNEO0FBS3RELE1BQWEsTUFBTTtJQWFqQixZQUNFLEdBQVcsRUFDWCxLQUFhLEVBQ2IsVUFBbUIsRUFDbkIsYUFBc0IsRUFDdEIsSUFBUztRQUVULElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDN0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7UUFDbkMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDbkIsQ0FBQztJQUtZLGNBQWM7O1lBQ3pCLE1BQU0sT0FBTyxHQUFvQixNQUFNLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUM5RCxPQUFPLElBQUksRUFBRTtnQkFDWCxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDN0I7UUFDSCxDQUFDO0tBQUE7SUFFYSxPQUFPLENBQUMsT0FBd0I7O1lBQzVDO2dCQUNFLE1BQU0sUUFBUSxHQUFHLEdBQUcsRUFBRTtvQkFDcEIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbEIsQ0FBQyxDQUFDO2dCQUNGLE1BQU0sUUFBUSxHQUFRLE1BQU0saUJBQU0sQ0FDaEM7b0JBQ0UsSUFBSSxFQUFFLE1BQU07b0JBQ1osSUFBSSxFQUFFLE9BQU87b0JBQ2IsT0FBTyxFQUFFLHFCQUFxQjtvQkFDOUIsUUFBUSxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FDbEIsS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLDZCQUE2QixDQUFDLENBQUMsQ0FBQyxJQUFJO2lCQUM1RCxFQUNELEVBQUUsUUFBUSxFQUFFLENBQ2IsQ0FBQztnQkFFRixNQUFNLEdBQUcsR0FBVyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQ3hELE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDM0U7UUFDSCxDQUFDO0tBQUE7SUFDTyxRQUFRO1FBQ2QsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDO0lBRU8sVUFBVTtRQUNoQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQztJQUVhLGVBQWU7O1lBQzNCLElBQUk7Z0JBQ0YsTUFBTSxVQUFVLEdBQUcsTUFBTSxJQUFJLG1DQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxnQkFBZ0IsQ0FDdkUsSUFBSSxDQUFDLEdBQUcsQ0FDVCxDQUFDO2dCQUNGLE1BQU0sT0FBTyxHQUFHLE1BQU0sVUFBVSxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUVqRCxJQUFJO29CQUNGLE1BQU0sRUFBRSxHQUFHLE1BQU0sT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBRWhELElBQUksRUFBRSxFQUFFO3dCQUNOLE9BQU8sQ0FBQyxJQUFJLENBQ1Ysd0NBQXdDLGVBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUNwRCxJQUFJLENBQUMsS0FBSyxDQUNYLEtBQUssZUFBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FDcEQsQ0FBQzt3QkFDRixPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7cUJBQ2pDO3lCQUFNO3dCQUNMLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztxQkFDckM7aUJBQ0Y7Z0JBQUMsT0FBTyxHQUFHLEVBQUU7b0JBQ1osT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLHlCQUF5QixDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztvQkFDakUsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO2lCQUNyQzthQUNGO1lBQUMsT0FBTyxLQUFLLEVBQUU7Z0JBQ2QsT0FBTyxDQUFDLEtBQUssQ0FDWCxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLDBCQUEwQixDQUFDLEVBQUUsRUFDN0MsS0FBSyxDQUFDLE9BQU8sQ0FDZCxDQUFDO2dCQUNGLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUNyQztRQUNILENBQUM7S0FBQTtDQUNGO0FBakdELHdCQWlHQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGFtcXBsaWIgZnJvbSAnYW1xcGxpYic7XG5pbXBvcnQgY2hhbGsgZnJvbSAnY2hhbGsnO1xuaW1wb3J0IHByb21wdCBmcm9tICdwcm9tcHRzJztcbmltcG9ydCB7IENvbm5lY3Rpb25IZWxwZXIgfSBmcm9tICcuL2Nvbm5lY3Rpb25IZWxwZXInO1xuXG4vKipcbiAqIFRoZSBxdWV1ZSBkcmFpbmVyIHRoYXQgY29ubmVjdHMgdG8gYW4gQU1RIHF1ZXVlIGFuZCBjb25zdW1lcyBhbGwgdGhlIG1lc3NhZ2VzLlxuICovXG5leHBvcnQgY2xhc3MgRmlsbGVyIHtcbiAgcHJpdmF0ZSB1cmw6IHN0cmluZztcbiAgcHJpdmF0ZSBxdWV1ZTogc3RyaW5nO1xuICBwcml2YXRlIGxvZ01lc3NhZ2U6IGJvb2xlYW47XG4gIHByaXZhdGUgbG9nTWVzc2FnZUNzdjogYm9vbGVhbjtcbiAgcHJpdmF0ZSBpMThuOiBhbnk7XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcbiAgICogQHBhcmFtIHtzdHJpbmd9IHF1ZXVlXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gbG9nTWVzc2FnZVxuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKFxuICAgIHVybDogc3RyaW5nLFxuICAgIHF1ZXVlOiBzdHJpbmcsXG4gICAgbG9nTWVzc2FnZTogYm9vbGVhbixcbiAgICBsb2dNZXNzYWdlQ3N2OiBib29sZWFuLFxuICAgIGkxOG46IGFueVxuICApIHtcbiAgICB0aGlzLnVybCA9IHVybDtcbiAgICB0aGlzLnF1ZXVlID0gcXVldWU7XG4gICAgdGhpcy5sb2dNZXNzYWdlID0gbG9nTWVzc2FnZTtcbiAgICB0aGlzLmxvZ01lc3NhZ2VDc3YgPSBsb2dNZXNzYWdlQ3N2O1xuICAgIHRoaXMuaTE4biA9IGkxOG47XG4gIH1cblxuICAvKipcbiAgICogY29ubmVjdCBhbmQgY29uc3VtZSBtZXNzYWdlc1xuICAgKi9cbiAgcHVibGljIGFzeW5jIHB1Ymxpc2hNZXNzYWdlKCkge1xuICAgIGNvbnN0IGNoYW5uZWw6IGFtcXBsaWIuQ2hhbm5lbCA9IGF3YWl0IHRoaXMuc2V0dXBBbmRQcm9jZXNzKCk7XG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIGF3YWl0IHRoaXMucHVibGlzaChjaGFubmVsKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIHB1Ymxpc2goY2hhbm5lbDogYW1xcGxpYi5DaGFubmVsKSB7XG4gICAge1xuICAgICAgY29uc3Qgb25DYW5jZWwgPSAoKSA9PiB7XG4gICAgICAgIHByb2Nlc3MuZXhpdCgwKTtcbiAgICAgIH07XG4gICAgICBjb25zdCByZXNwb25zZTogYW55ID0gYXdhaXQgcHJvbXB0KFxuICAgICAgICB7XG4gICAgICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgICAgIG5hbWU6ICd2YWx1ZScsXG4gICAgICAgICAgbWVzc2FnZTogJ01lc3NhZ2UgdG8gcHVibGlzaD8nLFxuICAgICAgICAgIHZhbGlkYXRlOiAodmFsdWUpID0+XG4gICAgICAgICAgICB2YWx1ZS5sZW5ndGggPT09IDAgPyBgWW91IG5lZWQgdG8gZW50ZXIgc29tZXRoaW5nYCA6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICAgIHsgb25DYW5jZWwgfVxuICAgICAgKTtcblxuICAgICAgY29uc3QgYnVmOiBCdWZmZXIgPSBCdWZmZXIuZnJvbShyZXNwb25zZS52YWx1ZSwgJ3V0ZjgnKTtcbiAgICAgIFByb21pc2UucmVzb2x2ZShjaGFubmVsLnB1Ymxpc2godGhpcy5leGNoYW5nZSgpLCB0aGlzLnJvdXRpbmdLZXkoKSwgYnVmKSk7XG4gICAgfVxuICB9XG4gIHByaXZhdGUgZXhjaGFuZ2UoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICBwcml2YXRlIHJvdXRpbmdLZXkoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5xdWV1ZTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgc2V0dXBBbmRQcm9jZXNzKCk6IFByb21pc2U8YW55PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGNvbm5lY3Rpb24gPSBhd2FpdCBuZXcgQ29ubmVjdGlvbkhlbHBlcih0aGlzLmkxOG4pLmNyZWF0ZUNvbm5lY3Rpb24oXG4gICAgICAgIHRoaXMudXJsXG4gICAgICApO1xuICAgICAgY29uc3QgY2hhbm5lbCA9IGF3YWl0IGNvbm5lY3Rpb24uY3JlYXRlQ2hhbm5lbCgpO1xuXG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBvayA9IGF3YWl0IGNoYW5uZWwuY2hlY2tRdWV1ZSh0aGlzLnF1ZXVlKTtcblxuICAgICAgICBpZiAob2spIHtcbiAgICAgICAgICBjb25zb2xlLmluZm8oXG4gICAgICAgICAgICBgIFsqXSBXYWl0aW5nIGZvciBtZXNzYWdlcyB0byBzZW5kIHRvICR7Y2hhbGsuYm9sZC5yZWQoXG4gICAgICAgICAgICAgIHRoaXMucXVldWVcbiAgICAgICAgICAgICl9LiAke2NoYWxrLmludmVyc2UuZ3JlZW5CcmlnaHQoJ0NUUkwtQycpfSB0byBleGl0YFxuICAgICAgICAgICk7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShjaGFubmVsKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoJ25vIGNoYW5uZWwnKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYCR7dGhpcy5pMThuLl9fKCdjb25uZWN0LmVycm9yLm1zZy5xdWV1ZScpfWAsIGVycik7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgnbm8gY2hhbm5lbCcpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICBgJHt0aGlzLmkxOG4uX18oJ2Nvbm5lY3QuZXJyb3IubXNnLnNlcnZlcicpfWAsXG4gICAgICAgIGVycm9yLm1lc3NhZ2VcbiAgICAgICk7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoJ25vIGNoYW5uZWwnKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==