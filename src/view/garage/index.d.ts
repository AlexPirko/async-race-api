import './index.css';
import Track from '../track';
export default class GaragePage {
    garage: HTMLElement;
    track: Track;
    page: number;
    count: string | null;
    constructor();
    createGarageBlock(): void;
    render(): HTMLElement;
}
