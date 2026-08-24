import LoginForm from '../_components/LoginForm';
import Link from 'next/link';

const LoginPage = () => {
    return (
        <div className="min-h-screen flex justify-center items-center py-12">
      <div className="w-full max-w-md text-center border-transparent shadow-2xl rounded-4xl px-10 py-8 space-y-6">
        <h2 className="text-4xl font-bold tracking-tight">Welcome Back!</h2>
        <div>
          <LoginForm />
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