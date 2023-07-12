import { EngineClient } from '../client/engine-client';

export default class Racing {
    private engine: EngineClient;

    animationId: number;

    constructor() {
        this.engine = new EngineClient();

        this.animationId = 0;
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
        const startBtn = document.querySelector(`[data-start-id = "${id}"]`) as HTMLElement;
        const stopBtn = document.querySelector(`[data-stop-id = "${id}"]`) as HTMLElement;
        startBtn.setAttribute('disabled', 'true');
        stopBtn.removeAttribute('disabled');

        const carMove = (): void => {
            const car = document.querySelector(`[data-car-id="${id}"]`) as HTMLElement;
            const finish = document.querySelector('.finish') as HTMLElement;
            const finishImgWidthErr = 10;
            const path: number = finish.offsetLeft + finishImgWidthErr - car.offsetLeft;

            start += time / path;
            car.style.transform = `translateX(${start}px)`;

            if (start <= path) {
                this.animationId = requestAnimationFrame(carMove);
            }
        };
        window.requestAnimationFrame(carMove);

        if (response?.success === false) {
            await this.engine.stopCarEngine(id);
            window.cancelAnimationFrame(this.animationId);
        } else {
            const ratioFromMsecToSec = 1000;
            const winTime: string = (time / ratioFromMsecToSec).toFixed(2);
            console.log(winTime);
        }
    }

    async startRace() {
        const cars = document.querySelectorAll('.car') as NodeListOf<Element>;
        await Promise.any([...cars].map(async (car) => this.startCarMove(+car.id)));
    }
}
