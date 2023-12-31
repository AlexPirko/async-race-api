import './index.css';
import addElement from '../../utils/add-elements';
import createCarImage from '../../utils/create-car-image';
import { Cars } from '../../types';
import { GarageClient } from '../../components/client/garage-client';
import { initState } from '../../utils/add-initial-states';

export default class Track {
    public track: HTMLElement;

    public garageClient: GarageClient;

    constructor() {
        this.track = addElement('div', ['track']);

        this.garageClient = new GarageClient();
    }

    createTrack(name: string, color: string, id: number): string {
        const html = `
        <div class="race-block" data-id="${id}">
            <div class="track-control">
                <button class="select-btn">select</button>
                <button class="remove-btn">remove</button>
                <div class="car-name">${name}</div>
            </div>
            <div class="track-block">
                <div class="track-start">
                    <button class="start-btn" data-start-id="${id}">A</button>
                    <button class="stop-btn" data-stop-id="${id}" disabled>B</button>
                    <div class="car" id="${id}" data-car-id="${id}" data-car-name="${name}">${createCarImage(
            color
        )}</div>
                </div>
                <div class="track-field">
                    <div class="finish"></div>
                </div>
            </div>   
        </div>
        `;
        return html;
    }

    createRace() {
        return `<div class="primary-block">
                <div class="info-block">
                    <h1 class="title">Garage - <span class="cars-amount">${initState.carCount}</span></h1>
                    <h3 class="num-title">Page #<span class="num-page">${initState.page}</span></h3>
                </div>
            </div>
            ${initState.cars.map((car: Cars) => this.createTrack(car.name, car.color, car.id)).join('')}
        `;
    }

    render(): HTMLElement {
        this.createRace();
        this.track.innerHTML = this.createRace();
        return this.track;
    }
}
