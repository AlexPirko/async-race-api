import './index.css';
import { Winner, Winners } from '../../types';
import WinnersPage from '../../view/winners';
export default class Racing {
    private engine;
    private winnersClient;
    animationId: number;
    winners: Array<Winners>;
    winner: Winner;
    winPage: WinnersPage;
    constructor();
    stopCar(id: number): Promise<void>;
    startCarMove(id: number): Promise<void>;
    startRace(): Promise<void>;
    addRaceWinner(): Promise<void>;
    showWinner(id: number, time: number): Promise<void>;
}
