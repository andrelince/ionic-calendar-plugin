import Foundation
import EventKit

@objc public class Transformer: NSObject {

    public func transformEKEvent(_ event: EKEvent) -> [String: Any?] {
       return [
           "uniqueID": event.eventIdentifier,
           "calendarID": event.calendar.calendarIdentifier,
           "title": event.title,
           "start": event.startDate,
           "end": event.endDate,
           "location": [
               "name": event.structuredLocation?.title as Any,
               "lat": Double(event.structuredLocation?.geoLocation?.coordinate.latitude ?? 0) ,
               "lng": Double(event.structuredLocation?.geoLocation?.coordinate.longitude ?? 0),
           ]
       ]
   }

   public func transformEKCalendar(_ calendar: EKCalendar) -> [String: Any?] {
       return [
           "uniqueID": calendar.calendarIdentifier,
           "title": calendar.title,
       ]
   }
}
