import { BasicAppHandler, Socket } from 'backapijh';
import { HardwareHandler } from '../hardwareHandler/hardwareHandler';

export class AppHandler extends BasicAppHandler {

    constructor(hardwareHandler: HardwareHandler) {
        super(hardwareHandler);
    }

    // tslint:disable-next-line:no-empty
    public init() { }

    public subscribeGPS(socket) {
        this.hardwareHandler.subscribeGPS((data) => {
            socket.emit('gPS', data);
        });
    }

    public subscribeGSM(socket) {
        this.hardwareHandler.subscribeGSM((data) => {
            socket.emit('gSM', data);
        });
    }

    public subscribeWifi(socket) {
        this.hardwareHandler.subscribeWifi((data) => {
            socket.emit('wifi', data);
        });
    }

    public subscribeDisk(socket) {
        this.hardwareHandler.subscribeDisk((data) => {
            socket.emit('disk', data);
        });
    }

    public subscribeNewDevice(socket) {
        this.hardwareHandler.subscribeNewDevice((data) => {
            socket.emit('newDevice', data);
        });
    }

    public subscribeDevices(socket) {
        this.hardwareHandler.subscribeDevices((data) => {
            socket.emit('devices', data);
        });
    }

    public getVideos() {
        this.hardwareHandler.getVideos();
    }

    public externalPublish(subscribers, data) {
        this.hardwareHandler.externalPublish(subscribers, data);
    }

    public externalSubscribe(subscribers, socket) {
        this.hardwareHandler.externalSubscribe(subscribers, (data) => {
            socket.emit(subscribers, data);
        });
    }

    public devicePublish(device, subscribers, data) {
        this.hardwareHandler.devicePublish(device, subscribers, data);
    }

    public deviceSubscribe(device, subscribers, socket) {
        this.hardwareHandler.deviceSubscribe(device, subscribers, (data) => {
            socket.emit(subscribers, data);
        });
    }

    public externalSubscribeStream(subscribers, socket) {
        this.hardwareHandler.externalSubscribe(subscribers, (data) => {
            socket.emit('stream', data);
        });
    }

    public configSocket(socket: Socket) {
        let _self = this;

        socket.subscribe('getVideos', () => { _self.getVideos(); });
        socket.subscribe('subscribeGPS', () => { _self.subscribeGPS(socket); });
        socket.subscribe('subscribeGSM', () => { _self.subscribeGSM(socket); });
        socket.subscribe('subscribeWifi', () => { _self.subscribeWifi(socket); });
        socket.subscribe('subscribe', () => { _self.subscribeWifi(socket); });

        socket.subscribe('signUp', (user) => { _self.hardwareHandler.signUp(user, socket); });
        socket.subscribe('signIn', (user) => { _self.hardwareHandler.signIn(user, socket); });

        socket.subscribe('subscribeStream', () => { _self.externalSubscribeStream('streamOut', socket); });
        socket.subscribe('stream', (stream) => { _self.externalPublish('streamIn', stream); });

        socket.subscribe('subscribeDisk', () => { _self.subscribeDisk(socket); });

        socket.subscribe('subscribeNewDevice', () => { _self.subscribeNewDevice(socket); });
        socket.subscribe('getUsers', () => { _self.hardwareHandler.getUsers(socket); });

        socket.subscribe('setUsers', (data) => { _self.hardwareHandler.setUsers(data.device, data.users); });
        socket.subscribe('addUser', (data) => { _self.hardwareHandler.addUser(data.device, data.user); });
        socket.subscribe('removeUser', (data) => { _self.hardwareHandler.removeUser(data.device, data.user); });

        socket.subscribe('getDevices', () => { _self.hardwareHandler.getDevices(); });
    }

}
