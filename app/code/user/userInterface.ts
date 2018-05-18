import { ServiceModel, AppObject, Component, ComponentDataInput, ComponentOption, ComponentComboBox } from 'backappjh';

export class UserInterface extends AppObject {
    private arrayAttenuatingOrAggravating: Array<any>;
    private arrayCircumstance: Array<any>;

    constructor(father?: Component) {
        super(father);
        this.arrayAttenuatingOrAggravating = new Array();
        this.arrayCircumstance = new Array();
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

    public addCircumstance(component: Component) {
        // console.log(component);
        let fatherComponent = component.getFather().getFather().getFather().getFather().arrayAppObject[1];
        // console.log(fatherComponent);
        let circumstanceElement = fatherComponent.arrayAppObject[0].arrayAppObject[0].getElement();
        let timeElement = fatherComponent.arrayAppObject[1].getElement();
        let variable = circumstanceElement.value;//alias
        let time = timeElement.selectedIndex;
        let circumstance = {
            variable: variable,
            time: time
        }
        // console.log(circumstance);
        //next
    }

    public addAttenuatingOrAggravating(component: Component) {
        // console.log(component);
        let fatherComponent = component.getFather().getFather().getFather().arrayAppObject[1];
        // console.log(fatherComponent);
        let circumstanceElement = fatherComponent.arrayAppObject[0].arrayAppObject[0].getElement();
        let intensityElement = fatherComponent.arrayAppObject[2].arrayAppObject[0].getElement();
        let typeElement = fatherComponent.arrayAppObject[1].getElement();
        let timeElement = fatherComponent.arrayAppObject[3].getElement();
        let variable = circumstanceElement.value;//alias
        let intensity = intensityElement.value;//alias
        let time = timeElement.selectedIndex;
        let type = typeElement.selectedIndex;
        let circumstance = {
            variable: variable,
            intensity: intensity,
            type: type,
            time: time
        }
        this.arrayAttenuatingOrAggravating.push(circumstance);
        // console.log(this.arrayAttenuatingOrAggravating);
        this.updateAttenuatingOrAggravating(component);
    }

    private updateAttenuatingOrAggravating(component: Component){
        console.log(component);
        let fatherComponent = component.getFather().getFather().getFather().arrayAppObject[0].arrayAppObject[0];
        console.log(fatherComponent);
        let lineComponent = fatherComponent.arrayAppObject[0];
        let cell0Component = lineComponent.arrayAppObject[0];
        let cell1Component = lineComponent.arrayAppObject[1];
        let cell2Component = lineComponent.arrayAppObject[2];
        console.log(lineComponent);
        let newLineComponent = new Component('tr', fatherComponent);
        newLineComponent.getElement().style.color = lineComponent.getElement().style.color;
        newLineComponent.getElement().style.border = lineComponent.getElement().style.border;
        newLineComponent.getElement().style.opacity = lineComponent.getElement().style.opacity;
        newLineComponent.getElement().style.height = lineComponent.getElement().style.height;
        newLineComponent.getElement().style.width = lineComponent.getElement().style.width;
        newLineComponent.getElement().style.boxSizing = lineComponent.getElement().style.boxSizing;

        let newCell0Component = new Component('th', newLineComponent);
        newCell0Component.getElement().style.color = cell0Component.getElement().style.color;
        newCell0Component.getElement().style.opacity = cell0Component.getElement().style.opacity;
        newCell0Component.getElement().style.padding = cell0Component.getElement().style.padding;
        newCell0Component.getElement().style.cssFloat = cell0Component.getElement().style.cssFloat;
        newCell0Component.getElement().style.boxSizing = cell0Component.getElement().style.boxSizing;
        let componentInformation = new Component('a', newCell0Component);

        let newCell1Component = new Component('th', newLineComponent);
        newCell1Component.getElement().style.color = cell1Component.getElement().style.color;
        newCell1Component.getElement().style.opacity = cell1Component.getElement().style.opacity;
        newCell1Component.getElement().style.padding = cell1Component.getElement().style.padding;
        newCell1Component.getElement().style.cssFloat = cell1Component.getElement().style.cssFloat;
        newCell1Component.getElement().style.boxSizing = cell1Component.getElement().style.boxSizing;

        let newCell2Component = new Component('th', newLineComponent);
        newCell2Component.getElement().style.color = cell2Component.getElement().style.color;
        newCell2Component.getElement().style.opacity = cell2Component.getElement().style.opacity;
        newCell2Component.getElement().style.padding = cell2Component.getElement().style.padding;
        newCell2Component.getElement().style.cssFloat = cell2Component.getElement().style.cssFloat;
        newCell2Component.getElement().style.boxSizing = cell2Component.getElement().style.boxSizing;

    }

    public getAttenuatingOrAggravating(component: Component) {
        console.log(this.arrayAttenuatingOrAggravating);
        //next
    }
}
