import Foundation
import EventKit

@objc public class Transformer: NSObject {

    public func transformEKEvent(_ event: EKEvent) -> [String: Any?] {
        return [
            "uniqueId": event.eventIdentifier,
            "calendarId": event.calendar.calendarIdentifier,
            "title": event.title,
            "start": event.startDate,
            "end": event.endDate,
            "location": [
                "name": event.structuredLocation?.title as Any,
                "lat": Double(event.structuredLocation?.geoLocation?.coordinate.latitude ?? 0),
                "lon": Double(event.structuredLocation?.geoLocation?.coordinate.longitude ?? 0)
            ]
        ]
    }

    public func transformEKCalendar(_ calendar: EKCalendar) -> [String: Any?] {
        return [
            "uniqueId": calendar.calendarIdentifier,
            "title": calendar.title,
            "color": calendar.cgColor.hexString
        ]
    }

    public func transformList(_ items: [Any]) -> [String: [Any]] {
        return [
            "results": items
        ]
    }
}
