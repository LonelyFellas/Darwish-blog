import websiteLogo from '/src/assets/images/vite.svg';
import { NavList, ColorMode } from '../home-header.type';
import domLoop from '../../../utils/domLoop';
import { svgObj } from '../entities/svgObj';
import BaseComponents from '../../../components/BaseComponents';
import { ITheme } from '../../../types';
export class HomeHeader extends BaseComponents {
  private template: HTMLTemplateElement | undefined;
  private navList: NavList;
  private isLight: ITheme
  constructor() {
    super();
    this.isLight = 'light';
    this.navList = ['Swift', 'Rust', 'React', 'OC'];
  }

  connectedCallback() {
    this.render();
  }
  toggleColorMode() {
    // window.localStorage.setItem('theme')

    const originTheme = window.localStorage.getItem('theme') as ITheme;
    this.isLight = originTheme === 'light' ? 'dark' : 'light';
    document.querySelector('html')?.setAttribute('color-mode', this.isLight);
    window.localStorage.setItem('theme', this.isLight);
    
  }
  render() {
    this.template = document.createElement('template');
    // this.template.innerHTML = this.headerTemplate({ mode: 'light'});
    this.template.innerHTML = `
          <style>
            @import "${new URL('../styles/home-header.css', import.meta.url)}"
          </style>
        <header>
          <a class="website_logo_title" href="/">
              <img class="website_logo" src="${websiteLogo}" alt="website logo" />
              <span class="website_title flex-row-all-center">Darwish</span>
          </a>
          <div class='website_bar'>
            <nav id="nav">
            </nav>
            <div class="icons-button-link" onClick>
              <a href="https://github.com/LonelyFellas" class="icons-button-link-github">
                ${svgObj.github}
              </a>
              <a href="javascript:void(0)" class="icons-button-link-mode" onclick="${
                typeof this.run === 'function' ? this.run('toggleColorMode(event)') : ''
              }">
                ${this.isLight === 'light' ? svgObj.lightMode : svgObj.darkMode}
              </a>
            </div>
            <div class="menu">
              ${svgObj.menuIcon}
            </div>
          </div>
          </header>
          `;
    this.shadowRoot?.appendChild(this.template.content.cloneNode(true));
    domLoop<NavList>({
      domLoopID: 'nav',
      label: 'a',
      domLoopData: this.navList,
      thisEnv: this.shadowRoot!,
    }); // 添加多个指定标签元素，
  }
}

customElements.define('home-header', HomeHeader);
