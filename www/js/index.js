/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
  var params = {
    token: "adsadsadsadasdasd", // session token from api create session (required)
    actions: [0, 3, 2, 1, 5], // list of actions that user have to take to pass liveness (random if empty)
    url: "https://ekyc-portal.mascom.vn/burma/sdk/config-no-auth", // url to init sdk, we will provide you later (required)
    normal: "Move your face to the camera", // init string when sdk open
    faceUp: "Face up", // string to tell user to move face up
    faceDown: "Face down", // string to tell user to move face down
    faceLeft: "Turn left", // string to tell user to turn left
    faceRight: "Turn right", // string to tell user to turn right
    blink: "Blink your eyes", // string to tell user to blink their eyes
    hold: "Hold your face in the camera", // string to tell user to hold their face still in the camera
  };
  //if you dont wanna customize string just pass “”
  EkycViewPlugin.show(
    params,
    function (result) {
      console.log(result); // result will include code and image path (image path will be empty if liveness not success)
      var resultCode = result?.resultCode;
      var filePath = result?.filePath;
      console.log("Result Code:", resultCode);
      console.log("File Path:", filePath);
    },
    function (err) {
      console.error("Error showing custom view:", err);
    }
  );
  // Cordova is now initialized. Have fun!

  console.log("Running cordova-" + cordova.platformId + "@" + cordova.version);
  document.getElementById("deviceready").classList.add("ready");
}
