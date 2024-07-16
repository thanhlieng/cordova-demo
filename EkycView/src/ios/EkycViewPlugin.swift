import Foundation
import LivenessSDKNoAuth // Import your SDK

@objc(EkycViewPlugin) class EkycViewPlugin: CDVPlugin {
    var callbackId: String?
    private lazy var params: [String: Any?] = ["data": "1"]
    private let livenessMas = LivenessMas()

    
    override init() {
            
            super.init()
        }

    @objc(show:)
    func show(command: CDVInvokedUrlCommand) {
        self.callbackId = command.callbackId
        guard let params = command.argument(at: 0) as? [String: Any] else {
            let pluginResult = CDVPluginResult(status: CDVCommandStatus_ERROR, messageAs: "Invalid parameters")
            self.commandDelegate.send(pluginResult, callbackId: command.callbackId)
            return
        }

        self.params = params

        guard let token = params["token"] as? String,
              let url = params["url"] as? String,
              let actions = params["actions"] as? [Int] else {
            let pluginResult = CDVPluginResult(status: CDVCommandStatus_ERROR, messageAs: "Missing parameters")
            self.commandDelegate.send(pluginResult, callbackId: command.callbackId)
            return
        }
        livenessMas.urlConfig = url
        livenessMas.sessionToken = token
        livenessMas.stepActions = actions
        livenessMas.faceUpString = checkVariables(key: "faceUp")
        livenessMas.normalString = checkVariables(key: "normal")
        livenessMas.faceDownString = checkVariables(key: "faceDown")
        livenessMas.faceLeftString = checkVariables(key: "faceLeft")
        livenessMas.faceRightString = checkVariables(key: "faceRight")
        livenessMas.blinkString = checkVariables(key: "blink")

       

        livenessMas.completion = {
          step, stepStatus, resultCode, filePath in
          let resultDict: [String: Any] = [
            "step": step,
            "stepStatus": stepStatus,
            "resultCode": resultCode,
            "filePath": filePath
          ]
          let pluginResult = CDVPluginResult(status: CDVCommandStatus_OK, messageAs: resultDict)
            self.commandDelegate.send(pluginResult, callbackId: self.callbackId)
        }

        DispatchQueue.main.async {
            let customView = self.livenessMas.openSDKin()
            customView.view.frame = self.viewController.view.bounds
            self.viewController.present(customView, animated: true, completion: nil)
        }
    }


    func checkVariables(key: String) -> String? {
        guard let stringValue = self.params[key] as? String else {
            return nil
        }
        return stringValue
        }

    // YourSDKDelegate method

    func hexStringToUIColor(hexColor: String) -> UIColor {
      let stringScanner = Scanner(string: hexColor)
      
      if(hexColor.hasPrefix("#")) {
        stringScanner.scanLocation = 1
      }
      var color: UInt32 = 0
      stringScanner.scanHexInt32(&color)
      
      let r = CGFloat(Int(color >> 16) & 0x000000FF)
      let g = CGFloat(Int(color >> 8) & 0x000000FF)
      let b = CGFloat(Int(color) & 0x000000FF)
      
      return UIColor(red: r / 255.0, green: g / 255.0, blue: b / 255.0, alpha: 1)
    }
}