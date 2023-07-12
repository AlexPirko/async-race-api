import Main from '../../view/main/index';
import Footer from '../../view/footer/index';
import Racing from '../racing-process';

export default class App {
    private static container: HTMLElement = document.querySelector('#root') as HTMLElement;

    private main: Main;

    private footer: Footer;

    private racing: Racing;

    constructor() {
        this.main = new Main();
        this.footer = new Footer();
        this.racing = new Racing();
    }

    private createPage(): void {
        const main = this.main.render();
        const footer = this.footer.render();
        App.container.append(main, footer);
    }

    public run(): void {
        this.createPage();
        this.racing.addRaceListeners();
    }
}
