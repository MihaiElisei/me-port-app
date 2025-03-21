/**
 * @copyright 2025 Mihai Elisei
 * @license Apache-2.0
 */

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    console.log("Login Data:", data);
  };

  return (
    <section className="section flex items-center justify-center h-[80vh] bg-gray-100 dark:bg-zinc-900">
      <div className="w-full max-w-md">
        <div>
          <h2 className="headline-1  mt-5 mb-8 lg:mb-10 !text-center md:text-left">
            Welcome Back!
            <span className="block text-center text-lg text-slate-700 dark:text-zinc-400">
              Log in to continue
            </span>
          </h2>
        </div>
        {/* Login Form */}
        <Card className="shadow-lg bg-white dark:bg-zinc-900">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-slate-900 dark:text-zinc-400">
              Login
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-zinc-400 mb-1">
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email format",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-zinc-400 mb-1">
                  Password
                </label>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full py-2 flex items-center gap-x-2 text-slate-100  bg-slate-900 hover:bg-slate-800 dark:bg-zinc-200 dark:hover:bg-zinc-400 dark:text-zinc-900 cursor-pointer"
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>

            {/* Forgot Password Link */}
            <div className="text-center mt-4 text-sm">
              <Link
                to="/forgot-password"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {/* 🔹 Register Link */}
            <p className="text-center text-sm mt-3 text-gray-600 dark:text-gray-400">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Click here to register
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default LoginPage;
