import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { User } from "@/lib/types";
import { getDashboardPath } from "@/lib/getDashboardPath";
import navLogo from "../../public/fix-it-now-logo.jpg";

const NavBar = ({ user }: { user: User | null }) => {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="h-2 w-2 rounded-full bg-coral" />
          <Image
            src={navLogo}
            alt="fix-it-now-logo"
            className="h-8 w-35 bg-white"
          />
        </Link>

        <nav className="hidden gap-8 text-sm text-muted-foreground md:flex">
          <Link href="#how" className="hover:text-foreground">
            How it works
          </Link>
          <Link href="#technicians" className="hover:text-foreground">
            For technicians
          </Link>
          <Link href="#reviews" className="hover:text-foreground">
            Reviews
          </Link>
        </nav>

        <div className="flex gap-2">
          {user ? (
            <Button
              render={
                <Link href={getDashboardPath(user.role)}>Go to dashboard</Link>
              }
              nativeButton={false}
            />
          ) : (
            <>
              <Button
                variant="ghost"
                render={<Link href="/login">Sign in</Link>}
                nativeButton={false}
              />
              <Button
                render={<Link href="/services">Book a service</Link>}
                nativeButton={false}
              />
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavBar;
