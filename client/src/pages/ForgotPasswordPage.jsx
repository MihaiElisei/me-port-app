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

const ForgotPasswordPage = () => {
  const {
    register,
    handleSubmit,
    reset, // ✅ Added reset() to clear form
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(""); // ✅ Added state for success message

  const onSubmit = (data) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setMessage("A password reset link has been sent to your email.");
      reset(); // ✅ Clears the input field after submission
    }, 2000); // Simulating API response delay
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-zinc-900">
      <div className="w-full max-w-md">
        <div>
          <h2 className="headline-1 mt-5 mb-8 lg:mb-10 !text-center">
            Forgot Password?
            <span className="block text-center text-lg text-slate-700 dark:text-zinc-400">
              Enter your email to reset your password
            </span>
          </h2>
        </div>

        {/* Forgot Password Form */}
        <Card className="shadow-lg bg-white dark:bg-zinc-900">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-slate-900 dark:text-zinc-400">
              Reset Password
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

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full py-2 flex items-center gap-x-2 text-slate-100 bg-slate-900 hover:bg-slate-800 dark:bg-zinc-200 dark:hover:bg-zinc-400 dark:text-zinc-900 cursor-pointer"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </Button>
            </form>

            {/* ✅ Success Message (Rendered after submission) */}
            {message && (
              <p className="text-green-600 dark:text-green-400 text-sm text-center mt-4">
                {message}
              </p>
            )}

            <p className="text-center text-sm mt-3 text-gray-600 dark:text-gray-400">
              <Link
                to="/login"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Back to Login
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ForgotPasswordPage;
