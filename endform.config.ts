import { defineEndformConfig } from "endform";

export default defineEndformConfig({
  // The app and S3 service are started by CI outside Playwright's webServer.
  proxyNetworkHosts: ["<loopback>"],
  // Test fixtures seed the same CI-local Postgres database through Prisma.
  proxyNetworkPorts: [Number(process.env.POSTGRES_PORT || 5432)],
  environmentVariables: ["^DATABASE_URL$"],
  additionalFiles: [
    "apps/web/public/logo-transparent.png",
    "apps/web/public/favicon/android-chrome-192x192.png",
  ],
  // Keep application pressure at the established native runner's four workers.
  concurrentTestLimits: [{ scope: "within-suite-run", limit: 4 }],
});
