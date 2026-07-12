import Link from "next/link";

const NAV_LINKS = [
  { href: "/", label: "בית" },
  { href: "/issues", label: "גיליונות" },
  { href: "/updates", label: "עדכונים" },
  { href: "/about", label: "מי אנחנו" },
  { href: "/submit", label: "הגשת יצירות" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-line bg-paper">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-5">
        <Link href="/" className="font-serif text-2xl font-bold text-ink">
          קולאז&apos;
        </Link>
        <nav>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-soft">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition-colors hover:text-accent"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
