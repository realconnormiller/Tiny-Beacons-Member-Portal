export const dynamic = "force-dynamic";

import { Suspense } from "react";
import LoginClient from "./LoginClient";

export default function Page({
  searchParams,
}: {
  searchParams?: { next?: string };
}) {
  return (
    <Suspense fallback={null}>
      <LoginClient next={searchParams?.next} />
    </Suspense>
  );
}
