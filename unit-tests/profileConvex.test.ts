import { describe, expect, it } from "vitest";
import * as profile from "@/convex/profile";

describe("convex/profile exports", () => {
	it("should export expected functions", () => {
		expect(profile).toHaveProperty("getCurrentUserProfile");
		expect(profile).toHaveProperty("updateProfile");
		expect(profile).toHaveProperty("setActiveOrganization");
		expect(profile).toHaveProperty("generateUploadUrl");
		expect(profile).toHaveProperty("saveProfilePicture");
	});
});
