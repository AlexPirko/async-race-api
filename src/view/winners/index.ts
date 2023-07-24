import './index.css';
import addElement from '../../utils/add-elements';
import createCarImage from '../../utils/create-car-image';
import { initState } from '../../utils/add-initial-states';

export default class WinnersPage {
    winnersView: HTMLElement;

    constructor() {
        this.winnersView = addElement('div', ['winners', 'hide']);
    }

    createTableBlock(): string {
        return initState.winners
            .map((winner, item) => {
                return `<tr>
                    <th>${item + 1}</th>
                    <th>${createCarImage(winner.car.color)}</th>
                    <th>${winner.car.name}</th>
                    <th>${winner.wins}</th>
                    <th>${winner.time}</th>
                </tr>
            `;
            })
            .join('');
    }

    createWinnersBlock(): string {
        return `
        <div class="winners-block">
            <div class="info-block">
                <h1 class="title">Winners - <span class="winners-amount">${initState.winCount}</span></h1>
                <h3 class="num-title">Page #<span class="num-page">${initState.page}</span></h3>
            </div>
            <div class="win-table">
                <table class="table">
                <thead class="thead">
                    <th>Number</th>
                    <th>Car</th>
                    <th>Name</th>
                    <th class="wins" data-name="wins">Wins</th>
                    <th class="time" data-name="time">Best time (sec)</th>
                </thead>
                <tbody>
                ${this.createTableBlock()}
                </tbody>
            </table>              
            </div>
        </div>
        `;
    }

    render(): HTMLElement {
        this.winnersView.innerHTML = this.createWinnersBlock();
        return this.winnersView;
    }
}
