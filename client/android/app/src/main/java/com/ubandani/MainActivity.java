package com.ubandani;

import android.os.Bundle;

import com.facebook.react.ReactActivity;

import org.devio.rn.splashscreen.SplashScreen;

import com.crashlytics.android.Crashlytics;
import io.fabric.sdk.android.Fabric;

import android.content.Intent;
import android.content.res.Configuration;


public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override

    protected void onCreate(Bundle savedInstanceState) {

        SplashScreen.show(this, R.style.SplashScreenTheme);

        super.onCreate(savedInstanceState);

        Fabric.with(this, new Crashlytics());
    }
    
    // @Override
    // public void invokeDefaultOnBackPressed() {
    //
    //     // super.onBackPressed();
    //
    //     this.moveTaskToBack(true);
    // }

    @Override

    public void onConfigurationChanged(Configuration newConfig) {
        
        super.onConfigurationChanged(newConfig);

        Intent intent = new Intent("onConfigurationChanged");
        
        intent.putExtra("newConfig", newConfig);
        
        this.sendBroadcast(intent);
    }

    @Override

    protected String getMainComponentName() {
        return "Ubandani";
    }
}
