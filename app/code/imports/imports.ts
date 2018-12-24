import * as loader from 'backappjh';
import { SVG } from './../view/sVG/sVG';
import { Sign } from '../control/sign/sign';
import { Keyboard } from './../view/keyboard/keyboard';
import { UserInterface } from './../view/user/userInterface';
import { Util } from '../view/util';
// tslint:disable-next-line:no-empty
try { require('./../../style/app.css'); } catch (e) { console.log('ERROR FONT'); };

let w: any = window;
w.FontAwesomeConfig = {
    searchPseudoElements: true
}

export {
    loader,
    Util,
    SVG,
    Keyboard,
    UserInterface,
    Sign
};
