import './index.css';
import addElement from '../../utils/add-elements';

export default class Garage {
    garage: HTMLElement;

    constructor() {
        this.garage = addElement('div', ['garage']);
    }

    createGarageBlock(): void {
        const html = `
            <div class="secondary-block">
                <div class="create-block">
                    <input type="text" class="model-name">
                    <input type="color" class="new-color">
                    <button class="create-btn">Create</button>
                </div>
                <div class="update-block">
                    <input type="text" class="update-name">
                    <input type="color" class="update-color">
                    <button class="update-btn">Update</button>
                </div>
                <div class="control-btn">
                    <button class="race-btn">Race</button>
                    <button class="reset-btn">Reset</button>
                    <button class="generate-btn">Generate Car</button>
                </div>
            </div>
        <div class="primary-block">
            <div class="info-block">
                <h1 class="title">Garage<span class="cars-amount">0</span></h1>
                <h3 class="num-title">Page #<span class="num-page">0</span></h3>
            </div>
            <div class="race-block">                
            </div>
        </div>
        `;

        this.garage.innerHTML = html;
    }

    render(): HTMLElement {
        this.createGarageBlock();
        return this.garage;
    }
}
