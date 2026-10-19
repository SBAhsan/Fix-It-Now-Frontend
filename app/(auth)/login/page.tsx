import { Suspense } from "react";
import LoginForm from "../_components/LoginForm";
import Link from "next/link";
import navLogo from "../../../public/fix-it-now-logo.jpg";
import Image from "next/image";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex justify-center items-center py-12">
      <div className="w-full max-w-md text-center border-transparent shadow-2xl rounded-4xl px-10 py-8 space-y-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className="h-2 w-2 rounded-full bg-coral" />
            <Image
              src={navLogo}
              alt="fix-it-now-logo"
              className="h-9 w-40 bg-white mx-auto"
            />
          </Link>
        <h2 className="text-2xl font-bold tracking-tight">Welcome Back!</h2>
          
        <div>
          <Suspense fallback={<div>Loading login...</div>}>
            <LoginForm />
          </Suspense>
        </div>

        <p>
          {`Don't`} have an account?{" "}
          <Link className="text-cyan-400 hover:underline" href={"/register"}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
