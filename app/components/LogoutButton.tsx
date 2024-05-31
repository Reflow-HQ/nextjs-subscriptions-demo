"use client";

import { signOut } from "@reflowhq/auth-next/client";
import { useRouter } from "next/navigation";

export default function () {
  const router = useRouter();

  return (
    <button
      onClick={() => signOut({ onSuccess: () => router.refresh() })}
      className="ml-2 rounded border border-red-500 px-2 py-1 text-sm text-red-500 hover:text-red-600"
    >
      Sign Out
    </button>
  );
}
