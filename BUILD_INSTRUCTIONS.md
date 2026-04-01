# Android Build Instructions

To build your signed APK and AAB for **Table Tennis World Tour**, follow these steps on your local computer.

## 1. Prerequisites
- **Node.js** installed.
- **Android Studio** and **Android SDK** installed.
- **Java Development Kit (JDK)** installed.

## 2. Setup
1. Download or clone your project to your local computer.
2. Open a terminal in the project root directory.
3. Install dependencies:
   ```bash
   npm install
   ```

## 3. Generate Keystore (One-time)
If you don't have a keystore yet, run this command to generate one:
```bash
keytool -genkey -v -keystore android/app/my-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias my-key-alias
```
*   **Important:** Remember the passwords you set! You will need them in the next step.

## 4. Set Environment Variables
Before building, you need to set the environment variables that the build script uses. Replace `your_password` with the passwords you set in the previous step.

### Windows (PowerShell):
```powershell
$env:KEYSTORE_PASSWORD="your_password"
$env:KEY_ALIAS="my-key-alias"
$env:KEY_PASSWORD="your_password"
```

### Mac / Linux:
```bash
export KEYSTORE_PASSWORD="your_password"
export KEY_ALIAS="my-key-alias"
export KEY_PASSWORD="your_password"
```

## 5. Build Signed APK and AAB
Run the following command to build the production assets and sync them with the Android project:
```bash
npm run build:android
```

Then, navigate to the `android` directory and run the Gradle build:
```bash
cd android
./gradlew assembleRelease  # Generates the APK
./gradlew bundleRelease    # Generates the AAB
```

## 7. GitHub Actions Automation
Your project is now configured to build and sign automatically on every push to the `main` branch.

### Required GitHub Secrets
To make the automation work, you **must** add the following secrets to your GitHub repository (**Settings > Secrets and variables > Actions**):

1.  **`ANDROID_KEYSTORE_BASE64`**: The base64-encoded string of your `.jks` file.
    -   To get this string, run: `base64 -w 0 android/app/my-release-key.jks` (Linux/Mac) or `[Convert]::ToBase64String([IO.File]::ReadAllBytes("android/app/my-release-key.jks"))` (Windows PowerShell).
2.  **`KEYSTORE_PASSWORD`**: The password you set for the keystore.
3.  **`KEY_ALIAS`**: The alias you set for the key (e.g., `my-key-alias`).
4.  **`KEY_PASSWORD`**: The password you set for the key.

## 8. Custom App Icon and Splash Screen
To use the custom image you provided as your app icon:

1.  Create a folder named `resources` in your project root.
2.  Save your image as `icon-only.png` inside that folder (`resources/icon-only.png`).
    -   *Note: For best results, use a square 1024x1024px image.*
3.  (Optional) Save a splash screen image as `splash-only.png` in the same folder.
4.  Run the generation command:
    ```bash
    npm run generate:assets
    ```
5.  This will automatically update all the Android icon and splash screen files.

*If you are using GitHub Actions, simply push the `resources` folder with your images, and the build will automatically generate the icons for you.*

---

## Automated Build Script
You can also use the provided `build-android.sh` script to automate the process.
1. Make the script executable: `chmod +x build-android.sh`
2. Run it: `./build-android.sh`
