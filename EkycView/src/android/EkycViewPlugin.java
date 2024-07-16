package com.ekyc.sdk;

import android.app.Activity;
import android.content.Context;
import android.os.Bundle;
import android.util.Log;
import android.widget.LinearLayout;
import android.widget.TextView;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import mascom.liveness.MLKit.kotlin.LivePreviewView;
import mascom.liveness.OnReceiverResult;

public class EkycViewPlugin extends CordovaPlugin implements OnReceiverResult {
    private LivePreviewView ekycComponentView;
    private CallbackContext callbackContext;
    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        this.callbackContext = callbackContext;
        if (action.equals("show")) {
            JSONObject params = args.getJSONObject(0);
            this.showCustomView(params);
            return true;
        }
        return false;
    }

    @Override
    public void onReceiverResult(int resultCode, String filePath) {
        JSONObject result = new JSONObject();
        try {
            result.put("resultCode", resultCode);
            result.put("filePath", filePath);
            callbackContext.success(result);
        } catch (JSONException e) {
            callbackContext.error("Failed to create result JSON");
        }
    }

    private Boolean checkStringNullorEmpty(String s) {
        if (s == null) return false;
        return !s.isEmpty();
    }

    private void showCustomView(JSONObject params) {
        cordova.getActivity().runOnUiThread(new Runnable() {
            public void run() {
                Context context = cordova.getContext();
                Activity activity = cordova.getActivity();
                
                try {
                    String token = params.getString("token");
                    String url = params.getString("url");
                    String normal = params.getString("normal");
                    String faceUp = params.getString("faceUp");
                    String faceDown = params.getString("faceDown");
                    String faceLeft = params.getString("faceLeft");
                    String faceRight = params.getString("faceRight");
                    String hold = params.getString("hold");
                    String blink = params.getString("blink");
                    JSONArray actionArray = params.getJSONArray("actions");
                    ekycComponentView = new LivePreviewView(context, null);
                    Integer[] actions = new Integer[actionArray.length()];
                    for (int i = 0; i < actionArray.length(); i++) {
                        actions[i] = actionArray.getInt(i);
                    }
                    if (checkStringNullorEmpty(normal)) ekycComponentView.normal(normal);
                    if (checkStringNullorEmpty(faceUp)) ekycComponentView.faceUp(faceUp);
                    if (checkStringNullorEmpty(faceDown)) ekycComponentView.faceDown(faceDown);
                    if (checkStringNullorEmpty(faceLeft)) ekycComponentView.faceLeft(faceLeft);
                    if (checkStringNullorEmpty(faceRight)) ekycComponentView.faceRight(faceRight);
                    if (checkStringNullorEmpty(blink)) ekycComponentView.blink(blink);
                    if (checkStringNullorEmpty(hold)) ekycComponentView.holdPosition(hold);
                    ekycComponentView.setUrlConfig(url);
                    ekycComponentView.updateToken(token);
                    ekycComponentView.setActionStep(actions);
                    ekycComponentView.setOnSDKEventListener(EkycViewPlugin.this);
                } catch (JSONException e) {
                    callbackContext.error("Failed to get data from params");
                }
                activity.setContentView(ekycComponentView);
            }
        });
    }
}