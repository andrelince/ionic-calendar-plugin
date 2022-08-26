import Foundation
import Capacitor
import EventKit

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(CalendarPlugin)
public class CalendarPlugin: CAPPlugin {
    private let implementation: Calendar!;
    private let eventStore: EKEventStore!;
    
    override public init(bridge: CAPBridgeProtocol, pluginId: String, pluginName: String) {
        self.eventStore = EKEventStore();
        self.implementation = Calendar(store: self.eventStore);
        super.init(bridge: bridge, pluginId: pluginId, pluginName: pluginName);
    }
    
    @objc override public func checkPermissions(_ call: CAPPluginCall) {
        let state: String

        switch EKEventStore.authorizationStatus(for: EKEntityType.event) {
        case .notDetermined:
            state = "prompt"
        case .restricted, .denied:
            state = "denied"
        case .authorized:
            state = "granted"
        @unknown default:
            state = "prompt"
        }

        call.resolve(["status": state])
    }
    
    @objc override public func requestPermissions(_ call: CAPPluginCall) {
        self.eventStore.requestAccess(to: EKEntityType.event) { [weak self] granted, error in
            if let error = error {
                call.reject(error.localizedDescription)
                return
            }
            if !granted {
                call.reject("Access to events was denied")
                return
            }
            self?.checkPermissions(call)
        }
    }
    
    @objc func createCalendar(_ call: CAPPluginCall) {
        guard let name = call.getString("name") else {
            call.reject("Must provide a name for the calendar")
            return
        }
        do {
            try self.implementation.createCalendar(name: name)
            call.resolve()
        } catch CalendarError.NoCalendarSource {
            call.reject("Failed to create calendar: No source found")
        } catch {
            call.reject("Failed to create calendar: \(error)")
        }
    }

}
