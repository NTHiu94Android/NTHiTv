import { initializeApp, getApps, getApp } from 'firebase/app';
import { getReactNativePersistence, initializeAuth } from 'firebase/auth/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Cấu hình Firebase (cập nhật với thông tin của bạn)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Kiểm tra xem Firebase đã khởi tạo chưa
let appFirebaseConfig;
if (!getApps().length) {
    appFirebaseConfig = initializeApp(firebaseConfig);
  initializeAuth(appFirebaseConfig, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} else {
    appFirebaseConfig = getApp();
}
