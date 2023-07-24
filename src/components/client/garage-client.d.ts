import { Car } from '../../types';
export declare class GarageClient {
    private baseUrl;
    private garage;
    constructor();
    getCar(id: number): Promise<any>;
    getCars(page?: number, limit?: number): Promise<{
        cars: any;
        count: string | null;
    }>;
    createCar(body: Car): Promise<any>;
    updateCar(id: number, body: Car): Promise<any>;
    deleteCar(id: number): Promise<any>;
}
