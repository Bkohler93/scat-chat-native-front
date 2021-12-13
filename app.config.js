import "dotenv/config";

export default {
  expo: {
    name: "Scatchat",
    slug: "scat-chat",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./app/assets/app_icon.png",
    splash: {
      image: "./app/assets/app_icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./app/assets/app_icon.png",
        backgroundColor: "#FFFFFF",
      },
      softwareKeyboardLayoutMode: "pan",
      package: "com.deece5531.scatchat",
    },
    web: {
      favicon: "./app/assets/app_icon.png",
    },
    description: "",
    extra: {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
      measurementId: process.env.MEASUREMENT_ID,
    },
  },
};
