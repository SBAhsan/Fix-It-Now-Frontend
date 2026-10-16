import Image from 'next/image';
import Link from 'next/link';
import logo from "../../public/fix-it-now-logo.jpg"

const Footer = () => {
    return (
    <footer className="border-t py-8">
      <div className=" flex flex-wrap items-center justify-between gap-4 px-6 text-sm text-muted-foreground">
        <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className="h-2 w-2 rounded-full bg-coral" />
          <Image
            src={logo}
            alt="fix-it-now-logo"
            className="h-6 w-25 bg-white"
          />
          </Link>
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