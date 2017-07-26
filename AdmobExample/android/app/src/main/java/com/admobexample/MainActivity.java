package com.admobexample;

import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.google.android.gms.ads.MobileAds;

public class MainActivity extends ReactActivity {

    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        MobileAds.initialize(this, "ca-app-pub-5792127887771225~5173486979");
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "AdmobExample";
    }
}
