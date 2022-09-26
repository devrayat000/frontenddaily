import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import tsPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export const reactConfig = defineConfig({
  plugins: [tsPaths(), svgr({ exportAsDefault: false }), react()],
  server: {
    cors: {
      origin: "http://localhost:3000",
    },
  },
});
