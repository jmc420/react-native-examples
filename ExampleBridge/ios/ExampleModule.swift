//
//  ExampleModule.swift
//  ExampleBridge
//
//  Created by James Cowan on 04/07/2017.
//  Copyright © 2017 Facebook. All rights reserved.
//

import Foundation
import UIKit

@objc(ExampleModule)
class ExampleModule: NSObject {
  
  @objc func show(_ message:String, callback: @escaping RCTResponseSenderBlock) {
    let className:String = NSStringFromClass(type(of: self));
    let rootViewController: UIViewController = UIApplication.shared.windows[0].rootViewController!
    let alertController = UIAlertController(title: className, message: message, preferredStyle: UIAlertControllerStyle.alert)
    
    alertController.addAction(UIAlertAction(title: "OK", style: UIAlertActionStyle.default, handler: { action in
      callback([]);
    }));
    
    rootViewController.present(alertController, animated: true, completion: nil)
  }
  
}
