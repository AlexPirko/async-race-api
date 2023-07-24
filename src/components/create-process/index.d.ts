import MainPage from '../../view/main';
import { GarageClient } from '../client/garage-client';
import { WinnersClient } from '../client/winners-client';
import GaragePage from '../../view/garage';
import Track from '../../view/track';
export default class Creating {
    carName: string[];
    carModel: string[];
    mainPage: MainPage;
    garageClient: GarageClient;
    winnerClient: WinnersClient;
    track: Track;
    selectedId: number;
    garagePage: GaragePage;
    constructor();
    addNewCar(): Promise<void>;
    deleteCar(id: number): Promise<void>;
    getSelectedCarId(id: number): number;
    updateCar(): Promise<void>;
    generateCarBatch(): Promise<void>;
}
