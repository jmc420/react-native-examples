package com.examplebridge;

import android.content.DialogInterface;
import android.support.v7.app.AlertDialog;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class ExampleModule extends ReactContextBaseJavaModule {

    public ExampleModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "ExampleModule";
    }

    @ReactMethod
    public void show(String message, final Callback callback) {
        AlertDialog.Builder builder = new AlertDialog.Builder(getCurrentActivity());

        builder.setTitle("Android class: "+this.getClass().getSimpleName());
        builder.setMessage(message);

        builder.setPositiveButton("OK", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                callback.invoke();
            }
        });

        AlertDialog dialog = builder.create();

        dialog.show();
    }
}
