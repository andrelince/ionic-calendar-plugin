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
        <div style="padding: 20px 10%;">
          <ion-accordion-group>
              <ion-accordion value="permission">
                    <ion-item slot="header" color="light">
                      <ion-label>Request Permissions</ion-label>
                    </ion-item>
                    <div class="ion-padding" slot="content">
                      <ion-button id="rperm" expand="full">Request Permissions</ion-button>
                      <ion-button id="cperm" expand="full">Check Permissions</ion-button>
                    </div>
              </ion-accordion>
              <ion-accordion value="create">
                <ion-item slot="header" color="light">
                  <ion-label>Create Calendar</ion-label>
                </ion-item>
                <div class="ion-padding" slot="content">
                    <form id="create-calendar-form">
                        <ion-item>
                            <ion-label>Name</ion-label>
                            <ion-input name="name" type="text" placeholder="Insert calendar name"></ion-input>                  
                        </ion-item>
                        <ion-button type="submit" expand="full">Submit</ion-button>
                    </form>
                </div>
              </ion-accordion>
          </ion-accordion-group>
        </div>
      `;
    }

    connectedCallback() {
      const self = this;

        self.shadowRoot
            .querySelector('#rperm')
            .addEventListener('click', async function (e) {
                Calendar
                    .requestPermissions()
                    .then(p => console.log("permissions", p))
                    .catch(err => console.error("error on request permission", err))
            });

        self.shadowRoot
            .querySelector('#cperm')
            .addEventListener('click', async function (e) {
                Calendar
                    .checkPermissions()
                    .then(p => console.log("permissions", p))
                    .catch(err => console.error("error on check permission", err))
            });

        self.shadowRoot
            .querySelector('#create-calendar-form')
            .addEventListener('submit', async function (e) {
                e.preventDefault();
                const form = self.shadowRoot.getElementById('create-calendar-form');
                const name = form?.elements['name']?.value;
                if(name) Calendar
                        .createCalendar({name})
                        .then(() => console.log("calendar created"))
                        .catch(err => console.error(`error on create calendar ${name}`, err));
            });
    }
  }
);
