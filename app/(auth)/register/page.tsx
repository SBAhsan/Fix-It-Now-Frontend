import RegisterForm from "../_components/RegisterForm";
import Link from "next/link";

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex justify-center items-center py-12">
      <div className="w-full max-w-md text-center border-transparent shadow-2xl rounded-4xl px-10 py-8 space-y-6">
        <h2 className="text-4xl font-bold tracking-tight">Create Your Account</h2>
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
