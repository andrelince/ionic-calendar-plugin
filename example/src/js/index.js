import { SplashScreen } from '@capacitor/splash-screen';
import { loadIonicComponents } from './ionic';
import { Calendar } from 'ionic-calendar-plugin';

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
              <ion-accordion value="create-calendar">
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
              <ion-accordion value="create-event">
                <ion-item slot="header" color="light">
                  <ion-label>Create Event</ion-label>
                </ion-item>
                <div class="ion-padding" slot="content">
                    <form id="create-event-form">
                        <ion-item>
                            <ion-label>Calendar</ion-label>
                            <ion-input name="calendar" type="text" placeholder="Insert calendar name"></ion-input>                  
                        </ion-item>
                        <ion-item>
                            <ion-label>Title</ion-label>
                            <ion-input name="title" type="text" placeholder="Insert event title"></ion-input>                  
                        </ion-item>
                        <ion-item>
                            <ion-label>Start</ion-label>
                            <input name="start" type="datetime-local">
                        </ion-item>
                        <ion-item>
                            <ion-label>End</ion-label>
                            <input name="end" type="datetime-local">
                        </ion-item>
                        <ion-button type="submit" expand="full">Submit</ion-button>
                    </form>
                </div>
              </ion-accordion>
              <ion-accordion value="update-event">
                <ion-item slot="header" color="light">
                  <ion-label>Update Event</ion-label>
                </ion-item>
                <div class="ion-padding" slot="content">
                    <form id="update-event-form" novalidate>
                        <ion-item>
                            <ion-label>Event</ion-label>
                            <ion-input name="event" type="text" placeholder="Insert event id"></ion-input>                  
                        </ion-item>
                        <ion-item>
                            <ion-label>Title</ion-label>
                            <ion-input name="title" type="text" placeholder="Insert event title"></ion-input>                  
                        </ion-item>
                        <ion-item>
                            <ion-label>Start</ion-label>
                            <input name="start" type="datetime-local">
                        </ion-item>
                        <ion-item>
                            <ion-label>End</ion-label>
                            <input name="end" type="datetime-local">
                        </ion-item>
                        <ion-button type="submit" expand="full">Submit</ion-button>
                    </form>
                </div>
              </ion-accordion>
              <ion-accordion value="delete-event">
                <ion-item slot="header" color="light">
                  <ion-label>Delete Event</ion-label>
                </ion-item>
                <div class="ion-padding" slot="content">
                    <form id="delete-event-form" novalidate>
                        <ion-item>
                            <ion-label>Event</ion-label>
                            <ion-input name="event" type="text" placeholder="Insert event id"></ion-input>                  
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
          Calendar.requestPermissions()
            .then(p => console.log('permissions', p))
            .catch(err => console.error('error on request permission', err));
        });

      self.shadowRoot
        .querySelector('#cperm')
        .addEventListener('click', async function (e) {
          Calendar.checkPermissions()
            .then(p => console.log('permissions', p))
            .catch(err => console.error('error on check permission', err));
        });

      self.shadowRoot
        .querySelector('#create-calendar-form')
        .addEventListener('submit', async function (e) {
          e.preventDefault();
          const form = self.shadowRoot.getElementById('create-calendar-form');
          const name = form?.elements['name']?.value;
          if (name)
            Calendar.createCalendar({ name })
              .then(() => console.log('calendar created'))
              .catch(err =>
                console.error(`error on create calendar ${name}`, err),
              );
        });

      self.shadowRoot
        .querySelector('#create-event-form')
        .addEventListener('submit', async function (e) {
          e.preventDefault();
          const form = self.shadowRoot.getElementById('create-event-form');
          const calendar = form?.elements['calendar']?.value;
          const title = form?.elements['title']?.value;
          const start = new Date(form?.elements['start']?.value);
          const end = new Date(form?.elements['end']?.value);
          const location = {
            name: 'Lisbon, Portugal',
            lat: 38.72474067326249,
            lon: -9.138574427705647,
          };
          if (calendar && title && start && end)
            Calendar.createEvent({ calendar, title, start, end, location })
              .then(event => console.log('event created', event))
              .catch(err =>
                console.error(`error on create event "${title}"`, err),
              );
        });

      self.shadowRoot
        .querySelector('#update-event-form')
        .addEventListener('submit', async function (e) {
          e.preventDefault();
          const form = self.shadowRoot.getElementById('update-event-form');
          const event = form?.elements['event']?.value;
          const title = form?.elements['title']?.value;
          let startV = form?.elements['start']?.value;
          let endV = form?.elements['end']?.value;
          const location = {
            name: 'Lisbon, Portugal',
            lat: 38.72474067326249,
            lon: -9.138574427705647,
          };
          let start = startV ? new Date(startV) : null;
          let end = endV ? new Date(endV) : null;
          if (event)
            Calendar.updateEvent({ event, title, start, end, location })
              .then(event => console.log('event updated', event))
              .catch(err =>
                console.error(`error on update event "${title}"`, err),
              );
        });

      self.shadowRoot
        .querySelector('#delete-event-form')
        .addEventListener('submit', async function (e) {
          e.preventDefault();
          const form = self.shadowRoot.getElementById('delete-event-form');
          const event = form?.elements['event']?.value;
          if (event)
            Calendar.deleteEvent({ event })
              .then(event => console.log('event deleted', event))
              .catch(err =>
                console.error(`error on delete event "${event}"`, err),
              );
        });
    }
  },
);
