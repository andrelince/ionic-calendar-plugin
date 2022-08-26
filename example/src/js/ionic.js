import {initialize} from "@ionic/core/components";
import {defineCustomElement as loadIonAccordion} from "@ionic/core/components/ion-accordion";
import {defineCustomElement as loadIonAccordionGroup} from "@ionic/core/components/ion-accordion-group";
import {defineCustomElement as loadIonButton} from "@ionic/core/components/ion-button";
import {defineCustomElement as loadIonInput} from "@ionic/core/components/ion-input";
import {defineCustomElement as loadIonItem} from "@ionic/core/components/ion-item";
import {defineCustomElement as loadIonLabel} from "@ionic/core/components/ion-label";

export function loadIonicComponents() {
    initialize();
    // load components
    loadIonButton(window);
    loadIonInput(window);
    loadIonItem(window);
    loadIonLabel(window);
    loadIonAccordionGroup(window);
    loadIonAccordion(window);
}