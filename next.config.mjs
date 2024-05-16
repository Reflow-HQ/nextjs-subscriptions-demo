/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.reflowhq.com",
        port: "",
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "api.reflowhq.com",
        port: "",
        pathname: "/img/**",
      },
    ],
  },
};

export default nextConfig;
