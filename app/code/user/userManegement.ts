import { AppObject, Component, ComponentDataInput, ComponentOption, ComponentDivisor, Socket, ComponentPageBody, ComponentView, ComponentMenuVertical, ComponentHeader, ComponentComboBox } from 'backappjh';
import { User } from './user';
import { Authentication } from './authentication';
import { Address } from './address';
import { Phone } from './phone';
import { Permission } from './permission';

export class UserManegement extends AppObject {
    private socketIo;
    private static instance: UserManegement;
    private subscribers: Array<any>;
    private logged: User;
    private tempRegister: Authentication;
    private menu: any;

    constructor(father?: Component) {
        super(father);
        this.init();
    }

    public static getInstance(father?: Component): UserManegement {
        if (!UserManegement.instance) {
            UserManegement.instance = new UserManegement(father);
        }
        return UserManegement.instance;
    }

    private init() {
        let _self = this;
        _self.subscribers = new Array<any>();
        _self.socketIo = Socket.getInstance();
        _self.subscribe((data) => { _self.log(data); });
        _self.socketIo.emit('subscribeUserManegement', {});
        _self.socketIo.on('userManegement', (data) => { _self.publish(data); });

    }

    public subscribe(callback) {
        //we could check to see if it is already subscribed
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


    public createUser(component) {
        // console.log('createUser!!!');
        let basicInfoDivisor: ComponentDivisor = (<ComponentPageBody>component.getFather().getFather().getFather().getFather().getFather()).arrayDivisor[2].arrayDivisor[0];
        let name: string = (<HTMLInputElement>basicInfoDivisor.arrayDivisor[0].arrayDivisor[0].arrayDataInput[0].arrayTextField[0].getElement()).value;
        let nickname: string = (<HTMLInputElement>basicInfoDivisor.arrayDivisor[1].arrayDivisor[0].arrayDataInput[0].arrayTextField[0].getElement()).value;
        let mother: string = (<HTMLInputElement>basicInfoDivisor.arrayDivisor[2].arrayDivisor[0].arrayDataInput[0].arrayTextField[0].getElement()).value;
        let father: string = (<HTMLInputElement>basicInfoDivisor.arrayDivisor[3].arrayDivisor[0].arrayDataInput[0].arrayTextField[0].getElement()).value;
        let nUId: string = (<HTMLInputElement>basicInfoDivisor.arrayDivisor[4].arrayDivisor[0].arrayDataInput[0].arrayTextField[0].getElement()).value;
        let uId: string = (<HTMLInputElement>basicInfoDivisor.arrayDivisor[5].arrayDivisor[0].arrayDivisor[0].arrayDataInput[0].arrayTextField[0].getElement()).value;
        let uIdEmitter: string = (<HTMLInputElement>basicInfoDivisor.arrayDivisor[5].arrayDivisor[0].arrayDivisor[1].arrayDataInput[0].arrayTextField[0].getElement()).value;
        let uIdState: number = (<HTMLSelectElement>basicInfoDivisor.arrayDivisor[5].arrayDivisor[0].arrayDivisor[2].arrayDataInput[0].arrayComboBox[0].getElement()).selectedIndex;
        let birth: string = (<HTMLInputElement>basicInfoDivisor.arrayDivisor[6].arrayDivisor[0].arrayDivisor[0].arrayDataInput[0].arrayTextField[0].getElement()).value;
        let birthState: number = (<HTMLSelectElement>basicInfoDivisor.arrayDivisor[6].arrayDivisor[0].arrayDivisor[1].arrayDataInput[0].arrayComboBox[0].getElement()).selectedIndex;
        let nationality: string = (<HTMLInputElement>basicInfoDivisor.arrayDivisor[7].arrayDivisor[0].arrayDataInput[0].arrayTextField[0].getElement()).value;
        let role: string = (<HTMLInputElement>basicInfoDivisor.arrayDivisor[8].arrayDivisor[0].arrayDataInput[0].arrayTextField[0].getElement()).value;
        // console.log(name, nickname, mother, father, nUId, uId, birth, nationality, role, uIdEmitter, uIdState, birthState);

        let addressInfoDivisor: ComponentDivisor = (<ComponentPageBody>component.getFather().getFather().getFather().getFather().getFather()).arrayDivisor[3].arrayDivisor[0];
        let type: number = (<HTMLSelectElement>addressInfoDivisor.arrayDivisor[0].arrayDivisor[0].arrayDataInput[0].arrayComboBox[0].getElement()).selectedIndex;
        let typeStreet: number = (<HTMLSelectElement>addressInfoDivisor.arrayDivisor[1].arrayDivisor[0].arrayDataInput[0].arrayComboBox[0].getElement()).selectedIndex;
        let address: string = (<HTMLInputElement>addressInfoDivisor.arrayDivisor[2].arrayDivisor[0].arrayDivisor[0].arrayDataInput[0].arrayTextField[0].getElement()).value;
        let number: string = (<HTMLInputElement>addressInfoDivisor.arrayDivisor[2].arrayDivisor[0].arrayDivisor[1].arrayDataInput[0].arrayTextField[0].getElement()).value;
        let complement: string = (<HTMLInputElement>addressInfoDivisor.arrayDivisor[3].arrayDivisor[0].arrayDataInput[0].arrayTextField[0].getElement()).value;
        let district: string = (<HTMLInputElement>addressInfoDivisor.arrayDivisor[4].arrayDivisor[0].arrayDivisor[0].arrayDataInput[0].arrayTextField[0].getElement()).value;
        let city: string = (<HTMLInputElement>addressInfoDivisor.arrayDivisor[4].arrayDivisor[0].arrayDivisor[1].arrayDataInput[0].arrayTextField[0].getElement()).value;
        let state: number = (<HTMLSelectElement>addressInfoDivisor.arrayDivisor[4].arrayDivisor[0].arrayDivisor[2].arrayDataInput[0].arrayComboBox[0].getElement()).selectedIndex;
        let zip: string = (<HTMLInputElement>addressInfoDivisor.arrayDivisor[5].arrayDivisor[0].arrayDataInput[0].arrayTextField[0].getElement()).value;
        // console.log(type, typeStreet, address, number, complement, district, city, state, zip);

        let phoneInfoDivisor: ComponentDivisor = (<ComponentPageBody>component.getFather().getFather().getFather().getFather().getFather()).arrayDivisor[4].arrayDivisor[0];
        let phoneType: number = (<HTMLSelectElement>phoneInfoDivisor.arrayDivisor[0].arrayDivisor[0].arrayDivisor[0].arrayDataInput[0].arrayComboBox[0].getElement()).selectedIndex;
        let phoneNumber: string = (<HTMLInputElement>phoneInfoDivisor.arrayDivisor[0].arrayDivisor[0].arrayDivisor[1].arrayDataInput[0].arrayTextField[0].getElement()).value;
        let email: string = (<HTMLInputElement>phoneInfoDivisor.arrayDivisor[0].arrayDivisor[1].arrayDivisor[0].arrayDataInput[0].arrayTextField[0].getElement()).value;
        // console.log(phoneType, phoneNumber, email);

        let authInfoDivisor: ComponentDivisor = (<ComponentPageBody>component.getFather().getFather().getFather().getFather().getFather()).arrayDivisor[5].arrayDivisor[0];
        let username: string = (<HTMLInputElement>authInfoDivisor.arrayDivisor[0].arrayDivisor[0].arrayDataInput[0].arrayTextField[0].getElement()).value;
        let password: string = (<HTMLInputElement>authInfoDivisor.arrayDivisor[1].arrayDivisor[0].arrayDataInput[0].arrayTextField[0].getElement()).value;
        let cpassword: string = (<HTMLInputElement>authInfoDivisor.arrayDivisor[2].arrayDivisor[0].arrayDataInput[0].arrayTextField[0].getElement()).value;
        let permission: number = (<HTMLSelectElement>authInfoDivisor.arrayDivisor[3].arrayDivisor[0].arrayDataInput[0].arrayComboBox[0].getElement()).selectedIndex;
        // console.log(username, password, cpassword, permission);

        let auth = new Authentication(username, password, permission);

        let user = new User(name, nickname, mother, father, parseInt(uId, 10), uIdEmitter, uIdState, parseInt(nUId, 10), new Date(birth), birthState, nationality, email, role, auth);
        user.arrayAddress.push(new Address(type, typeStreet, address, number, complement, district, city, state, zip));
        user.arrayPhone.push(new Phone(phoneType, parseInt(phoneNumber, 10)));
        // console.log(user);
        this.socketIo.emit("newUser", user);
    }

    public clearUserInputs(component) {

    }

    public login(component) {
        this.tempRegister = undefined;
        let divisor: ComponentDivisor = (<ComponentPageBody>component.getFather().getFather().getFather().getFather()).arrayDivisor[0];
        let username: string = (<HTMLInputElement>divisor.arrayDivisor[1].arrayDataInput[0].arrayTextField[0].getElement()).value;
        let password: string = (<HTMLInputElement>divisor.arrayDivisor[2].arrayDataInput[0].arrayTextField[0].getElement()).value;
        this.socketIo.emit("login", { username: username, password: password });
    }

    public register(component) {
        let divisor: ComponentDivisor = (<ComponentPageBody>component.getFather().getFather().getFather().getFather()).arrayDivisor[0];
        let username: string = (<HTMLInputElement>divisor.arrayDivisor[1].arrayDataInput[0].arrayTextField[0].getElement()).value;
        let password: string = (<HTMLInputElement>divisor.arrayDivisor[2].arrayDataInput[0].arrayTextField[0].getElement()).value;
        this.tempRegister = new Authentication(username, password);
        this.goTo("createUser");
    }

    private goTo(page: string) {
        let header;
        let pageBody;
        if (this !== undefined) {
            header = this.getHeader();
            pageBody = this.getPageBody();
        } else {
            header = UserManegement.getInstance().getHeader();
            pageBody = UserManegement.getInstance().getPageBody();
        }
        if (pageBody !== undefined) {
            pageBody.goToPage(page);
        } else {
            pageBody = (<ComponentView>header.getFather()).pageBody;
            pageBody.goToPage(page);
        }
    }

    private refreshHeader() {
        let header: ComponentHeader;
        let pageBody;
        if (this !== undefined) {
            header = this.getHeader();
            pageBody = this.getPageBody();
        } else {
            header = UserManegement.getInstance().getHeader();
            pageBody = UserManegement.getInstance().getPageBody();
        }
        if (header !== undefined) {
            header.getFather();
        } else {
            header = pageBody.getFather().header;
        }

        header.arrayMenuHorizontal[0].arrayRightHolder[0].arrayDivisor[0].arrayItem[0].arrayMenuVertical = new Array<ComponentMenuVertical>();

        if (this !== undefined) {
            header.arrayMenuHorizontal[0].arrayRightHolder[0].arrayDivisor[0].arrayItem[0].arrayMenuVertical.push(this.menu);
            this.menu.insert(header.arrayMenuHorizontal[0].arrayRightHolder[0].arrayDivisor[0].arrayItem[0].getElement());
        } else {
            header.arrayMenuHorizontal[0].arrayRightHolder[0].arrayDivisor[0].arrayItem[0].arrayMenuVertical.push(UserManegement.getInstance().menu);
            UserManegement.getInstance().menu.insert(header.arrayMenuHorizontal[0].arrayRightHolder[0].arrayDivisor[0].arrayItem[0].getElement());
        }
    }

    public getUsername(component) {
        let _self;
        if (this !== undefined) {
            _self = this;
        } else {
            _self = UserManegement.getInstance();
        }

        if (_self.tempRegister !== undefined) {
            console.log(component);
            (<HTMLInputElement>component.getElement()).value = _self.tempRegister.username;
        }
    }

    public getPassword(component) {
        let _self;
        if (this !== undefined) {
            _self = this;
        } else {
            _self = UserManegement.getInstance();
        }

        if (_self.tempRegister !== undefined) {
            console.log(component);
            (<HTMLInputElement>component.getElement()).value = _self.tempRegister.password;
        }
    }

    public getPermission(component) {
        let _self;
        if (this !== undefined) {
            _self = this;
        } else {
            _self = UserManegement.getInstance();
        }

        // console.log(_self.logged);

        let arrayOption = (<ComponentComboBox>component).arrayOption;
        arrayOption = new Array<ComponentOption>();

        if (_self.logged !== undefined) {
            while (arrayOption.length < _self.logged.authentication.permission + 1) {
                let option = new ComponentOption(component);
                option.information = Permission[arrayOption.length];
                option.renderAfterUpdateJSON();
                arrayOption.push(option);
            }
        } else {
            let option = new ComponentOption(component);
            option.information = Permission[arrayOption.length];
            option.renderAfterUpdateJSON();
            arrayOption.push(option);
        }
    }

    public getInfo(user: User) {
        let menuDivisor = this.getHeader().arrayMenuHorizontal[0].arrayRightHolder[0].arrayDivisor[0].arrayItem[0].arrayMenuVertical[0].arrayDivisor[0];

        let username = menuDivisor.arrayDivisor[0].arrayDivisor[1].arrayDivisor[0].arrayItem[0].colorEffect.font.animationEffect.animationSubEffect.arrayAnimationSubEffectHolder[0];
        let information = username.information;
        information.getElement().innerHTML = user.authentication.username;

        let group = menuDivisor.arrayDivisor[0].arrayDivisor[2].arrayDivisor[0].arrayItem[0].colorEffect.font.animationEffect.animationSubEffect.arrayAnimationSubEffectHolder[0];
        information = group.information;
        let auth: Permission = user.authentication.permission;
        information.getElement().innerHTML = Permission[auth];
        information.information = Permission[auth];
        information.renderAfterUpdateJSON();
    }

    public log(data) {
        if (data.login != undefined) {
            // console.log(this);
            // console.log(UserManegement.getInstance());
            if (!data.login) {
                alert(data.login);
            } else {
                if (this !== undefined) {
                    this.goTo("home");
                    this.refreshHeader();
                    this.getInfo(data.user);
                } else {
                    UserManegement.getInstance().goTo("home");
                    UserManegement.getInstance().refreshHeader();
                    UserManegement.getInstance().getInfo(data.user);
                }
            }
            if (this !== undefined) {
                this.logged = data.user;
            } else {
                UserManegement.getInstance().logged = data.user;
            }

        }
    }

    public isLogged(component?) {
        if (component !== undefined) {
            if (this !== undefined) {
                this.menu = component;
            } else {
                UserManegement.getInstance().menu = component;
            }
        }
        return (UserManegement.getInstance().logged !== undefined);
    }

    public goToLogin() {
        if (this !== undefined) {
            if (!this.isLogged()) {
                this.goTo("login");
            }
        } else {
            if (!UserManegement.getInstance().isLogged()) {
                UserManegement.getInstance().goTo("login");
            }
        }
    }

    public logout(component?) {
        this.socketIo.emit("logoff", {});
        if (this !== undefined) {
            this.logged = undefined;
            this.goTo("login");
            this.refreshHeader();
        } else {
            UserManegement.getInstance().logged = undefined;
            UserManegement.getInstance().goTo("login");
            UserManegement.getInstance().refreshHeader();
        }
        if (component !== undefined) {
            if (this !== undefined) {
                this.menu = component.getFather().getFather();
                this.menu.destroyElement();
            } else {
                UserManegement.getInstance().menu = component.getFather().getFather();
                UserManegement.getInstance().menu.destroyElement();
            }
        }
    }
}