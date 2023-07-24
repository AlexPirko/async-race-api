import './index.css';
import { GarageClient } from '../../components/client/garage-client';
export default class Track {
    track: HTMLElement;
    garageClient: GarageClient;
    constructor();
    createTrack(name: string, color: string, id: number): string;
    createRace(): string;
    render(): HTMLElement;
}
