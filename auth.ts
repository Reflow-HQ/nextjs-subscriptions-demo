import "server-only";
import { ReflowAuth } from "@reflowhq/auth-next";

export default function getAuth(): ReflowAuth {
  const { SESSION_SECRET, REFLOW_PROJECT_ID, REFLOW_TEST_MODE } = process.env;

  return new ReflowAuth({
    projectID: Number(REFLOW_PROJECT_ID),
    secret: String(SESSION_SECRET),
    testMode: REFLOW_TEST_MODE == "true",
  });
}
