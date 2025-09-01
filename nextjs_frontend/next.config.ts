import type { NextConfig } from "next";

/**
 * Next.js config
 * Using static export while consuming a public API base URL via NEXT_PUBLIC_API_BASE_URL.
 * Ensure this env var is set at build time.
 */
const nextConfig: NextConfig = {
  output: "export",
};

export default nextConfig;
