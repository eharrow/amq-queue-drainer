"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.ConnectionHelper = void 0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdGlvbkhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25uZWN0aW9uSGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxrREFBMEI7QUFDMUIsaURBQW1DO0FBRW5DLE1BQWEsZ0JBQWdCO0lBRzNCLFlBQVksSUFBUztRQUNuQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNuQixDQUFDO0lBQ1ksZ0JBQWdCLENBQUMsR0FBVzs7WUFDdkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxJQUFJLGVBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBRWpFLE1BQU0sVUFBVSxHQUFHLE1BQU0sT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUU5QyxVQUFVLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLEdBQVUsRUFBRSxFQUFFO2dCQUNwQyxJQUFJLEdBQUcsQ0FBQyxPQUFPLEtBQUssb0JBQW9CLEVBQUU7b0JBQ3hDLE9BQU8sQ0FBQyxLQUFLLENBQUMsbUJBQW1CLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2lCQUNqRDtZQUNILENBQUMsQ0FBQyxDQUFDO1lBRUgsVUFBVSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFVLEVBQUUsRUFBRTtnQkFFcEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFO29CQUM5QixPQUFPLENBQUMsS0FBSyxDQUFDLHdDQUF3QyxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDckUsT0FBTyxVQUFVLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7aUJBQ2hFO1lBQ0gsQ0FBQyxDQUFDLENBQUM7WUFFSCxPQUFPLFVBQVUsQ0FBQztRQUNwQixDQUFDO0tBQUE7Q0FDRjtBQTNCRCw0Q0EyQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hhbGsgZnJvbSAnY2hhbGsnO1xuaW1wb3J0ICogYXMgYW1xcGxpYiBmcm9tICdhbXFwbGliJztcblxuZXhwb3J0IGNsYXNzIENvbm5lY3Rpb25IZWxwZXIge1xuICBwcml2YXRlIGkxOG46IGFueTtcblxuICBjb25zdHJ1Y3RvcihpMThuOiBhbnkpIHtcbiAgICB0aGlzLmkxOG4gPSBpMThuO1xuICB9XG4gIHB1YmxpYyBhc3luYyBjcmVhdGVDb25uZWN0aW9uKHVybDogc3RyaW5nKSB7XG4gICAgY29uc29sZS5sb2coYCR7dGhpcy5pMThuLl9fKCdjb25uZWN0Lm1zZycpfSAke2NoYWxrLmJsdWUodXJsKX1gKTtcblxuICAgIGNvbnN0IGNvbm5lY3Rpb24gPSBhd2FpdCBhbXFwbGliLmNvbm5lY3QodXJsKTtcblxuICAgIGNvbm5lY3Rpb24ub24oJ2Vycm9yJywgKGVycjogRXJyb3IpID0+IHtcbiAgICAgIGlmIChlcnIubWVzc2FnZSAhPT0gJ0Nvbm5lY3Rpb24gY2xvc2luZycpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignW0FNUVBdIGNvbm4gZXJyb3InLCBlcnIubWVzc2FnZSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25uZWN0aW9uLm9uKCdjbG9zZScsIChlcnI6IEVycm9yKSA9PiB7XG4gICAgICAvLyB3aGVuIHRoZSBxdWV1ZSBkb2VzIG5vdCBleGlzdCBkb24ndCBib3RoZXIgcmVjb25uZWN0aW5nXG4gICAgICBpZiAoIWVyci5tZXNzYWdlLnNlYXJjaCgnNDA0JykpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignW0FNUVBdIGNvbm4gY2xvc2VkLiAgV2lsbCByZWNvbm5lY3QuLi4nLCBlcnIubWVzc2FnZSk7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KHRoaXMuY3JlYXRlQ29ubmVjdGlvbi5iaW5kKG51bGwsIHVybCksIDEwMDApO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGNvbm5lY3Rpb247XG4gIH1cbn1cbiJdfQ==