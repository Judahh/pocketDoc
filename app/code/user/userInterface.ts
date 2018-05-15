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

    public getTrust(component: Component) {
        let fatherComponent = component.getFather().getFather().getFather().arrayAppObject[1].arrayAppObject[0];
        console.log(fatherComponent.arrayAppObject);
        let number = 0;
        for (let index = 0; index < fatherComponent.arrayAppObject.length; index++) {
            let element = fatherComponent.arrayAppObject[index].arrayAppObject[0].getElement();
            if (element.checked) {
                number++;
            }
        }
        number = number * 20;
        //next
    }

    public getDisease(component: Component) {
        let textComponent = component.getFather().getFather().arrayAppObject[0].arrayAppObject[0];
        let textElement = textComponent.getElement();
        // console.log(textElement.value);
        let symptom = textElement.value;//alias
        //next
    }

    public getPlace(component: Component) {
        console.log(component);
        let fatherComponent = component.getFather().getFather().getFather();
        let areaElement = fatherComponent.arrayAppObject[0].arrayAppObject[0].arrayAppObject[0].getElement();
        let referredElement = fatherComponent.arrayAppObject[1].arrayAppObject[0].arrayAppObject[0].getElement();
        let depthElement = fatherComponent.arrayAppObject[2].arrayAppObject[0].arrayAppObject[0].getElement();
        let area = areaElement.value;
        let referred = referredElement.value;
        let depth = depthElement.value;

        let place = {
            area: area,
            referred: referred,
            depth: depth
        }
        //next
    }

    public getQuantity(component: Component) {
        console.log(component);
        let fatherComponent = component.getFather().getFather().getFather();
        let intesityElement = fatherComponent.arrayAppObject[0].arrayAppObject[0].arrayAppObject[0].getElement();
        let frequencyElement = fatherComponent.arrayAppObject[1].arrayAppObject[0].arrayAppObject[0].getElement();
        let numberElement = fatherComponent.arrayAppObject[2].arrayAppObject[0].arrayAppObject[0].getElement();
        let intervalElement = fatherComponent.arrayAppObject[3].arrayAppObject[0].arrayAppObject[0].getElement();
        let intesity = intesityElement.value;
        let frequency = frequencyElement.value;
        let number = numberElement.value;
        let interval = intervalElement.value;

        let quantity = {
            intesity: intesity,
            frequency: frequency,
            number: number,
            interval: interval
        }
        console.log(quantity);
        //next
    }

    public getTime(component: Component) {
        console.log(component);
        let fatherComponent = component.getFather().getFather().getFather();
        let startElement = fatherComponent.arrayAppObject[0].arrayAppObject[0].arrayAppObject[0].getElement();
        let endElement = fatherComponent.arrayAppObject[1].arrayAppObject[0].arrayAppObject[0].getElement();
        let start:Date = new Date(startElement.value);
        let end:Date = new Date(endElement.value);

        let time = {
            start: start,
            end: end
        }
        console.log(time);
        //next
    }

    public getType(component: Component) {
        console.log(component);
        let fatherComponent = component.getFather().getFather().getFather();
        let typeElement = fatherComponent.arrayAppObject[0].arrayAppObject[0].arrayAppObject[0].getElement();
        let type = typeElement.value;//alias
        console.log(type);
        //next
    }
}
