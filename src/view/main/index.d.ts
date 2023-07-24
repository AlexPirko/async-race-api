import './index.css';
import GaragePage from '../garage';
import WinnersPage from '../winners';
export default class MainPage {
    main: HTMLElement;
    mainContent: HTMLElement;
    garage: GaragePage;
    winnersPage: WinnersPage;
    constructor();
    createMainContent(): void;
    render(): HTMLElement;
}
