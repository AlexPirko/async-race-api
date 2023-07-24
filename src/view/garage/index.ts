import './index.css';
import addElement from '../../utils/add-elements';
import { initState } from '../../utils/add-initial-states';
import Track from '../track';

export default class GaragePage {
    garage: HTMLElement;

    track: Track;

    page: number;

    count: string | null;

    constructor() {
        this.garage = addElement('div', ['garage']);
        this.track = new Track();
        this.page = initState.page;
        this.count = initState.carCount;
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
