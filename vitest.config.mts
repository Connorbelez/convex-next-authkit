import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
    test: {
        environment: "edge-runtime",
        server: { deps: { inline: ["convex-test"] } },
        exclude: ["e2e/**", "node_modules/**", "dist/**"],
    },
    // Avoid aliasing the "convex" npm package name to the local directory,
    // since it can break imports like `import { v } from "convex/values"`.
});