import Image from "next/image";
import RegisterForm from "../_components/RegisterForm";
import navLogo from "../../../public/fix-it-now-logo.jpg";
import Link from "next/link";

const RegisterPage = () => {
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
        <h2 className="text-2xl font-bold tracking-tight">Create Your Account</h2>
        
        <div>
          <RegisterForm />
        </div>

        <p>
          Already have an account?{" "}
          <Link className="text-cyan-400 hover:underline" href={"/login"}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
