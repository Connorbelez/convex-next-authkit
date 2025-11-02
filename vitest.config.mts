/// <reference types="vitest/config" />

import { fileURLToPath } from "node:url";
import path from "path";
import { defineConfig } from "vitest/config";

const dirname =
	typeof __dirname !== "undefined"
		? __dirname
		: path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
	test: {
		environment: "edge-runtime",
		server: {
			deps: {
				inline: ["convex-test"],
			},
		},
		exclude: ["e2e/**", "node_modules/**", "dist/**"],
	},
	resolve: {
		alias: {
			"@": path.resolve(dirname, "./"),
		},
	},
	// Avoid aliasing the "convex" npm package name to the local directory,
	// since it can break imports like `import { v } from "convex/values"`.
});
