import Foundation
import Capacitor
import EventKit

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(CalendarPlugin)
public class CalendarPlugin: CAPPlugin {
    private let implementation: Calendar!
    private let eventStore: EKEventStore!
    private let transformer: Transformer!

    override public init(bridge: CAPBridgeProtocol, pluginId: String, pluginName: String) {
        self.eventStore = EKEventStore()
        self.implementation = Calendar(store: self.eventStore)
        self.transformer = Transformer()
        super.init(bridge: bridge, pluginId: pluginId, pluginName: pluginName)
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
            let calendar = try self.implementation.createCalendar(name: name)
            call.resolve(self.transformer.transformEKCalendar(calendar) as PluginCallResultData)
        } catch CalendarError.NoCalendarSource {
            call.reject("Failed to create calendar: No source found")
        } catch {
            call.reject("Failed to create calendar: \(error)")
        }
    }

    @objc func createEvent(_ call: CAPPluginCall) {
        guard let calendar = call.getString("calendar") else {
            call.reject("Must provide a calendar name to associate the event")
            return
        }
        guard let start = call.getDate("start") else {
            call.reject("Must provide a start date for the event")
            return
        }
        guard let end = call.getDate("end") else {
            call.reject("Must provide an end date for the event")
            return
        }
        guard let title = call.getString("title") else {
            call.reject("Must provide a title for the event")
            return
        }
        var structuredLocation: EKStructuredLocation?
        if let location = call.getObject("location") {
            structuredLocation = EKStructuredLocation(title: location["name", default: "no location"] as! String)

            let location = CLLocation(
                latitude: location["lat", default: 0.0] as! CLLocationDegrees,
                longitude: location["lon", default: 0.0] as! CLLocationDegrees
            )

            structuredLocation?.geoLocation = location
        }
        do {
            let event = try self.implementation.createEvent(
                calendar: calendar, title: title, start: start, end: end, location: structuredLocation)
            call.resolve(self.transformer.transformEKEvent(event) as PluginCallResultData)
        } catch {
            call.reject("Failed to create event: \(error)")
        }
    }

    @objc func updateEvent(_ call: CAPPluginCall) {
        guard let event = call.getString("event") else {
            call.reject("Must provide a event id")
            return
        }
        let start = call.getDate("start")
        let end = call.getDate("end")
        let title = call.getString("title")
        var structuredLocation: EKStructuredLocation?
        if let location = call.getObject("location") {
            structuredLocation = EKStructuredLocation(title: location["name", default: "no location"] as! String)
            let location = CLLocation(
                latitude: location["lat", default: 0.0] as! CLLocationDegrees,
                longitude: location["lon", default: 0.0] as! CLLocationDegrees
            )
            structuredLocation?.geoLocation = location
        }
        do {
            let event = try self.implementation.updateEvent(
                eventId: event, title: title, start: start, end: end, location: structuredLocation)
            call.resolve(self.transformer.transformEKEvent(event) as PluginCallResultData)
        } catch {
            call.reject("Failed to update event: \(error)")
        }
    }

    @objc func deleteEvent(_ call: CAPPluginCall) {
        guard let event = call.getString("event") else {
            call.reject("Must provide a event id")
            return
        }
        do {
            try self.implementation.deleteEvent(eventId: event)
            call.resolve()
        } catch {
            call.reject("Failed to delete event: \(error)")
        }
    }

    @objc func listCalendars(_ call: CAPPluginCall) {
        let calendars = self.implementation.listCalendars().map {
            (calendar) -> [String: Any?] in self.transformer.transformEKCalendar(calendar)
        }
        call.resolve(self.transformer.transformList(calendars))
    }

}
