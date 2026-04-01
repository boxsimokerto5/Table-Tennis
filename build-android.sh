#!/bin/bash

# Build Script for Table Tennis World Tour Android App
# This script automates the generation of signed APK and AAB files.

# 1. Check for Keystore
KEYSTORE_PATH="android/app/my-release-key.jks"
if [ ! -f "$KEYSTORE_PATH" ]; then
    echo "Keystore not found at $KEYSTORE_PATH. Generating a new one..."
    # Replace with your actual details
    keytool -genkey -v -keystore $KEYSTORE_PATH -keyalg RSA -keysize 2048 -validity 10000 -alias my-key-alias -keypass your_password -storepass your_password -dname "CN=Table Tennis, OU=Gaming, O=Table Tennis World Tour, L=World, S=World, C=US"
    echo "Keystore generated successfully."
fi

# 2. Set Environment Variables
# Replace 'your_password' with the passwords you set for the keystore.
export KEYSTORE_PASSWORD="your_password"
export KEY_ALIAS="my-key-alias"
export KEY_PASSWORD="your_password"

# 3. Build Web Assets and Sync with Android
echo "Building web assets and syncing with Android..."
npm run build:android

# 4. Build Signed APK and AAB
echo "Building signed APK and AAB..."
cd android
./gradlew assembleRelease
./gradlew bundleRelease

# 5. Check Output
if [ $? -eq 0 ]; then
    echo "Build successful!"
    echo "Signed APK: android/app/build/outputs/apk/release/app-release.apk"
    echo "Signed AAB: android/app/build/outputs/bundle/release/app-release.aab"
else
    echo "Build failed. Please check the logs above."
fi
