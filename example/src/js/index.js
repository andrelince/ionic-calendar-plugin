import { SplashScreen } from '@capacitor/splash-screen';
import {loadIonicComponents} from "./ionic";
import { Calendar } from "calendar-plugin";

loadIonicComponents();

window.customElements.define(
  'capacitor-welcome',
  class extends HTMLElement {
    constructor() {
      super();
      SplashScreen.hide();
      const root = this.attachShadow({ mode: 'open' });
      root.innerHTML = `
        <ion-button id="echo" size="small">Echo</ion-button>
      `;
    }

    connectedCallback() {
      const self = this;

      self.shadowRoot
          .querySelector('#echo')
          .addEventListener('click', async function (e) {
              Calendar.echo({value: new Date().toString()})
          });
    }
  }
);
