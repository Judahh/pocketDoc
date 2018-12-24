import { AppObject, Component, ComponentItem, ComponentDataInput, ComponentOption, ComponentPageBody, ComponentView, ComponentComboBox, ComponentInformation, AppObjectEvent/*, ComponentNotification*/ } from 'backappjh';
import { BasicSocket, UniqueSocket } from 'basicsocket';
import { User } from '../user/user';
import { Util } from '../../view/util/util';

export class Sign extends AppObject {
    private static instance: Sign;
    private socketIo: BasicSocket;
    private subscribers: Array<any>;
    private subscribersSign: Array<any>;
    private subscribersSignOut: Array<any>;
    private tempUser: User;
    private signed;

    public static getInstance(father?: Component): Sign {
        if (!Sign.instance) {
            Sign.instance = new Sign(father);
        }
        return Sign.instance;
    }

    constructor(father?: Component) {
        super(father);
        this.init();
    }

    private init() {
        let _self = this;
        // _self.tempObjectArray = new Array<any>();
        _self.subscribers = new Array<any>();
        _self.subscribersSign = new Array<any>();
        _self.subscribersSignOut = new Array<any>();
        _self.socketIo = UniqueSocket.getInstance().getBasicSocket();
        _self.socketIo.on('sign', (data) => { _self.publish({ sign: data }); });
        _self.subscribe((data) => { _self.sign(data); });
        // _self.headerView = divisor.getHeader();
    }

    public getSigned() {
        return this.signed;
    }

    public setSigned(signed) {
        this.signed = signed;
    }

    public getTempUser() {
        return this.tempUser;
    }

    public setTempUser(user: User) {
        this.tempUser = user;
    }

    public subscribeSign(callback) {
        // we could check to see if it is already subscribed
        this.subscribersSign.push(callback);
        console.log(callback.name, 'has been subscribed to Sign');
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
        this.subscribersSignOut.forEach((subscriber) => {
            subscriber(!data);
        });
    }

    public subscribeSignOut(callback) {
        // we could check to see if it is already subscribed
        this.subscribersSignOut.push(callback);
        console.log(callback.name, 'has been subscribed to Sign');
    }

    public unsubscribeSignOut(callback) {
        this.subscribersSignOut = this.subscribersSignOut.filter((element) => {
            return element !== callback;
        });
    }

    public publishSignOut(data) {
        this.subscribersSignOut.forEach((subscriber) => {
            subscriber(data);
        });
        this.subscribersSign.forEach((subscriber) => {
            subscriber(!data);
        });
    }

    public subscribe(callback) {
        // we could check to see if it is already subscribed
        this.subscribers.push(callback);
        console.log(callback.name, 'has been subscribed to Sign');
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

    public sign(data) {
        let sign;
        console.log('data:', data);
        if (this !== undefined) {
            sign = this;
        } else {
            sign = Sign.getInstance();
        }
        if (data.sign !== undefined) {
            if (data.sign.user !== undefined) {
                Util.getInstance().notificationNone();
                Util.getInstance().goTo('home');
                // Util.getInstance().refreshHeader();
                Util.getInstance().getInfo(data.sign.user);
            } else if (data.sign.error !== undefined) {
                Util.getInstance().notificationCustom(data.sign.error);
            }
            sign.setSigned(data.sign.user)
            sign.publishSign(data.sign.user !== undefined);
        }
    }

    public signIn(log) {
        Util.getInstance().notificationNone();
        this.socketIo.emit('signIn', log);
    }

    public signUp(log) {
        Util.getInstance().notificationNone();
        this.socketIo.emit('signUp', log);
    }

    public isSigned() {
        return ((Sign.getInstance().getSigned() !== undefined) && (Sign.getInstance().getSigned() !== null));
    }

    public signOut() {
        // this.socketIo.emit('signOut', {});
        Sign.getInstance().setSigned(undefined);
        Sign.getInstance().publishSignOut(((Sign.getInstance().getSigned() === undefined)||(Sign.getInstance().getSigned() === null)));
        console.log('signOut');
    }
}