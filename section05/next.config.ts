import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  /**
   * 발생하는 모든 데이터페칭이 로그로서 출력이 됨
   */
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
