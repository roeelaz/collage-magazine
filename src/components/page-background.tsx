"use client";

import { usePathname } from "next/navigation";

// One collage per top-level section, shown full-bleed behind the content sheet.
const BACKGROUNDS: Record<string, string> = {
  "": "collage_1.jpeg",
  issues: "collage_2.jpeg",
  about: "collage_3.jpeg",
  submit: "collage_5.jpeg",
};

export function PageBackground() {
  const file = BACKGROUNDS[usePathname().split("/")[1]];
  if (!file) return null;

  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 bg-cover bg-center"
      style={{ backgroundImage: `url(/backgrounds/${file})` }}
    />
  );
}
