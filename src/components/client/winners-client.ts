import { Winner } from '../../types';

export class WinnersClient {
    private baseUrl: string;

    private winners: string;

    constructor() {
        this.baseUrl = 'http://127.0.0.1:3000';

        this.winners = `${this.baseUrl}/winners`;
    }

    async getWinner(id: number) {
        const response = await fetch(`${this.winners}/${id}`);
        const winner = await response.json();
        return winner;
    }

    async getWinners(page = 1, limit = 10, sort?: string, order?: string) {
        const response = fetch(`${this.winners}/?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`);
        const dataWinners = await (await response).json();
        const winCount = (await response).headers.get('X-Total-Count');
        const winnersData = { dataWinners, winCount };
        return winnersData;
    }

    async createWinner(body: Winner): Promise<Response> {
        const response = await fetch(`${this.winners}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        const createdWinner = await response.json();

        return createdWinner;
    }

    async updateWinners(id: number, body: Winner): Promise<Response> {
        const response = await fetch(`${this.winners}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        const updatedWinners = await response.json();

        return updatedWinners;
    }

    async deleteWinner(id: number) {
        const response = await fetch(`${this.winners}/${id}`, {
            method: 'DELETE',
        });
        const deletedWinner = await response.json();

        return deletedWinner;
    }
}
