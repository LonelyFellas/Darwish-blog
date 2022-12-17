export default class MainBanner extends HTMLElement {
  private template: HTMLTemplateElement | undefined
  constructor() {
    super();
    this.attachShadow({mode: 'open'})
  }

  connectedCallback() {
    this.render()
  }

  render() {
    this.template = document.createElement('template');
    this.template.innerHTML = this.mainBannerTemplate();
    this.shadowRoot?.appendChild(this.template.content.cloneNode(true))
    
  }
  handleClick() {
    console.log("hello");
    console.log("world");

    
  }

  mainBannerTemplate = () => `
    <div>
      say something
    </div>
  
  `
}


customElements.define('main-banner', MainBanner);