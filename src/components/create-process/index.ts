import { carName, carModel } from '../../data/cars';
import { randomizeColor } from '../../utils/randomizeColor';
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

    selectedId: number;

    constructor() {
        this.carName = carName;

        this.carModel = carModel;

        this.mainPage = new MainPage();

        this.garageClient = new GarageClient();

        this.winnerClient = new WinnersClient();

        this.track = new Track();

        this.selectedId = 0;
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
        await this.garageClient.deleteCar(id);
        await this.winnerClient.deleteWinner(id);

        this.track.createRace();
    }

    getSelectedCarId(id: number) {
        this.selectedId = id;
        return this.selectedId;
    }

    async updateCar() {
        const nameInput = document.querySelector('.update-name') as HTMLInputElement;
        const colorInput = document.querySelector('.update-color') as HTMLInputElement;
        const newCar = {
            name: nameInput.value,
            color: colorInput.value,
        };
        await this.garageClient.updateCar(this.selectedId, newCar);

        this.track.createRace();
    }

    async generateCarBatch() {
        const batchLimit = 100;
        for (let i = 0; i < batchLimit; i++) {
            const name: string = this.carName[Math.floor(Math.random() * (this.carName.length - 0)) + 0];
            const model: string = this.carModel[Math.floor(Math.random() * (this.carModel.length - 0)) + 0];
            const newCarName = `${name} ${model}`;
            const color = `#${randomizeColor()}`;
            const newCar = {
                name: newCarName,
                color: color,
            };

            await this.garageClient.createCar(newCar);
        }
        this.track.createRace();
    }
}
