import getID from '../../utils/getID';
import Racing from '../racing-process';
import Track from '../../view/track';
import WinnersPage from '../../view/winners';
import Creating from '../create-process';
import { initState } from '../../utils/add-initial-states';
import { updateState } from '../../utils/update-state';
import { addNextPagination, addPrevPagination } from '../../utils/add-pagination';

export default class AddListeners {
    private racing: Racing;

    private winnersPage: WinnersPage;

    private creatingProcess: Creating;

    track: Track;

    constructor() {
        this.racing = new Racing();
        this.track = new Track();
        this.winnersPage = new WinnersPage();
        this.creatingProcess = new Creating();
    }

    init() {
        this.selectPage();
        this.addRaceListeners();
        this.addTrackListeners();
        this.addCreateCarListener();
        this.addUpdateCarListener();
        this.addGenerateCarsListener();
        this.addGaragePaginationListener();
        this.addWinnersPaginationListener();
    }

    selectPage() {
        const pageBtn = document.querySelector('.page-btn__wrapper') as HTMLElement;
        pageBtn.addEventListener('click', (e) => {
            const target: HTMLElement = e.target as HTMLElement;
            const garagePage = document.querySelector('.garage') as HTMLElement;
            const winnersPage = document.querySelector('.winners') as HTMLElement;
            if (target.classList.contains('garage-btn')) {
                garagePage.classList.remove('hide');
                winnersPage.classList.add('hide');
                initState.isGarage = true;
                initState.isWinners = false;
            }
            if (target.classList.contains('winners-btn')) {
                garagePage.classList.add('hide');
                winnersPage.classList.remove('hide');
                initState.isGarage = false;
                initState.isWinners = true;
            }
        });
    }

    addRaceListeners() {
        const controlBtn = document.querySelector('.control-btn') as HTMLElement;
        controlBtn.addEventListener('click', (e) => {
            const target: HTMLElement = e.target as HTMLElement;
            if (target.classList.contains('race-btn')) {
                target.setAttribute('disabled', 'true');
                target.nextElementSibling?.setAttribute('disabled', 'true');
                this.racing.startRace();
            }
        });
    }

    addTrackListeners() {
        const track = document.querySelector('.track') as HTMLElement;
        track.addEventListener('click', (e) => {
            const target: HTMLElement = e.target as HTMLElement;
            const ID: number = getID(target);
            if (!ID) return;

            if (target.classList.contains('start-btn')) {
                target.nextElementSibling?.removeAttribute('disabled');
                this.racing.startCarMove(ID);
                target.setAttribute('disabled', 'true');
            }

            if (target.classList.contains('stop-btn')) {
                target.setAttribute('disabled', '');
                target.previousElementSibling?.removeAttribute('disabled');
                this.racing.stopCar(ID);
            }

            if (target.classList.contains('remove-btn')) {
                this.creatingProcess.deleteCar(ID);
            }

            if (target.classList.contains('select-btn')) {
                const nameInput = document.querySelector('.update-name') as HTMLInputElement;
                nameInput.focus();
                this.creatingProcess.getSelectedCarId(ID);
            }
        });
    }

    addCreateCarListener() {
        const createBtn = document.querySelector('.create-btn') as HTMLElement;
        createBtn.addEventListener('click', () => {
            this.creatingProcess.addNewCar();
        });
    }

    addUpdateCarListener() {
        const updateBtn = document.querySelector('.update-btn') as HTMLButtonElement;
        updateBtn.addEventListener('click', () => {
            this.creatingProcess.updateCar();
        });
    }

    addGenerateCarsListener() {
        const generateBtn = document.querySelector('.generate-btn') as HTMLElement;
        generateBtn.addEventListener('click', () => {
            this.creatingProcess.generateCarBatch();
        });
    }

    async addGaragePaginationListener() {
        const track = document.querySelector('.track') as HTMLElement;
        const prevBtn = document.querySelector('.prev-btn') as HTMLElement;
        const nextBtn = document.querySelector('.next-btn') as HTMLElement;
        const carsAmount = document.querySelector('.cars-amount') as HTMLElement;
        const paginationBlock = document.querySelector('.pagination-btn__wrapper') as HTMLElement;

        paginationBlock.addEventListener('click', async (e: Event) => {
            const target = e.target as HTMLElement;
            if (target === prevBtn && initState.isGarage === true) {
                const prevValue = addPrevPagination(
                    prevBtn as HTMLButtonElement,
                    nextBtn as HTMLButtonElement,
                    initState.page
                );

                initState.page = prevValue;
                await updateState();
                track.innerHTML = this.track.createRace();
            } else if (target === nextBtn && initState.isGarage === true) {
                const nextValue = addNextPagination(
                    prevBtn as HTMLButtonElement,
                    nextBtn as HTMLButtonElement,
                    initState.page,
                    Number(carsAmount.textContent)
                );

                initState.page = nextValue;
                await updateState();
                track.innerHTML = this.track.createRace();
            }
        });
    }

    async addWinnersPaginationListener() {
        const winners = document.querySelector('.winners') as HTMLElement;
        const prevBtn = document.querySelector('.prev-btn') as HTMLElement;
        const nextBtn = document.querySelector('.next-btn') as HTMLElement;
        const winAmount = document.querySelector('.winners-amount') as HTMLElement;
        const paginationBlock = document.querySelector('.pagination-btn__wrapper') as HTMLElement;

        paginationBlock.addEventListener('click', async (e: Event) => {
            const target = e.target as HTMLElement;
            if (target === prevBtn && initState.isWinners === true) {
                const prevValue = addPrevPagination(
                    prevBtn as HTMLButtonElement,
                    nextBtn as HTMLButtonElement,
                    initState.page
                );

                initState.page = prevValue;
                await updateState();
                winners.innerHTML = this.winnersPage.createWinnersBlock();
            } else if (target === nextBtn && initState.isWinners === true) {
                const nextValue = addNextPagination(
                    prevBtn as HTMLButtonElement,
                    nextBtn as HTMLButtonElement,
                    initState.page,
                    Number(winAmount.textContent)
                );

                initState.page = nextValue;
                await updateState();
                winners.innerHTML = this.winnersPage.createWinnersBlock();
            }
        });
    }
}
