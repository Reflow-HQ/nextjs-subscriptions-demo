This Next.js 14 demo showcases how how easy it is to add subscription functionality using [Reflow Auth](https://github.com/Reflow-HQ/libs/tree/master/auth-next).

The app features a ready-to-use Reflow integration, including a pricing table to display subscription options and a button accessible only to subscribers.

You can view a live demo here - [https://reflow-nextjs-subscriptions-demo.vercel.app/](https://reflow-nextjs-subscriptions-demo.vercel.app/)

# Getting Started

To run the example, follow these steps

1. `npm install` the dependencies in this folder
2. Create a copy of the `.env` file and name it `.env.local`. Fill out the environment variables as described:

- `REFLOW_PROJECT_ID` - The ID of your Reflow project, required for using the library. You can obtain it from your Reflow project's [settings page](https://reflowhq.com/store/settings).
- `SESSION_SECRET` - This is a secret string that will be used for encrypting user sessions. You can enter any random 32 char string or run `openssl rand -hex 16` in the terminal to generate a secret key.
- `REFLOW_TEST_MODE` - (optional) Set this to `true` if you want to run the app in [test mode](https://reflowhq.com/docs/help/test-mode/).

3. Start the development server with `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.
