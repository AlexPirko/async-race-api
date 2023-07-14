import { GarageClient } from '../components/client/garage-client';
import { WinnersClient } from '../components/client/winners-client';
import { IState } from '../types';

const garageClient = new GarageClient();
const winnersClient = new WinnersClient();

const initialId = 1;
const { cars, count } = await garageClient.getCars(initialId);
const { winners, winCount } = await winnersClient.getWinners(initialId);

export const currentState: IState = {
    page: 1,
    winnersPage: 1,
    cars: cars,
    carCount: count,
    animationId: 0,
    winners: winners,
    winCount: winCount,
    currentWinner: {
        id: null,
        wins: 0,
        time: 0,
    },
};
console.log(currentState);
