import Main from '../../view/main/index';
import Footer from '../../view/footer/index';

export default class App {
    private static container: HTMLElement = document.querySelector('#root') as HTMLElement;

    private main: Main;

    private footer: Footer;

    constructor() {
        this.main = new Main();
        this.footer = new Footer();
    }

    private createPage(): void {
        const main = this.main.render();
        const footer = this.footer.render();
        App.container.append(main, footer);
    }

    public run(): void {
        this.createPage();
    }
}
