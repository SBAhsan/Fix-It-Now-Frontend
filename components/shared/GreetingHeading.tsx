"use client";

import { useEffect, useState } from "react";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export function GreetingHeading({ name }: { name: string }) {
  const [greeting, setGreeting] = useState("Hello");

  useEffect(() => {
    setGreeting(getGreeting());
  }, []);

  return (
    <div id="overview-heading">
      <h2 className="text-2xl font-semibold tracking-tight text-foreground">
        {greeting}, {name}
      </h2>
    </div>
  );
}
