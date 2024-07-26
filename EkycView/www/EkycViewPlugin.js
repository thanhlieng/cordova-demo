var exec = require("cordova/exec");

var EkycViewPlugin = {
  show: function (params, successCallback, errorCallback) {
    exec(successCallback, errorCallback, "EkycViewPlugin", "show", [params]);
  },
};

module.exports = EkycViewPlugin;
