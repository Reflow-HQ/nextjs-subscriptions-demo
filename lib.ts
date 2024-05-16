export interface Plan {
  object: "plan";
  id: number;
  name: string;
  description: string;
  prices: PlanPrice[];
  parameters: Record<string, any>;
  features: Record<string, any>;
  trial_days: number;
  subscription_setup_fee: null | {
    name: string;
    description: string;
    price: number;
    price_formatted: string;
    currency: {
      code: string;
      name: string;
      zero_decimal: boolean;
    };
  };
  is_archived: boolean;
  created: number;
}

export interface PlanPrice {
  object: "plan_price";
  id: number;
  price: number;
  price_formatted: string;
  currency: {
    code: string;
    name: string;
    zero_decimal: boolean;
  };
  billing_period: string;
  is_taxed: boolean;
  tax_behavior: string;
  is_archived: boolean;
  created: number;
}

class ReflowApiError extends Error {
  endpoint?: string;
  status?: number;
  body?: object;
}

export async function fetchSubscriptionPlans(): Promise<Plan[]> {
  try {
    const apiURL =
      process.env.REFLOW_TEST_MODE == "live"
        ? "https://api.reflowhq.com/v2"
        : "https://test-api.reflowhq.com/v2";
    const requestUrl = `${apiURL}/projects/${process.env.REFLOW_PROJECT_ID}/plans/`;

    const result = await fetch(requestUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "force-cache",
    });

    const body = await result.json();

    if (!result.ok) {
      const err = new ReflowApiError(body.error || "HTTP error");
      err.endpoint = requestUrl;
      err.status = result.status;
      err.body = body;
      throw err;
    }

    return body.data;
  } catch (e) {
    if (e instanceof ReflowApiError) {
      throw {
        endpoint: e.endpoint,
        status: e.status || 500,
        body: e.body,
      };
    }

    throw {
      error: e,
    };
  }
}
