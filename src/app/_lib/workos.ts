import { WorkOS } from "@workos-inc/node";
import assert from "node:assert/strict";

const { WORKOS_API_KEY, WORKOS_CLIENT_ID } = process.env;

// Validate that the required environment variables exist
assert.ok(WORKOS_API_KEY, "WORKOS_API_KEY is required");
assert.ok(WORKOS_CLIENT_ID, "WORKOS_CLIENT_ID is required");

export const workos = new WorkOS(WORKOS_API_KEY, {
  clientId: WORKOS_CLIENT_ID,
});
