import { Winner } from '../../types';
export declare class WinnersClient {
    private baseUrl;
    private winners;
    constructor();
    getWinner(id: number): Promise<any>;
    getWinners(page: number, limit: number, sort?: string, order?: string): Promise<{
        dataWinners: any;
        winCount: string | null;
    }>;
    createWinner(body: Winner): Promise<Response>;
    updateWinners(id: number, body: Winner): Promise<Response>;
    deleteWinner(id: number): Promise<any>;
}
