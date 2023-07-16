import './index.css';
import addElement from '../../utils/add-elements';
import { currentState } from '../../utils/initial-states';
import Track from '../track';

export default class GaragePage {
    garage: HTMLElement;

    track: Track;

    page: number;

    count: string | null;

    constructor() {
        this.garage = addElement('div', ['garage']);
        this.track = new Track();
        this.page = currentState.page;
        this.count = currentState.carCount;
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
                    <h1 class="title">Garage<span class="cars-amount">(${this.count})</span></h1>
                    <h3 class="num-title">Page #<span class="num-page">${this.page}</span></h3>
                </div>
            </div>
        `;

        this.garage.innerHTML = html;
    }

    render(): HTMLElement {
        this.createGarageBlock();
        const track = this.track.render();
        this.garage.append(track);
        return this.garage;
    }
}
