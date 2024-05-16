import Image from "next/image";
import getAuth from "@/auth";
import { fetchSubscriptionPlans } from "@/lib";
import LogoutButton from "./components/LogoutButton";
import PricingTable from "./components/PricingTable";
import SubscriberOnlyButton from "./components/SubscriberOnlyButton";

export default async function Home() {
  const plans = await fetchSubscriptionPlans();

  const auth = getAuth();
  const user = await auth.user();
  const subscription = await auth.subscription();

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-6 lg:p-24">
      <div>
        <div className="text-md z-10 mb-28 flex w-full max-w-5xl flex-col items-center lg:flex-row lg:justify-between">
          <a
            className="flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://reflowhq.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/reflow.svg"
              alt="Reflow Logo"
              width={60}
              height={60}
              className="w-14"
              priority
            />
            <span className="mx-2 text-xl">+</span>
            <Image
              className="relative w-24"
              src="/next.svg"
              alt="Next.js Logo"
              width={100}
              height={24}
              priority
            />
          </a>

          <a
            className="group flex gap-2 rounded-xl border border-gray-300 bg-gray-100 bg-gradient-to-b from-zinc-100 px-8 py-3 text-center backdrop-blur-2xl hover:bg-gray-200 hover:from-zinc-200"
            href="https://reflowhq.com/learn/how-to-add-users-to-any-nextjs-app"
          >
            <span>Read the full article </span>
            <span className="transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
              >
                <path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z" />
              </svg>
            </span>
          </a>
        </div>

        <div className="mb-20 text-center">
          <h1 className="mb-8 text-2xl font-bold">
            The quickest way to add subscriptions in Next.js apps
          </h1>

          <p className="mb-4 max-w-2xl">
            This simple demo uses the{" "}
            <a
              className="text-blue-500 hover:text-blue-600"
              href="https://github.com/Reflow-HQ/libs/tree/master/auth-next"
              target="_blank"
            >
              Reflow auth library
            </a>{" "}
            for adding user accounts.
          </p>
          <p className="max-w-2xl">
            The registration process, as well as signing in and out is handled
            entirely by the library. <br /> Users can sign up with email and
            password or by using their social accounts.
          </p>
        </div>
      </div>

      <div className="relative flex w-full max-w-3xl flex-col items-center border bg-white px-4 py-16 text-left">
        <div className="flex flex-col items-center gap-y-4 text-center">
          <h3 className="text-xl font-semibold">Subscriber Only Action</h3>
          <p className="max-w-md text-center text-gray-500">
            Clicking the button will display a success message only when the
            user has an active subscription.
          </p>

          <SubscriberOnlyButton subscription={subscription} />

          {user && subscription ? (
            <div>
              <h2 className="mb-4 mt-12 text-xl font-semibold">
                Hello, {user.name}!
              </h2>
              <p className="text-gray-500">
                You are subscribed to the <b>{subscription.plan.name}</b> plan
                for{" "}
                <b>
                  {subscription.price.price_formatted}/
                  {subscription.price.billing_period}.
                </b>
              </p>
              <LogoutButton />
            </div>
          ) : (
            <>
              <h3 className="mt-12 text-xl font-semibold">
                Subscription Plans
              </h3>
              <p className="max-w-lg text-center text-gray-500">
                Select one of the plans and start a subscription.
                <br></br>
                You can use a{" "}
                <a
                  className="text-blue-500 hover:text-blue-600"
                  href="https://docs.stripe.com/testing#cards"
                  target="_blank"
                >
                  Stripe testing card
                </a>{" "}
                during checkout.
              </p>

              <div className="rounded bg-slate-100 p-4 text-left text-sm text-gray-700">
                <p>
                  Number:
                  <span className="ml-1 mr-1 font-mono">4242</span>
                  <span className="mr-1 font-mono">4242</span>
                  <span className="mr-1 font-mono">4242</span>
                  <span className="mr-1 font-mono">4242</span>
                </p>
                <p>CVC: Any 3 digits</p>
                <p>Date: Any future date</p>
              </div>

              <PricingTable plans={plans} />
            </>
          )}
        </div>
      </div>
    </main>
  );
}
