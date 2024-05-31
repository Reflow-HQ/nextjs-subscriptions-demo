"use client";

import { ReactNode } from "react";

const GuardButton = ({
  condition,
  children,
}: {
  condition: boolean;
  children: ReactNode;
}) => {
  return (
    <>
      {condition ? (
        <button
          onClick={() => alert("Success!")}
          className="focus:shadow-outline h-14 w-32 rounded-lg bg-blue-500 p-2 text-sm font-bold text-white focus:outline-none"
        >
          {children}
        </button>
      ) : (
        <button className="focus:shadow-outline h-14 w-32 rounded-lg bg-red-500 p-2 text-sm font-bold text-white focus:outline-none active:animate-errorShake">
          {children}
        </button>
      )}
    </>
  );
};

export default GuardButton;
