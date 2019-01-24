package com.ubandani;

import android.app.Application;

import android.content.IntentFilter;
import com.facebook.react.ReactApplication;
import com.centaurwarchief.smslistener.SmsListenerPackage;
import com.imagepicker.ImagePickerPackage;
import com.ianlin.RNCarrierInfo.RNCarrierInfoPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import org.devio.rn.splashscreen.SplashScreenReactPackage;

import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage;
import io.invertase.firebase.auth.RNFirebaseAuthPackage;
import io.invertase.firebase.database.RNFirebaseDatabasePackage;
// import io.invertase.firebase.functions.RNFirebaseFunctionsPackage;
import io.invertase.firebase.storage.RNFirebaseStoragePackage;
import io.invertase.firebase.links.RNFirebaseLinksPackage;
import io.invertase.firebase.invites.RNFirebaseInvitesPackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;
import io.invertase.firebase.perf.RNFirebasePerformancePackage;
import io.invertase.firebase.fabric.crashlytics.RNFirebaseCrashlyticsPackage;

import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;


public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                new MainReactPackage(),
                  new SmsListenerPackage(),
                  new ImagePickerPackage(),
                  new RNCarrierInfoPackage(),
                  new RNDeviceInfo(),
                  new SplashScreenReactPackage(),
                  new RNFirebasePackage(),
                  new RNFirebaseAnalyticsPackage(),
                  new RNFirebaseAuthPackage(),
                  new RNFirebaseDatabasePackage(),
                  // new RNFirebaseFunctionsPackage(),
                  new RNFirebaseStoragePackage(),
                  new RNFirebaseLinksPackage(),
                  new RNFirebaseInvitesPackage(),
                  new RNFirebaseMessagingPackage(),
                  new RNFirebaseNotificationsPackage(),
                  new RNFirebasePerformancePackage(),
                  new RNFirebaseCrashlyticsPackage()
            );
        }

        @Override
        protected String getJSMainModuleName() {
            return "index";
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    // @Override
    // public boolean clearHostOnActivityDestroy() {
    //     return false;
    // }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
    }
}