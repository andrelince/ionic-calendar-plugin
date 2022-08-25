import {initialize} from "@ionic/core/components";
import {defineCustomElement as loadIonButton} from "@ionic/core/components/ion-button";

export function loadIonicComponents() {
    initialize();
    // load components
    loadIonButton(window);
}