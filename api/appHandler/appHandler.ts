import { Router, Request, Response, NextFunction, Electron, ApiConfiguration, express, path, BasicApi, BasicAppHandler, BasicSocket } from 'backapijh';
import { HardwareHandler } from '../hardwareHandler/hardwareHandler';

export class AppHandler extends BasicAppHandler {

    constructor(hardwareHandler) {
        super(hardwareHandler);
    }

    // tslint:disable-next-line:no-empty
    public init() {

    }

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

    public externalSubscribeStream(subscribers, socket) {
        this.hardwareHandler.externalSubscribe(subscribers, (data) => {
            socket.emit('stream', data);
        });
    }

    public configSocket(socketBasic: BasicSocket) {
        let _self = this;

        socketBasic.on('getVideos', () => { _self.getVideos(); });
        socketBasic.on('subscribeGPS', () => { _self.subscribeGPS(socketBasic); });
        socketBasic.on('subscribeGSM', () => { _self.subscribeGSM(socketBasic); });
        socketBasic.on('subscribeWifi', () => { _self.subscribeWifi(socketBasic); });
        socketBasic.on('subscribe', () => { _self.subscribeWifi(socketBasic); });

        socketBasic.on('newUser', (user) => { _self.hardwareHandler.newUser(user, socketBasic); });
        socketBasic.on('login', (user) => { _self.hardwareHandler.login(user, socketBasic); });

        socketBasic.on('subscribeStream', () => { _self.externalSubscribeStream('streamOut', socketBasic); });
        socketBasic.on('stream', (stream) => { _self.externalPublish('streamIn', stream); });

        socketBasic.on('subscribeDisk', () => { _self.subscribeDisk(socketBasic); });
    }

}
