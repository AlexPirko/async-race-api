import { Car } from '../../types';

export class GarageClient {
    private baseUrl: string;

    private garage: string;

    constructor() {
        this.baseUrl = 'http://127.0.0.1:3000';

        this.garage = `${this.baseUrl}/garage`;
    }

    async getCar(id: number) {
        const response = await fetch(`${this.garage}/${id}`);
        const car = await response.json();
        return car;
    }

    async getCars(page = 1, limit = 7) {
        const response = fetch(`${this.garage}/?_page=${page}&_limit=${limit}`);
        const cars = await (await response).json();
        const count = (await response).headers.get('X-Total-Count');
        return { cars, count };
    }

    async createCar(body: Car) {
        const response = await fetch(`${this.garage}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        const createdCar = await response.json();

        return createdCar;
    }

    async updateCar(id: number, body: Car) {
        const response = await fetch(`${this.garage}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        const updatedCar = await response.json();

        return updatedCar;
    }

    async deleteCar(id: number) {
        const response = await fetch(`${this.garage}/${id}`, {
            method: 'DELETE',
        });
        const deletedCar = await response.json();

        return deletedCar;
    }
}
