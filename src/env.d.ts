declare namespace NodeJS {
  interface ProcessEnv {
    VITE_DB_URL: string;
    VITE_PORT_ONE_SECRET_KEY: string;
    VITE_PORT_CHANNEL_KEY: string;
    VITE_PORT_STORE_ID: string;
    VITE_PREMIUM_PRODUCT_ID: number;
    VITE_CHANNEL_TALK_PLUGIN_KEY: string;
    VITE_PAYPAL_CLIENT_ID: string;
  }
}
