"use client";

import { useLandbotCore } from "./hooks/useLandbotCore";

export default function Home() {
  const { error, isLoading } = useLandbotCore();

  if (error) {
    return <>Error: {error}</>;
  }

  if (isLoading) {
    return <>Loading...</>;
  }

  return <>Your messages here...</>;
}
