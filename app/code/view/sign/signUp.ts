import { AppObject, Component, ComponentPageBody } from 'backappjh';
import { Permission } from '../../control/user/permission';
import { Sign } from '../../control/sign/sign';
import { Util } from './../util/util';
import { User } from '../../control/user/user';
import { Authentication } from '../../control/user/authentication';

export class SignUp extends AppObject {

    constructor(father?: Component) {
        super(father);
        this.init();
    }

    private init() {
        let _self = this;
    }

    public signUp(component) {
        Util.getInstance().setCurrentPageBody(this.getPageBody());
        // console.log('createUser!!!');
        let divisor: Component = <Component>(<ComponentPageBody>component.getFather().getFather().getFather());
        let arrayField: Array<HTMLInputElement> = new Array<HTMLInputElement>();
        arrayField.push(<HTMLInputElement>(<Component>divisor.arrayAppObject[0].arrayAppObject[0].arrayAppObject[0]).getElement());
        arrayField.push(<HTMLInputElement>(<Component>divisor.arrayAppObject[1].arrayAppObject[0].arrayAppObject[0]).getElement());
        arrayField.push(<HTMLInputElement>(<Component>divisor.arrayAppObject[1].arrayAppObject[1].arrayAppObject[0]).getElement());
        arrayField.push(<HTMLInputElement>(<Component>divisor.arrayAppObject[2].arrayAppObject[0].arrayAppObject[0]).getElement());
        arrayField.push(<HTMLInputElement>(<Component>divisor.arrayAppObject[2].arrayAppObject[1].arrayAppObject[0]).getElement());
        // arrayField.push(<HTMLInputElement>(<Component>divisor.arrayAppObject[3].arrayAppObject[0].arrayAppObject[0]).getElement());
        arrayField.push(<HTMLInputElement>(<Component>divisor.arrayAppObject[3].arrayAppObject[0].arrayAppObject[0]).getElement());
        arrayField.push(<HTMLInputElement>(<Component>divisor.arrayAppObject[3].arrayAppObject[1].arrayAppObject[0]).getElement());
        arrayField.push(<HTMLInputElement>(<Component>divisor.arrayAppObject[3].arrayAppObject[2].arrayAppObject[0]).getElement());
        console.log(arrayField[0].value, arrayField[1].value, arrayField[2].value,
            arrayField[3].value, arrayField[4].value, arrayField[5].value,
            arrayField[6].value, arrayField[7].value);

        if (Util.getInstance().checkEquals(arrayField[6], arrayField[7]) && !Util.getInstance().checkArrayEmpty(arrayField)) {
            Util.getInstance().notificationNone();
            let auth = new Authentication(arrayField[6].value, Permission.User);
            let user = new User(arrayField[5].value, arrayField[0].value, new Date(arrayField[1].value), arrayField[2].value,
                arrayField[3].value, arrayField[4].value, auth);
            console.log(user);
            Sign.getInstance().signUp(user);
        } else {
            Util.getInstance().notificationMissingFields();
        }
    }

    public getPassword(component) {
        console.log('GET');
        console.log(Sign.getInstance().getTempUser());
        if (Sign.getInstance().getTempUser() !== undefined) {
            console.log(component);
            let father: Component = <Component>(component.getFather());
            (<HTMLInputElement>father.getElement()).value = Sign.getInstance().getTempUser().authentication.password;
        }
    }

    public getEmail(component) {
        console.log('GET');
        console.log(Sign.getInstance().getTempUser());
        if (Sign.getInstance().getTempUser() !== undefined) {
            console.log(component);
            let father: Component = <Component>(component.getFather());
            (<HTMLInputElement>father.getElement()).value = Sign.getInstance().getTempUser().email;
        }
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
}