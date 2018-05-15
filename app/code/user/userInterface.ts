import { ServiceModel, AppObject, Component, ComponentDataInput, ComponentOption, ComponentComboBox } from 'backappjh';

export class UserInterface extends AppObject {
    private static languages: Array<any>;

    public static getLanguages() {
        return this.languages;
    }

    constructor(father?: Component) {
        super(father);
    }

    public run() {
        let _self = this;
    }

    public rating(component: Component) {
        let currentComponent = component.getFather();
        let currentFatherComponent = currentComponent.getFather();
        let fatherComponent = currentFatherComponent.getFather();
        // console.log(fatherComponent.arrayAppObject.indexOf(currentFatherComponent));
        let found = false;
        for (let index = 0; index < fatherComponent.arrayAppObject.length; index++) {
            let current = fatherComponent.arrayAppObject[index];
            let currentElement = current.arrayAppObject[0].getElement();
            if (found) {
                currentElement.checked = false;
            } else if (current === currentFatherComponent) {
                found = true;
            } else {
                currentElement.checked = true;
            }
        }
        let element = (<HTMLInputElement>currentComponent.getElement());
        // console.log(element.checked);
    }
}
