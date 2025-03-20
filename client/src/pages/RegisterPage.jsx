/**
 * @copyright 2025 Mihai Elisei
 * @license Apache-2.0
 */

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom"; 

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset, 
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(""); 
  const navigate = useNavigate(); 
  const onSubmit = (data) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setMessage("Registration successful! Redirecting to login...");
      reset();

      // Redirect to login page after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }, 2000); // Simulating API response delay
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-zinc-900">
      <div className="w-full max-w-md">
        <div>
          <h2 className="headline-1 mt-5 mb-8 lg:mb-10 !text-center">
            Create an Account
            <span className="block text-center text-lg text-slate-700 dark:text-zinc-400">
              Join us today!
            </span>
          </h2>
        </div>

        {/* Register Form */}
        <Card className="shadow-lg bg-white dark:bg-zinc-900">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-slate-900 dark:text-zinc-400">
              Register
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-zinc-400 mb-1">
                  Full Name
                </label>
                <Input
                  type="text"
                  placeholder="Enter your name"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                )}
              </div>

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
                  <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
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
                  <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-zinc-400 mb-1">
                  Confirm Password
                </label>
                <Input
                  type="password"
                  placeholder="Confirm your password"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === watch("password") || "Passwords do not match",
                  })}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full py-2 flex items-center gap-x-2 text-slate-100 bg-slate-900 hover:bg-slate-800 dark:bg-zinc-200 dark:hover:bg-zinc-400 dark:text-zinc-900 cursor-pointer"
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Register"}
              </Button>
            </form>

            {/* ✅ Success Message */}
            {message && (
              <p className="text-green-600 dark:text-green-400 text-sm text-center mt-4">
                {message}
              </p>
            )}

            {/* Already have an account? */}
            <p className="text-center text-sm mt-3 text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 dark:text-blue-400 hover:underline">
                Login here
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default RegisterPage;
