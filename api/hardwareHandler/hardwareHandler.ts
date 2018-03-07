import { Disk } from './../disk/disk';
import { Handler, Event, Operation } from 'flexiblepersistence';
import { User } from '../user/user';
import { Authentication } from '../user/authentication';
import { Permission } from '../user/permission';
import { ExternalHandler } from '../externalHandler/externalHandler';
import { BasicHardwareHandler } from 'backapijh';
// let packageJson = require('./../package.json');

export class HardwareHandler extends BasicHardwareHandler {
    private disk: Disk;
    private externalSubscribers: any;
    private externalSubscribersOldData: any;
    private deviceSubscribers: any;
    private handler: Handler;
    private externalHandler: ExternalHandler;

    constructor() {
        super();
        this.disk = new Disk();
        this.deviceSubscribers = {};
        this.externalSubscribers = {};
        this.externalSubscribersOldData = {};
        this.handler = new Handler(process.env.POCKET_DOC_DB, process.env.POCKET_DOC_DB_HOST, parseInt(process.env.POCKET_DOC_DB_PORT, 10));
    }

    public getExternalHandler() {
        return this.externalHandler;
    }

    public setExternalHandler(externalHandler: ExternalHandler) {
        this.externalHandler = externalHandler;
    }

    // tslint:disable-next-line:no-empty
    public init() { }

    public addUser(device, user) {
        let _self = this;
        this.handler.readArray('user', (error, data) => {
            for (let index = 0; index < data.length; index++) {
                let element: User = JSON.parse(JSON.stringify(data[index])); // JSON.parse(data[index])
                if (element.authentication.username === user) {
                    _self.devicePublish(device, 'user', element);
                }
            }
        });
    }

    public removeUser(device, user) {
        let _self = this;
        this.handler.readArray('user', (error, data) => {
            for (let index = 0; index < data.length; index++) {
                let element: User = JSON.parse(JSON.stringify(data[index])); // JSON.parse(data[index])
                // console.log('index', index);
                if (element.authentication.username === user) {
                    // console.log('element', element);
                    // console.log('device', device);
                    _self.devicePublish(device, 'removeUser', element);
                }
            }
        });
    }

    public setUsers(device, user) {
        let _self = this;
        this.handler.readArray('user', (error, data) => {
            let arrayUsers: Array<any> = new Array<any>();
            for (let index = 0; index < data.length; index++) {
                let element: User = JSON.parse(JSON.stringify(data[index])); // JSON.parse(data[index])
                if (element.authentication.username === user) {
                    arrayUsers.push(element);
                }
            }
            _self.devicePublish(device, 'users', arrayUsers);
        });
    }

    public getDevices() {
        this.externalHandler.getDevices();
    }

    public getUsers(socket) {
        let _self = this;
        this.handler.readArray('user', (error, data) => {
            _self.returnUsers(data, socket);
        });
    }

    public returnUsers(data, socket) {
        let users: Array<any> = new Array<any>();
        for (let index = 0; index < data.length; index++) {
            let element: User = JSON.parse(JSON.stringify(data[index])); // JSON.parse(data[index])
            delete element.authentication.passwordHash;
            delete element.authentication.salt;
            users.push(element);
        }
        // console.log('ERROR')
        socket.emit('users', users);
    }

    public newUser(user, socket) {
        if (socket.identification.user !== undefined) {
            if (user.authentication.permission > socket.identification.user.authentication.permission) {
                user.authentication.permission = socket.identification.user.authentication.permission
            }
        } else {
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
        let event = new Event(Operation.add, 'user', newUser);
        this.handler.addEvent(event);
    }

    public signIn(user, socket) {
        let _self = this;
        this.handler.readArray('user', (error, data) => {
            _self.signInCheck(user, data, socket);
        });
    }

    public signInCheck(user, data, socket) {
        console.log(user);
        for (let index = 0; index < data.length; index++) {
            let element = JSON.parse(JSON.stringify(data[index])); // JSON.parse(data[index])
            if (user.username === element.authentication.username) {
                let hash = Authentication.generatePasswordHashFromSalt(user.password, element.authentication.salt);
                if (element.authentication.passwordHash === hash.passwordHash) {
                    let logged = element;
                    delete logged.authentication.passwordHash;
                    delete logged.authentication.salt;
                    socket.identification.user = logged;
                    socket.identification.device = user.device;
                    socket.emit('userManegement', { user: logged });
                    return;
                }
            }
        }
        // console.log('ERROR')
        socket.emit('userManegement', {});
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

    public subscribeNewDevice(callback) {
        let _self = this;
        this.externalSubscribe('newDevice', (data) => {
            callback(data);
        });
    }

    public subscribeDevices(callback) {
        let _self = this;
        this.externalSubscribe('devices', (data) => {
            callback(data);
        });
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

    public deviceSubscribe(device, subscribers, callback) {
        this.checkDeviceSubscribers(device, subscribers);
        this.deviceSubscribers[device][subscribers].push(callback);
        console.log(callback.name, 'has been subscribed to', subscribers);
    }

    public deviceUnsubscribe(device, subscribers, callback) {
        this.checkDeviceSubscribers(device, subscribers);
        this.deviceSubscribers[device][subscribers] = this.deviceSubscribers[device][subscribers].filter((element) => {
            return element !== callback;
        });
    }

    public devicePublish(device, subscribers, data) {
        this.checkDeviceSubscribers(device, subscribers);
        this.deviceSubscribers[device][subscribers].forEach((subscriber) => {
            subscriber(data);
        });
    }

    private isOperator(socket) {
        return (socket.identification.user.authentication.permission >= Permission.Operator);
    }

    private isAdministator(socket) {
        return (socket.identification.user.authentication.permission >= Permission.Administrator);
    }

    private checkExternalSubscribers(subscribers) {
        if (this.externalSubscribers[subscribers] === undefined) {
            this.externalSubscribers[subscribers] = new Array<any>();
            this.externalSubscribersOldData[subscribers] = new Array<any>();
        }
    }

    private checkDeviceSubscribers(device, subscribers) {
        if (this.deviceSubscribers[device] === undefined) {
            this.deviceSubscribers[device] = {};
        }
        if (this.deviceSubscribers[device][subscribers] === undefined) {
            this.deviceSubscribers[device][subscribers] = new Array<any>();
        }
    }
}
