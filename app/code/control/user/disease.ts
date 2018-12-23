import { AppObject, Component } from 'backappjh';
import { BasicSocket, UniqueSocket } from 'basicsocket';
import { User } from './user';
import { Authentication } from './authentication';
import { Address } from './address';
import { Phone } from './phone';
import { Permission } from './permission';

export class Disease extends AppObject {
    private socketIo: BasicSocket;
    private subscribers: Array<any>;
    private subscribersSign: Array<any>;
    private logged: User;
    private tempRegister: User;
    private menu: any;
    private tempObjectArray: Array<any>;

    constructor(father?: Component) {
        super(father);
        this.init();
    }

    public init(){
    }

    public subscribeSign(callback) {
        // we could check to see if it is already subscribed
        this.subscribersSign.push(callback);
        console.log(callback.name, 'has been subscribed to UserManegement Sign');
    }

    public unsubscribeSign(callback) {
        this.subscribersSign = this.subscribersSign.filter((element) => {
            return element !== callback;
        });
    }

    public publishSign(data) {
        this.subscribersSign.forEach((subscriber) => {
            subscriber(data);
        });
    }

    public subscribe(callback) {
        // we could check to see if it is already subscribed
        this.subscribers.push(callback);
        console.log(callback.name, 'has been subscribed to UserManegement');
    }

    public unsubscribe(callback) {
        this.subscribers = this.subscribers.filter((element) => {
            return element !== callback;
        });
    }

    public publish(data) {
        this.subscribers.forEach((subscriber) => {
            subscriber(data);
        });
    }
}
