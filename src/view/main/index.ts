import './index.css';
import addElement from '../../utils/add-elements';

export default class Main {
    main: HTMLElement;

    mainContent: HTMLElement;

    constructor() {
        this.main = addElement('main', ['main']);
        this.mainContent = addElement('div', ['main-content']);
    }

    createMainContent(): void {
        const pageBtnWrapper = addElement('div', ['page-btn__wrapper']);
        const garageBtn = addElement('button', ['garage-btn']);
        garageBtn.textContent = 'Garage';
        const winnersBtn = addElement('button', ['winners-btn']);
        winnersBtn.textContent = 'Winners';
        pageBtnWrapper.append(garageBtn, winnersBtn);

        const paginationBtnWrapper = addElement('div', ['pagination-btn__wrapper']);
        const prevBtn = addElement('button', ['prev-btn']);
        prevBtn.textContent = 'prev';
        const nextBtn = addElement('button', ['next-btn']);
        nextBtn.textContent = 'next';
        paginationBtnWrapper.append(prevBtn, nextBtn);
        this.main.append(pageBtnWrapper, this.mainContent, paginationBtnWrapper);
    }

    render(): HTMLElement {
        this.createMainContent();
        return this.main;
    }
}
