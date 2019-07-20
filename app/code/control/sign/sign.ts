import { AppObject, Component, /*, ComponentNotification*/ } from 'backappjh';
import { BasicSocket, UniqueSocket } from 'basicsocket';
import { User } from '../user/user';
import { Util } from '../../view/util/util';
import { Journaly } from 'journaly';

export class Sign extends AppObject {
    private static instance: Sign;
    private journaly: Journaly; //TO JOURNAL
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
        _self.journaly = new Journaly(true);
        UniqueSocket.getInstance().subscribe('sign', (data) => { _self.publish({ sign: data }); });
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
        this.journaly.subscribe('sign', callback);
        console.log(callback.name, 'has been subscribed to Sign');
    }

    public unsubscribeSign(callback) {
        this.journaly.unsubscribe('sign', callback);
    }

    public publishSign(data) {
        this.journaly.publish("sign", data);
        this.journaly.publish("signOut", !data);
    }

    public subscribeSignOut(callback) {
        // we could check to see if it is already subscribed
        this.journaly.subscribe('signOut', callback);
        console.log(callback.name, 'has been subscribed to Sign');
    }

    public unsubscribeSignOut(callback) {
        this.journaly.unsubscribe('signOut', callback);
    }

    public publishSignOut(data) {
        this.journaly.publish("sign", !data);
        this.journaly.publish("signOut", data);
    }

    public subscribe(callback) {
        // we could check to see if it is already subscribed
        this.journaly.subscribe('regular', callback);
        console.log(callback.name, 'has been subscribed to Sign');
    }

    public unsubscribe(callback) {
        this.journaly.unsubscribe('regular', callback);
    }

    public publish(data) {
        this.journaly.publish('regular', data);
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
        console.log('log');
        console.log(log);
        UniqueSocket.getInstance().emit('signIn', log);
    }

    public signUp(log) {
        Util.getInstance().notificationNone();
        UniqueSocket.getInstance().emit('signUp', log);
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