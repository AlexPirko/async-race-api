import './index.css';

export default class Footer {
    footer: HTMLElement;

    constructor() {
        this.footer = document.createElement('footer');
    }

    render(): HTMLElement {
        const html = `
        <div class='footer__link'>
            <a href='https://github.com/AlexPirko'class='footer__link-git'>AlexPirko</a>
            <span>2023&#169</span>
            <a href='https://rs.school/js/'class='footer__link-rss'>RSSchool</a>
        </div>
        `;

        this.footer.innerHTML = html;
        this.footer.classList.add('footer');
        return this.footer;
    }
}
