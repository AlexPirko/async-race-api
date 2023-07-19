import './index.css';
import { Winner, Winners } from '../../types';
import { currentState } from '../../utils/add-initial-states';
import { EngineClient } from '../client/engine-client';
import { WinnersClient } from '../client/winners-client';
import WinnersPage from '../../view/winners';

export default class Racing {
    private engine: EngineClient;

    private winnersClient: WinnersClient;

    animationId: number;

    winners: Array<Winners>;

    winner: Winner;

    winPage: WinnersPage;

    constructor() {
        this.engine = new EngineClient();

        this.winnersClient = new WinnersClient();

        this.animationId = currentState.animationId;

        this.winners = currentState.winners;

        this.winner = currentState.initialWinner;

        this.winPage = new WinnersPage();
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
        const time: number = Math.round(+value[1] / +value[0]);
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
            if (this.winner.id === null) {
                const ratioFromMsecToSec = 1000;
                const winTime: number = +(time / ratioFromMsecToSec).toFixed(2);
                this.winner = {
                    id: response?.id as number,
                    wins: 1,
                    time: winTime,
                };
                await this.addRaceWinner();
            }
        }
    }

    async startRace() {
        const cars = document.querySelectorAll('.car') as NodeListOf<Element>;
        await Promise.any(
            [...cars].map(async (car) => {
                this.startCarMove(+car.id);
            })
        );
    }

    async addRaceWinner(): Promise<void> {
        this.winners.map(async (winner) => {
            if (winner.id === this.winner.id) {
                await this.winnersClient.updateWinners(winner.id as number, {
                    id: this.winner.id,
                    wins: winner.wins + 1,
                    time: this.winner.time < winner.time ? this.winner.time : winner.time,
                });
            } else await this.winnersClient.createWinner(this.winner);
            setTimeout(() => {
                this.showWinner(winner.id, winner.time);
            }, 4000);
        });
    }

    showWinner(id: number, time: number) {
        const car = document.querySelector(`[data-car-id="${id}"]`) as HTMLElement;
        const name = car.dataset.carName;
        console.log(name);

        const popup = document.createElement('div');
        popup.classList.add('popup');
        popup.innerHTML = `${name} win with time <span>${time}</span>!`;

        document.body.append(popup);
        setInterval(() => popup.remove(), 3000);
    }
}
