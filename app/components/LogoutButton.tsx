"use client";

import { signOut } from "@reflowhq/auth-next/client";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ onSuccess: () => location.reload() })}
      className="focus:shadow-outline mt-6 w-24 rounded bg-blue-500 px-4 py-2 text-sm font-bold text-white hover:bg-blue-600 focus:outline-none"
    >
      Sign Out
    </button>
  );
}
