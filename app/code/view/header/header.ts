import { AppObject, Component, ComponentPageBody } from 'backappjh';
import { Sign } from '../../control/sign/sign';
import { Util } from './../util/util';

export class Header extends AppObject {

    constructor(father?: Component) {
        super(father);
        this.init();
    }

    private init() {

    }

    public goToSignIn(){
        Util.getInstance().setCurrentPageBody(this.getPageBody());
        Util.getInstance().goToSignIn();
    }

    public isSigned(){
        console.log('isLogged');
        return Sign.getInstance().isSigned();
    }

    public isSignedOut(){
        console.log('isNotLogged');
        return !Sign.getInstance().isSigned();
    }

    public signOut(){
        Sign.getInstance().signOut();
    }

    public subscribeSign(callback) {
        Sign.getInstance().subscribeSign(callback);
    }

    public unsubscribeSign(callback) {
        Sign.getInstance().unsubscribeSign(callback);
    }

    public publishSign(data) {
        Sign.getInstance().publishSign(data);
    }

    public subscribeSignOut(callback) {
        Sign.getInstance().subscribeSignOut(callback);
    }

    public unsubscribeSignOut(callback) {
        Sign.getInstance().unsubscribeSignOut(callback);
    }

    public publishSignOut(data) {
        Sign.getInstance().publishSignOut(data);
    }
}