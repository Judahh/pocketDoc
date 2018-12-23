import * as loader from 'backappjh';
import { SVG } from './../view/sVG/sVG';
import { ControlSign } from '../control/sign/ControlSign';
// import { Languages } from './../languages/languages';
import { Keyboard } from './../view/keyboard/keyboard';
import { UserInterface } from './../view/user/userInterface';

// tslint:disable-next-line:no-empty
try { require('./../../style/app.css'); } catch (e) { console.log('ERROR FONT'); };

let w: any = window;
w.FontAwesomeConfig = {
    searchPseudoElements: true
}

export {
    loader,
    SVG,
    Keyboard,
    UserInterface,
    ControlSign
};
