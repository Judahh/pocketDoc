import { path, BasicApi, BasicExternalHandler, Socket } from 'backapijh';
import { HardwareHandler } from '../hardwareHandler/hardwareHandler';

export class ExternalHandler extends BasicExternalHandler {

    constructor(hardwareHandler: HardwareHandler) {
        super(hardwareHandler);
        this.hardwareHandler.setExternalHandler(this);
    }

    public uploadVideo(video) {
        this.hardwareHandler.uploadVideo(video);
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

    public devicePublish(device, subscribers, data) {
        this.hardwareHandler.devicePublish(device, subscribers, data);
    }

    public deviceSubscribe(device, subscribers, socket) {
        this.hardwareHandler.deviceSubscribe(device, subscribers, (data) => {
            socket.emit(subscribers, data);
        });
    }

    public getDevices() {
        for (let index = 0; index < this.arraySocket.length; index++) {
            let socket = this.arraySocket[index];
            socket.emit('getUsers', {});
        }
    }

    public users(socket, users) {
        let identification = socket.getIdentification();
        this.externalPublish('newDevice', { identification: identification, users: users });
    }

    protected serverConnected(socket) {
        console.log('ID:', socket.getIdentification());
        socket.emit('subscribeGPS', {});
        socket.emit('subscribeGSM', {});
        socket.emit('subscribeWifi', {});
        socket.emit('subscribeStream', {});
        socket.emit('subscribeDisk', {});
        socket.emit('getUsers', {});
    }

    public configSocket(socket: Socket) {
        let _self = this;
        socket.subscribe('online', (online) => {
            _self.externalPublish('online', online);
        });
        socket.subscribe('gSM', (data) => {
            _self.externalPublish('gSM', data);
        });
        socket.subscribe('gPS', (data) => {
            _self.externalPublish('gPS', data);
        });
        socket.subscribe('wifi', (data) => {
            _self.externalPublish('wifi', data);
        });
        socket.subscribe('stream', (data) => {
            _self.externalPublish('streamOut', data);
        });
        socket.subscribe('subscribeStream', () => {
            _self.externalSubscribe('streamIn', socket);
        });
        socket.subscribe('subscribeUser', () => {
            _self.deviceSubscribe(socket.getBasicSocket().getIdentification().serialNumber, 'user', socket);
        });
        socket.subscribe('subscribeRemoveUser', () => {
            _self.deviceSubscribe(socket.getBasicSocket().getIdentification().serialNumber, 'removeUser', socket);
        });
        socket.subscribe('subscribeUsers', () => {
            _self.deviceSubscribe(socket.getBasicSocket().getIdentification().serialNumber, 'users', socket);
        });

        socket.subscribe('disk', (data) => {
            _self.uploadVideo(data.upload);
        });

        socket.subscribe('users', (users) => {
            _self.users(socket, users);
        });

        // console.log(socket.getIdentification());
        // _self.externalPublish('newDevice', _self.getFullIdentification(socket));
        // this.io.on()
    }
}
