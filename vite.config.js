import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
const __dirname = import.meta.dirname;
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      includeAssets: [
        "products.json",
        "images/**/*.{png,jpg,jpeg,webp,svg}",
        "fonts/BarlowSemiCondensed-Bold.eot",
        "fonts/BarlowSemiCondensed-Bold.woff",
        "fonts/BarlowSemiCondensed-Bold.woff2",

        "fonts/BarlowSemiCondensed-Regular.eot",
        "fonts/BarlowSemiCondensed-Regular.woff",
        "fonts/BarlowSemiCondensed-Regular.woff2",

        "fonts/BarlowSemiCondensed-BoldItalic.eot",
        "fonts/BarlowSemiCondensed-BoldItalic.woff",
        "fonts/BarlowSemiCondensed-BoldItalic.woff2",
      ],
      registerType: "autoUpdate",
      manifest: {
        name: "PATTAYA - Karaoké - Discothèque ",
        short_name: "Pattaya",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#ff6600",
        icons: [
          {
            src: "web-app-manifest-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "web-app-manifest-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-stylesheets",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 an
              },
            },
          },
          // ✅ Cache images locales
          {
            urlPattern: /\.(?:png|jpg|jpeg|webp|svg)$/i,
            handler: "CacheFirst",
            options: {
              cacheName: "images",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 jours
              },
            },
          },
          {
            urlPattern: /\/products\.json$/,
            handler: "NetworkFirst",
            options: {
              cacheName: "product-data",
              expiration: {
                maxEntries: 1,
                maxAgeSeconds: 60 * 60 * 24, // 1 jour
              },
              networkTimeoutSeconds: 3,
            },
          },
          {
            urlPattern: /^\/fonts\/.*\.(?:woff2?|ttf|eot|woff|otf)$/i,
            handler: "CacheFirst",
            options: {
              cacheName: "local-fonts",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 an
              },
            },
          },
        ],
      },
    }),
  ],
  // preview: {
  //   host: "0.0.0.0",
  //   port: 4173,
  //   strictPort: true,
  //   allowedHosts: ["pattaya.zone", "localhost", "127.0.0.1"],
  // },
  // server: {
  //   host: "0.0.0.0",
  //   port: 4173,
  //   // https: {
  //   //   key: fs.readFileSync(path.resolve(__dirname, "./cert/localhost-key.pem")),
  //   //   cert: fs.readFileSync(
  //   //     path.resolve(__dirname, "./cert/localhost-cert.pem")
  //   //   ),
  //   // },
  // },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
