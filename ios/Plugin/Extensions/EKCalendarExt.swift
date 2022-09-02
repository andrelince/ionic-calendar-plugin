import Foundation
import CoreGraphics

extension CGColor {

    var hexString: NSString {
        let colorRef = self.components

        let r: CGFloat = colorRef?[0] ?? 0.0
        let g: CGFloat = colorRef?[1] ?? 0.0
        let b: CGFloat = colorRef?[2] ?? 0.0

        return NSString(format: "#%02lX%02lX%02lX", lroundf(Float(r * 255)), lroundf(Float(g * 255)), lroundf(Float(b * 255)))
    }
}
