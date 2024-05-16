"use client";

import { Subscription } from "@reflowhq/auth-next/types";
import { clsx } from "clsx";

export default ({ subscription }: { subscription: Subscription | null }) => {
  const subscriberOnlyAction = () => {
    if (!subscription) return;

    alert(`Success!`);
  };

  return (
    <button
      onClick={subscriberOnlyAction}
      className={clsx(
        "focus:shadow-outline w-24 rounded px-4 py-2 text-sm font-bold text-white focus:outline-none",
        subscription ? "bg-blue-500" : "bg-red-500 active:animate-errorShake",
      )}
    >
      Click me!
    </button>
  );
};
