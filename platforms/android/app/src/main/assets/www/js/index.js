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
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uSWQiOiJkNGUyMWY0YS02Mzg4LTRjNzItOTUyYi04ZmYzNGUxMzkwNjEiLCJpZCI6IjEiLCJ1c2VybmFtZSI6Im1hc3Njb20iLCJyb2xlIjoiVVNFUiIsIm9yZ2FuaXphdGlvbiI6eyJpZCI6IjEiLCJuYW1lIjoiTWFzc2NvbSJ9LCJpYXQiOjE3MTg2MDA3OTksImV4cCI6MTcxODYwMTE1OX0.R6l6PxUdfnZCvS9aYf3m_qg4rA7q9snMBfeVQMzjuso",
    actions: [0, 3, 2, 1, 5],
    url: "https://ekyc-portal.mascom.vn/burma/sdk/config",
    normal: "1",
    faceUp: "2",
    faceDown: "3",
    faceLeft: "4",
    faceRight: "5",
    blink: "6",
    hold: "7",
  };
  console.log("gfjkhbffdgkjfdhk");
  // Cordova is now initialized. Have fun!
  EkycViewPlugin.show(
    params,
    function (result) {
      console.log(result);
      var resultCode = result?.resultCode;
      var filePath = result?.filePath;
      console.log("Result Code:", resultCode);
      console.log("File Path:", filePath);
    },
    function (err) {
      console.error("Error showing custom view:", err);
    }
  );
  console.log("Running cordova-" + cordova.platformId + "@" + cordova.version);
  document.getElementById("deviceready").classList.add("ready");
}
