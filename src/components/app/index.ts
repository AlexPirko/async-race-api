import MainPage from '../../view/main/index';
import Footer from '../../view/footer/index';
import AddListeners from '../add-listeners';

export default class App {
    private static container: HTMLElement = document.querySelector('#root') as HTMLElement;

    private main: MainPage;

    private footer: Footer;

    private listener: AddListeners;

    constructor() {
        this.main = new MainPage();
        this.footer = new Footer();
        this.listener = new AddListeners();
    }

    private createPage(): void {
        const main = this.main.render();
        const footer = this.footer.render();
        App.container.append(main, footer);
    }

    public run(): void {
        this.createPage();
        this.listener.init();
    }
}
