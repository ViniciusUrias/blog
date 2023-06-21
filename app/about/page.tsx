"use client";

import { useEffect } from "react";

export default function About() {
  useEffect(() => {
    const a = document.createElement("a");
    a.href = "banknow://home/events";
    a.click();
  }, []);
  return <h1>about</h1>;
}
