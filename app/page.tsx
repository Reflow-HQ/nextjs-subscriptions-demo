import Image from "next/image";
import getAuth from "@/auth";
import { fetchSubscriptionPlans } from "@/lib";
import LogoutButton from "./components/LogoutButton";
import UnsubscribeButton from "./components/UnsubscribeButton";
import PricingTable from "./components/PricingTable";
import GuardButton from "./components/GuardButton";

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
            href="https://reflowhq.com/learn/the-quickest-way-to-add-subscriptions-in-nextjs"
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
            The quickest way to add subscriptions in Next.js
          </h1>

          <p className="mx-auto mb-4 max-w-lg">
            This demo showcases user subscriptions in a Next.js 14 project using
            the{" "}
            <a
              className="text-blue-500 hover:text-blue-600"
              href="https://github.com/Reflow-HQ/libs/tree/master/auth-next"
              target="_blank"
            >
              Reflow auth
            </a>{" "}
            library.
          </p>
          <p className="mx-auto max-w-lg">
            Try subscribing to one of the plans displayed below.
          </p>
        </div>
      </div>

      <div className="relative flex w-full max-w-3xl flex-col items-center border bg-white px-4 py-16 text-left">
        <div className="flex flex-col gap-y-12">
          <section className="flex flex-col items-center gap-y-4">
            <h3 className="text-xl font-semibold">
              Auth & Subscription Status
            </h3>
            <p className="max-w-md text-center text-gray-700">
              Here we display information about the user based on their
              authentication and subscription status.
            </p>
            <p>
              <b>Auth status:</b>{" "}
              {user ? (
                <>
                  Signed in as {user.name}.
                  <LogoutButton />
                </>
              ) : (
                <>You are not signed in.</>
              )}
            </p>
            <p>
              <b>Subscription status:</b>{" "}
              {subscription ? (
                <>
                  Subscribed to {subscription.plan.name}.
                  <UnsubscribeButton />
                </>
              ) : (
                <>You are not subscribed.</>
              )}
            </p>
          </section>

          {!subscription && (
            <>
              <hr></hr>
              <section className="flex flex-col items-center gap-y-4">
                <h3 className="text-xl font-semibold">Subscription Plans</h3>
                <p className="max-w-lg text-center text-gray-700">
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
              </section>
            </>
          )}

          <hr></hr>
          <section className="flex flex-col items-center gap-y-4">
            <h3 className="text-xl font-semibold">Guarded Actions</h3>
            <p className="max-w-md text-center text-gray-700">
              Depending on the user's auth and subscription status, only some of
              the buttons will be available.
            </p>

            <div className="flex max-w-lg flex-wrap justify-center gap-4">
              <GuardButton condition={true}>Free Access</GuardButton>
              <GuardButton condition={!!user}>Auth Access</GuardButton>
              <GuardButton condition={!!subscription}>
                Subscriber Access
              </GuardButton>
              <GuardButton
                condition={
                  subscription?.plan.parameters.access_level == "standard"
                }
              >
                Standard Plan Access
              </GuardButton>
              <GuardButton
                condition={
                  subscription?.plan.parameters.access_level == "premium"
                }
              >
                Premium Plan Access
              </GuardButton>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
