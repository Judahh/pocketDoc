import { path, BasicApi, BasicExternalHandler, BasicSocket } from 'backapijh';
import { HardwareHandler } from '../hardwareHandler/hardwareHandler';

export class ExternalHandler extends BasicExternalHandler {
    private hardwareHandler: HardwareHandler;

    constructor(hardwareHandler: HardwareHandler) {
        super();
        this.hardwareHandler = hardwareHandler;
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

    public configSocket(socketBasic: BasicSocket) {
        let _self = this;
        socketBasic.on('online', (online) => {
            _self.externalPublish('online', online);
        });
        socketBasic.on('gSM', (data) => {
            _self.externalPublish('gSM', data);
        });
        socketBasic.on('gPS', (data) => {
            _self.externalPublish('gPS', data);
        });
        socketBasic.on('wifi', (data) => {
            _self.externalPublish('wifi', data);
        });
        socketBasic.on('stream', (data) => {
            _self.externalPublish('streamOut', data);
        });
        socketBasic.on('subscribeStream', () => {
            _self.externalSubscribeStream('streamIn', socketBasic);
        });

        socketBasic.on('disk', (data) => {
            _self.uploadVideo(data.upload);
        });

        socketBasic.emit('subscribeGPS', {});
        socketBasic.emit('subscribeGSM', {});
        socketBasic.emit('subscribeWifi', {});
        socketBasic.emit('subscribeStream', {});
        socketBasic.emit('subscribeDisk', {});
        // this.io.on()
    }
}
