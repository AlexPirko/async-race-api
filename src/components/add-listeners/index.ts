import getID from '../../utils/getID';
import Racing from '../racing-process';

export default class AddListeners {
    private racing: Racing;

    constructor() {
        this.racing = new Racing();
    }

    init() {
        this.selectPage();
        this.addRaceListeners();
        this.addTrackListeners();
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
            }
            if (target.classList.contains('winners-btn')) {
                garagePage.classList.add('hide');
                winnersPage.classList.remove('hide');
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
            const ID = getID(target);
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
        });
    }
}