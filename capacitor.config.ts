import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.med2disp',
  appName: 'Med2Dsip',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
