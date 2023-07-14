import './index.css';
import addElement from '../../utils/add-elements';
import { currentState } from '../../utils/initial-states';

export default class Winners {
    winners: HTMLElement;

    page: number;

    count: string | null;

    constructor() {
        this.winners = addElement('div', ['winners', 'hide']);
        this.page = currentState.winnersPage;
        this.count = currentState.winCount;
    }

    createWinnersBlock(): void {
        const html = `
        <div class="winners-block">
            <div class="info-block">
                <h1 class="title">Winners<span class="winners-amount">(${this.count})</span></h1>
                <h3 class="num-title">Page #<span class="num-page">${this.page}</span></h3>
            </div>
            <div class="win-table">
                <table class="table">
                <thead>
                    <th>Number</th>
                    <th>Car</th>
                    <th>Name</th>
                    <th class="wins">Wins</th>
                    <th class="time">Best time (sec)</th>
                </thead>
                <tbody>
                </tbody>
            </table>              
            </div>
        </div>
        `;

        this.winners.innerHTML = html;
    }

    render(): HTMLElement {
        this.createWinnersBlock();
        return this.winners;
    }
}
