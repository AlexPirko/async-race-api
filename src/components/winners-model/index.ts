import { WinnersClient } from '../client/winners-client';

export default class WinnersModel {
    addWinner() {
        throw new Error('Method not implemented.');
    }

    private winners: WinnersClient;

    constructor() {
        this.winners = new WinnersClient();
    }
}
