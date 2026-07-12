export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto max-w-5xl px-6 py-8 text-sm text-ink-soft">
        <p>© {year} קולאז׳ — כתב עת לספרות</p>
        <p className="mt-1">
          ליצירת קשר:{" "}
          <a
            href="mailto:collagemagaz@gmail.com"
            className="underline transition-colors hover:text-accent"
          >
            collagemagaz@gmail.com
          </a>
        </p>
      </div>
    </footer>
  );
}
