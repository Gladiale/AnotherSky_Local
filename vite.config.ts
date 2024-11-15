import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // https://www.jianshu.com/p/b527dc3427fa
  server: {
    host: "0.0.0.0",
  },
});
