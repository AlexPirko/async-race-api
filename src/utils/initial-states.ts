import { GarageClient } from '../components/client/garage-client';
import { WinnersClient } from '../components/client/winners-client';
import { Winners, IState } from '../types';

const garageClient = new GarageClient();
const winnersClient = new WinnersClient();

const initialId = 1;
const { cars, count } = await garageClient.getCars(initialId);
const winnersData = await winnersClient.getWinners(initialId);
const winners = await Promise.all(
    winnersData.dataWinners.map(async (winner: Winners) => ({
        ...winner,
        car: await garageClient.getCar(winner.id as number),
    }))
);

export const currentState: IState = {
    page: 1,
    winnersPage: 1,
    cars: cars,
    carCount: count,
    animationId: 0,
    winners: winners,
    winCount: winnersData.winCount,
    currentWinner: {
        id: 1,
        wins: 1,
        time: 10,
    },
};
