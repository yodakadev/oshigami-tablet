// next.config.js
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  // 開発中はPWAを無効にする
  disable: process.env.NODE_ENV === "development",
  // runtimeCaching: [
  //   {
  //     // 外部リソースのキャッシュ設定
  //     urlPattern: /^https?.*/,
  //     handler: "NetworkFirst",
  //     options: {
  //       cacheName: "external-images",
  //       expiration: {
  //         maxEntries: 100,
  //         maxAgeSeconds: 24 * 60 * 60 * 1, // 300日間
  //       },
  //     },
  //   },
  //   {
  //     // publicフォルダ内の画像をキャッシュする設定
  //     urlPattern: /.*\.(?:png|jpg|jpeg|svg|gif|wav)/,
  //     handler: "CacheFirst",
  //     options: {
  //       cacheName: "images",
  //       expiration: {
  //         maxEntries: 500,
  //         maxAgeSeconds: 1 * 30 * 60 * 1, // 30分
  //       },
  //     },
  //   },
  // ],
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 他にもNext.jsの設定があればここに追加します
};

module.exports = withPWA(nextConfig);
