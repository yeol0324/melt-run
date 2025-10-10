import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-dvh bg-slate-950 text-white">{children}</div>;
}
