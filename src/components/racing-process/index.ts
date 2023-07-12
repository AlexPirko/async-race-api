import { EngineClient } from '../client/engine-client';
import getID from '../../utils/getID';

export default class Racing {
    private engine: EngineClient;

    animationId: number;

    constructor() {
        this.engine = new EngineClient();

        this.animationId = 0;
    }

    addRaceListeners() {
        const track = document.querySelector('.track') as HTMLElement;
        track.addEventListener('click', (e) => {
            const target: HTMLElement = e.target as HTMLElement;
            const ID = getID(target);
            if (!ID) return;

            if (target.classList.contains('start-btn')) {
                target.nextElementSibling?.removeAttribute('disabled');
                this.startCarMove(ID);
                target.setAttribute('disabled', 'true');
            }

            if (target.classList.contains('stop-btn')) {
                target.setAttribute('disabled', 'false');
                this.stopCar(ID);
            }
        });

        const raceBtn = document.querySelector('.race-btn') as HTMLElement;
        raceBtn.addEventListener('click', () => {
            this.startRace();
        });
    }

    async stopCar(id: number) {
        const car = document.querySelector(`[data-car-id="${id}"]`) as HTMLElement;

        window.cancelAnimationFrame(this.animationId);
        car.style.transform = 'translateX(0px)';
        await this.engine.stopCarEngine(id);
    }

    async startCarMove(id: number) {
        let start = 0;
        const value: string[] = Object.values(await this.engine.startCarEngine(id));
        const time: number = +(+value[1] / +value[0]).toFixed(2);
        const response = await this.engine.driveCarEngine(id);

        const carMove = (): void => {
            const car = document.querySelector(`[data-car-id="${id}"]`) as HTMLElement;
            const finish = document.querySelector('.finish') as HTMLElement;
            const finishImgWidthErr = 10;
            const path = finish.offsetLeft + finishImgWidthErr - car.offsetLeft;

            start += time / path;
            car.style.transform = `translateX(${start}px)`;

            if (start <= path) {
                this.animationId = requestAnimationFrame(carMove);
            }
        };
        console.log(response);

        window.requestAnimationFrame(carMove);

        if (response?.success === false) {
            await this.engine.stopCarEngine(id);
            window.cancelAnimationFrame(this.animationId);
        } else {
            const ratioFromMsecToSec = 1000;
            const winTime = (time / ratioFromMsecToSec).toFixed(2);
            console.log(winTime);
        }
    }

    async startRace() {
        const cars = document.querySelectorAll('.car');
        await Promise.any([...cars].map(async (car) => this.startCarMove(+car.id)));
    }
}
