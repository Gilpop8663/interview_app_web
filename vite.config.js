import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
// https://vitejs.dev/config/
export default defineConfig(function (_a) {
  var mode = _a.mode;
  var env = loadEnv(mode, process.cwd(), "");
  return {
    base: "/",
    define: {
      "process.env.VITE_DB_URL": JSON.stringify(env.VITE_DB_URL),
      "process.env.VITE_PORT_ONE_SECRET_KEY": JSON.stringify(
        env.VITE_PORT_ONE_SECRET_KEY,
      ),
      "process.env.VITE_PORT_CHANNEL_KEY": JSON.stringify(
        env.VITE_PORT_CHANNEL_KEY,
      ),
      "process.env.VITE_PORT_STORE_ID": JSON.stringify(env.VITE_PORT_STORE_ID),
      "process.env.VITE_PREMIUM_MONTHLY_PRODUCT_ID": JSON.stringify(
        env.VITE_PREMIUM_MONTHLY_PRODUCT_ID,
      ),
      "process.env.VITE_PREMIUM_YEARLY_PRODUCT_ID": JSON.stringify(
        env.VITE_PREMIUM_YEARLY_PRODUCT_ID,
      ),
      "process.env.VITE_CHANNEL_TALK_PLUGIN_KEY": JSON.stringify(
        env.VITE_CHANNEL_TALK_PLUGIN_KEY,
      ),
      "process.env.VITE_PAYPAL_CLIENT_ID": JSON.stringify(
        env.VITE_PAYPAL_CLIENT_ID,
      ),
      "process.env.VITE_PREMIUM_DOLLAR_MONTHLY_PRODUCT_ID": JSON.stringify(
        env.VITE_PREMIUM_DOLLAR_MONTHLY_PRODUCT_ID,
      ),
      "process.env.VITE_PREMIUM_DOLLAR_YEARLY_PRODUCT_ID": JSON.stringify(
        env.VITE_PREMIUM_DOLLAR_YEARLY_PRODUCT_ID,
      ),
    },
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
