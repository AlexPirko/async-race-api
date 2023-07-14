import Main from '../../view/main/index';
import Footer from '../../view/footer/index';
import AddListeners from '../add-listeners';
import WinnersModel from '../winners-model';

export default class App {
    private static container: HTMLElement = document.querySelector('#root') as HTMLElement;

    private main: Main;

    private footer: Footer;

    private listener: AddListeners;

    private winner: WinnersModel;

    constructor() {
        this.main = new Main();
        this.footer = new Footer();
        this.listener = new AddListeners();
        this.winner = new WinnersModel();
    }

    private createPage(): void {
        const main = this.main.render();
        const footer = this.footer.render();
        App.container.append(main, footer);
    }

    public run(): void {
        this.createPage();
        this.listener.init();
        // this.winner.addWinner();
    }
}
