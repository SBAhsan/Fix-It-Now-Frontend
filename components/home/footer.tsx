import Link from 'next/link';

const Footer = () => {
    return (
    <footer className="border-t py-8">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 text-sm text-muted-foreground">
        <span className="flex items-center gap-2 font-medium text-foreground">
          <span className="h-2 w-2 rounded-full bg-coral" />
          fix-it-now
        </span>
        <div className="flex gap-6">
          <Link href="/help">Customer help</Link>
          <Link href="/technician-resources">Technician resources</Link>
          <Link href="/admin">Admin console</Link>
        </div>
        <span>© 2026 fix-it-now</span>
      </div>
    </footer>
  );
};

export default Footer;