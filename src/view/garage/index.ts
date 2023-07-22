import './index.css';
import addElement from '../../utils/add-elements';
import { currentState } from '../../utils/add-initial-states';
import Track from '../track';
import { addNextPagination, addPrevPagination } from '../../utils/add-pagination';

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

    addGaragePaginationListener() {
        const prevBtn = document.querySelector('.prev-btn') as HTMLElement;
        const nextBtn = document.querySelector('.next-btn') as HTMLElement;
        const carsAmount = document.querySelector('.cars-amount') as HTMLElement;
        const paginationBlock = document.querySelector('.pagination-btn__wrapper') as HTMLElement;

        paginationBlock.addEventListener('click', async (e: Event) => {
            const target = e.target as HTMLElement;
            if (target === prevBtn) {
                const prevValue = addPrevPagination(
                    prevBtn as HTMLButtonElement,
                    nextBtn as HTMLButtonElement,
                    this.page
                );

                this.page = prevValue;
            } else if (target === nextBtn) {
                const nextValue = addNextPagination(
                    prevBtn as HTMLButtonElement,
                    nextBtn as HTMLButtonElement,
                    this.page,
                    Number(carsAmount.textContent)
                );

                this.page = nextValue;
                console.log(this.page);
            }
            this.garage.innerHTML = '';
        });

        this.createGarageBlock(this.page);
        this.render();
    }

    createGarageBlock(curPage: number): void {
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
                    <h1 class="title">Garage - <span class="cars-amount">${this.count}</span></h1>
                    <h3 class="num-title">Page #<span class="num-page">${curPage}</span></h3>
                </div>
            </div>
        `;

        this.garage.innerHTML = html;
    }

    render(): HTMLElement {
        this.createGarageBlock(this.page);
        const track = this.track.render();
        this.garage.append(track);
        return this.garage;
    }
}
