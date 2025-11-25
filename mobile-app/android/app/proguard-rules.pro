# Keep React Native classes
-keep class com.facebook.react.** { *; }
-keep class com.facebook.hermes.** { *; }
-keep class com.facebook.jni.** { *; }

# Keep native modules
-keep class com.facebook.react.bridge.** { *; }
-keep class com.facebook.react.uimanager.** { *; }

# Keep React Native JS engine (Hermes)
-keep class com.facebook.hermes.unicode.** { *; }

# Keep AndroidX classes used by RN
-keep class androidx.** { *; }

# Keep Kotlin metadata
-keep class kotlin.Metadata { *; }

# Do not obfuscate React Native entry points
-keepclassmembers class * {
    @com.facebook.react.bridge.ReactMethod <methods>;
}

# Keep WebView
-keep class android.webkit.** { *; }

# Keep AsyncStorage
-keep class com.reactnativecommunity.asyncstorage.** { *; }

# Keep Reanimated
-keep class com.swmansion.reanimated.** { *; }

# Keep Gesture Handler
-keep class com.swmansion.gesturehandler.** { *; }

# Keep SafeAreaContext
-keep class com.th3rdwave.safeareacontext.** { *; }

# Keep Screens
-keep class com.swmansion.rnscreens.** { *; }

# Keep Vector Icons
-keep class com.oblador.vectoricons.** { *; }

# Keep FastImage
-keep class com.dylanvann.fastimage.** { *; }
