import "./style.css"
import isBlanks from "./utils/isBlanks"
import { ITheme } from "./types"
document.querySelector<HTMLDivElement>('#root')!.innerHTML = `
  <home-header></home-header>
  <main>
    <main-banner>
    
    </main-banner>
  </main>
`


const saveTheme = window.localStorage.getItem('theme');
if (isBlanks(saveTheme)) {
  const colorMode = document.querySelector<HTMLHtmlElement>('html')?.getAttribute('color-mode') as ITheme;
  window.localStorage.setItem('theme', colorMode)
}

