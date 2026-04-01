import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.tabletennis.worldtour',
  appName: 'Table Tennis World Tour',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
