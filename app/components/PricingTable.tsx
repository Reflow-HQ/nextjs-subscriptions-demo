"use client";

import { useRouter } from "next/navigation";
import { createSubscription } from "@reflowhq/auth-next/client";

export default ({ plans }: { plans: Plan[] }) => {
  const router = useRouter();

  return (
    <div className="container mx-auto mt-8 max-w-xl px-6">
      <div className="flex flex-col justify-center gap-6 md:flex-row">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="flex flex-1 flex-col justify-between gap-y-8 rounded-lg border p-6 text-left shadow-lg"
          >
            <div>
              <h3 className="mb-2 text-xl font-semibold">{plan.name}</h3>
              <p className="text-gray-600">{plan.description}</p>
            </div>
            <div key={plan.prices[0].id} className="">
              <span className="text-2xl font-bold">
                {plan.prices[0].price_formatted}
              </span>
              <span className="text-gray-600">
                /{plan.prices[0].billing_period}
              </span>
            </div>
            <ul className="">
              {plan.features.map((feature: string, index: number) => (
                <li key={index} className="mb-1 text-gray-700">
                  - {feature}
                </li>
              ))}
            </ul>
            <button
              className="w-full rounded-lg bg-blue-500 py-2 font-bold text-white hover:bg-blue-600"
              onClick={() =>
                createSubscription({
                  priceID: plan.prices[0].id,
                  onSignin: () => router.refresh(),
                  onSubscribe: () => router.refresh(),
                })
              }
            >
              Subscribe
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

interface Plan {
  object: "plan";
  id: number;
  name: string;
  description: string;
  prices: {
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
  }[];
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
