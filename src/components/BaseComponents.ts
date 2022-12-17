import { randomID } from "../utils/randomID";

export default class BaseComponents extends HTMLElement {
  private componentsID: string
  private refName: string
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.componentsID = randomID();
    this.refName = this.localName + '_' + this.componentsID;
    if (window.hasOwnProperty('components')  && typeof window.components === 'object') {
      throw new Error("it is already components property")
    } else {
      (<Window>window).components = {}
    }
    
    Object.defineProperty(window.components, this.refName, {
      value: this,
      configurable: true
    })
  }

  run(func: string) {
    const tail = !func.includes('(') ? "()" : ''
    return `window.components['${this.refName}'].${func}${tail}`;
  }

  disconnectedCallback() {
    //@ts-ignore
    delete window.components[`${this.refName}`]
  }
}

