cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "com.ekyc.sdk.EkycViewPlugin",
      "file": "plugins/com.ekyc.sdk/www/EkycViewPlugin.js",
      "pluginId": "com.ekyc.sdk",
      "clobbers": [
        "EkycViewPlugin"
      ]
    }
  ];
  module.exports.metadata = {
    "com.ekyc.sdk": "1.0.0"
  };
});