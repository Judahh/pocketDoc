import { Disk } from './../disk/disk';
import { Handler, Event, Operation } from "flexiblepersistence";
import { User } from '../user/user';
import { Authentication } from '../user/authentication';
import { Permission } from '../user/permission';
// let packageJson = require('./../package.json');

export class HardwareHandler {
    private disk: Disk;
    private externalSubscribers: any;
    private externalSubscribersOldData: any;
    private handler: Handler;

    constructor() {
        this.disk = new Disk();
        this.externalSubscribers = {};
        this.externalSubscribersOldData = {};
        this.handler = new Handler(process.env.POCKET_DOC_DB, process.env.POCKET_DOC_DB_HOST, parseInt(process.env.POCKET_DOC_DB_PORT, 10));
    }

    public init() {

    }

    private isOperator(socket){
        return (socket.identification.user.authentication.permission >= Permission.Operator);
    }

    private isAdministator(socket){
        return (socket.identification.user.authentication.permission >= Permission.Administrator);
    }

    public newUser(user, socket) {
        if (socket.identification.user != undefined) {
            if (user.authentication.permission > socket.identification.user.authentication.permission) {
                user.authentication.permission = socket.identification.user.authentication.permission
            }
        }else{
            user.authentication.permission = Permission.User;
        }

        let newUser = new User(user.name,
            user.nickname,
            user.mother,
            user.father,
            user.uId,
            user.uIdEmitter,
            user.uIdState,
            user.nUId,
            user.birth,
            user.birthState,
            user.nationality,
            user.email,
            user.role,
            new Authentication(user.authentication.username,
                user.authentication.password,
                user.authentication.permission));
        newUser.arrayAddress = user.arrayAddress;
        newUser.arrayPhone = user.arrayPhone;
        let event = new Event(Operation.add, "user", newUser);
        this.handler.addEvent(event);
    }

    public login(user, socket) {
        let _self = this;
        this.handler.readArray("user", (error, data) => {
            _self.loginCheck(user, data, socket);
        });
    }

    public loginCheck(user, data, socket) {
        // console.log(user);
        for (let index = 0; index < data.length; index++) {
            let element = JSON.parse(JSON.stringify(data[index]));//JSON.parse(data[index])
            if (user.username === element.authentication.username) {
                let hash = Authentication.generatePasswordHashFromSalt(user.password, element.authentication.salt);
                if (element.authentication.passwordHash === hash.passwordHash) {
                    let logged = element;
                    delete logged.authentication.passwordHash;
                    delete logged.authentication.salt;
                    socket.identification.user = logged;
                    socket.identification.device = user.device;
                    socket.emit('userManegement', { login: true, user: logged });
                    return;
                }
            }
        }
        // console.log("ERROR")
        socket.emit('userManegement', { login: false });
    }

    public getVideos() {
        this.disk.getVideos();
    }

    public uploadVideo(video) {
        this.disk.uploadVideo(video);
    }

    public subscribeDisk(callback) {
        let _self = this;
        this.disk.subscribe((data) => {
            callback(data);
        });
    }

    public subscribeGPS(callback) {
        let _self = this;
        this.externalSubscribe('gPS', (data) => {
            callback(data);
        });
    }

    public subscribeGSM(callback) {
        let _self = this;
        this.externalSubscribe('gSM', (data) => {
            callback(data);
        });
    }

    public subscribeWifi(callback) {
        let _self = this;
        this.externalSubscribe('wifi', (data) => {
            callback(data);
        });
    }

    private checkExternalSubscribers(subscribers) {
        if (this.externalSubscribers[subscribers] == undefined) {
            this.externalSubscribers[subscribers] = new Array<any>();
            this.externalSubscribersOldData[subscribers] = new Array<any>();
        }
    }

    public externalSubscribe(subscribers, callback) {
        this.checkExternalSubscribers(subscribers);
        this.externalSubscribers[subscribers].push(callback);
        this.externalSubscribersOldData[subscribers].forEach((data) => {
            callback(data);
        });
        console.log(callback.name, 'has been subscribed to', subscribers);
    }

    public externalUnsubscribe(subscribers, callback) {
        this.checkExternalSubscribers(subscribers);
        this.externalSubscribers[subscribers] = this.externalSubscribers[subscribers].filter((element) => {
            return element !== callback;
        });
    }

    public externalPublish(subscribers, data) {
        this.checkExternalSubscribers(subscribers);
        this.externalSubscribers[subscribers].forEach((subscriber) => {
            subscriber(data);
        });
        this.externalSubscribersOldData[subscribers].push(data);
    }
}
