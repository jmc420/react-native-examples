//
//  ExampleModule.m
//  ExampleBridge
//
//  Created by James Cowan on 04/07/2017.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(ExampleModule, NSObject)

RCT_EXTERN_METHOD(show:(NSString *)message callback:(RCTResponseSenderBlock)callback)

@end

