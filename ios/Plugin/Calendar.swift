import Foundation
import EventKit

enum CalendarError: Error {
    case NoCalendarSource
}

@objc public class Calendar: NSObject {
    
    private let store: EKEventStore!;
    
    public init(store: EKEventStore) {
        self.store = store;
    }
    
    @objc public func echo(_ value: String) -> String {
        print(value)
        return value
    }
    
    @objc public func createCalendar(name: String) throws {
        let source = try self.getCalendarSource()
        
        // Skip creation if calendar already exists
        for cal in self.store.calendars(for: EKEntityType.event) {
            if cal.title == name && cal.source == source {
                print("calendar already exists. returning")
                return
            }
        }
        
        let calendar = EKCalendar(for: EKEntityType.event, eventStore: self.store)
        calendar.title = name
        calendar.source = source
        try self.store.saveCalendar(calendar, commit: true)
    }
    
    private func getCalendarSource() throws -> EKSource? {
        let defaultSource = self.store.defaultCalendarForNewEvents?.source
        let iCloud = self.store.sources.first(where: { $0.title == "iCloud" }) // this is fragile, user can rename the source
        let local = self.store.sources.first(where: { $0.sourceType == .local })
        if defaultSource == nil && local == nil && iCloud == nil {
            throw CalendarError.NoCalendarSource
        }
        return defaultSource ?? iCloud ?? local
    }
}
