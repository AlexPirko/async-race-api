import { GarageClient } from '../components/client/garage-client';
import { WinnersClient } from '../components/client/winners-client';
import { Winners } from '../types';
import { initState } from './add-initial-states';

const garageClient = new GarageClient();
const winnersClient = new WinnersClient();

export async function updateState(): Promise<void> {
    const tableLimit = 10;
    const { cars, count } = await garageClient.getCars(initState.page);
    const winnersData = await winnersClient.getWinners(
        initState.winnersPage,
        tableLimit,
        initState.sortType,
        initState.sortOrder
    );
    const winners = await Promise.all(
        winnersData.dataWinners.map(async (winner: Winners) => ({
            ...winner,
            car: await garageClient.getCar(winner.id as number),
        }))
    );

    initState.cars = cars;
    initState.carCount = count;

    initState.winners = winners;
    initState.winCount = winnersData.winCount;
}
