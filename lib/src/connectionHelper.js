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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const amqplib = __importStar(require("amqplib"));
class ConnectionHelper {
    constructor(i18n) {
        this.i18n = i18n;
    }
    createConnection(url) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`${this.i18n.__('connect.msg')} ${chalk_1.default.blue(url)}`);
            const connection = yield amqplib.connect(url);
            connection.on('error', (err) => {
                if (err.message !== 'Connection closing') {
                    console.error('[AMQP] conn error', err.message);
                }
            });
            connection.on('close', (err) => {
                if (!err.message.search('404')) {
                    console.error('[AMQP] conn closed.  Will reconnect...', err.message);
                    return setTimeout(this.createConnection.bind(null, url), 1000);
                }
            });
            return connection;
        });
    }
}
exports.ConnectionHelper = ConnectionHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdGlvbkhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25uZWN0aW9uSGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGtEQUEwQjtBQUMxQixpREFBbUM7QUFFbkMsTUFBYSxnQkFBZ0I7SUFHM0IsWUFBWSxJQUFTO1FBQ25CLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ25CLENBQUM7SUFDWSxnQkFBZ0IsQ0FBQyxHQUFXOztZQUN2QyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLElBQUksZUFBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7WUFFakUsTUFBTSxVQUFVLEdBQUcsTUFBTSxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRTlDLFVBQVUsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsR0FBVSxFQUFFLEVBQUU7Z0JBQ3BDLElBQUksR0FBRyxDQUFDLE9BQU8sS0FBSyxvQkFBb0IsRUFBRTtvQkFDeEMsT0FBTyxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7aUJBQ2pEO1lBQ0gsQ0FBQyxDQUFDLENBQUM7WUFFSCxVQUFVLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLEdBQVUsRUFBRSxFQUFFO2dCQUVwQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBQzlCLE9BQU8sQ0FBQyxLQUFLLENBQUMsd0NBQXdDLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUNyRSxPQUFPLFVBQVUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztpQkFDaEU7WUFDSCxDQUFDLENBQUMsQ0FBQztZQUVILE9BQU8sVUFBVSxDQUFDO1FBQ3BCLENBQUM7S0FBQTtDQUNGO0FBM0JELDRDQTJCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGFsayBmcm9tICdjaGFsayc7XG5pbXBvcnQgKiBhcyBhbXFwbGliIGZyb20gJ2FtcXBsaWInO1xuXG5leHBvcnQgY2xhc3MgQ29ubmVjdGlvbkhlbHBlciB7XG4gIHByaXZhdGUgaTE4bjogYW55O1xuXG4gIGNvbnN0cnVjdG9yKGkxOG46IGFueSkge1xuICAgIHRoaXMuaTE4biA9IGkxOG47XG4gIH1cbiAgcHVibGljIGFzeW5jIGNyZWF0ZUNvbm5lY3Rpb24odXJsOiBzdHJpbmcpIHtcbiAgICBjb25zb2xlLmxvZyhgJHt0aGlzLmkxOG4uX18oJ2Nvbm5lY3QubXNnJyl9ICR7Y2hhbGsuYmx1ZSh1cmwpfWApO1xuXG4gICAgY29uc3QgY29ubmVjdGlvbiA9IGF3YWl0IGFtcXBsaWIuY29ubmVjdCh1cmwpO1xuXG4gICAgY29ubmVjdGlvbi5vbignZXJyb3InLCAoZXJyOiBFcnJvcikgPT4ge1xuICAgICAgaWYgKGVyci5tZXNzYWdlICE9PSAnQ29ubmVjdGlvbiBjbG9zaW5nJykge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdbQU1RUF0gY29ubiBlcnJvcicsIGVyci5tZXNzYWdlKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbm5lY3Rpb24ub24oJ2Nsb3NlJywgKGVycjogRXJyb3IpID0+IHtcbiAgICAgIC8vIHdoZW4gdGhlIHF1ZXVlIGRvZXMgbm90IGV4aXN0IGRvbid0IGJvdGhlciByZWNvbm5lY3RpbmdcbiAgICAgIGlmICghZXJyLm1lc3NhZ2Uuc2VhcmNoKCc0MDQnKSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdbQU1RUF0gY29ubiBjbG9zZWQuICBXaWxsIHJlY29ubmVjdC4uLicsIGVyci5tZXNzYWdlKTtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQodGhpcy5jcmVhdGVDb25uZWN0aW9uLmJpbmQobnVsbCwgdXJsKSwgMTAwMCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gY29ubmVjdGlvbjtcbiAgfVxufVxuIl19