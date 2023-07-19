import { carName, carModel } from '../../data/cars';
import MainPage from '../../view/main';
import { GarageClient } from '../client/garage-client';
import { WinnersClient } from '../client/winners-client';
import Track from '../../view/track';

export default class Creating {
    carName: string[];

    carModel: string[];

    mainPage: MainPage;

    garageClient: GarageClient;

    winnerClient: WinnersClient;

    track: Track;

    constructor() {
        this.carName = carName;

        this.carModel = carModel;

        this.mainPage = new MainPage();

        this.garageClient = new GarageClient();

        this.winnerClient = new WinnersClient();

        this.track = new Track();
    }

    async addNewCar() {
        const nameInput = document.querySelector('.model-name') as HTMLInputElement;
        const colorInput = document.querySelector('.new-color') as HTMLInputElement;
        const newCar = {
            name: nameInput.value,
            color: colorInput.value,
        };

        await this.garageClient.createCar(newCar);

        this.track.createRace();
    }

    async deleteCar(id: number) {
        console.log(id);
        await this.garageClient.deleteCar(id);
        await this.winnerClient.deleteWinner(id);

        this.track.createRace();
    }
}
