import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "@/services/registerService";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    setError("");

    try {
      await registerUser(data);
      toast.success("You have successfully created an account!");
      reset();
      navigate("/login");
    } catch (err) {
      console.error("Registration Error:", err);

      let errorMessage = "Something went wrong. Please try again."; 

      if (err.status === 400 && err.data?.errors) {
        const { errors } = err.data; 
        if (errors.email?.[0].includes("already exists")) {
          errorMessage =
            "This email is already registered. Please use a different email.";
        } else {
          errorMessage = Object.values(errors).flat().join("\n");
        }
      } else if (err.status === 422) {
        errorMessage = "Invalid data. Please check your inputs.";
      } else if (err.status === 429) {
        errorMessage = "Too many requests. Please try again later.";
      } else if (err.status >= 500) {
        errorMessage = "Server error. Please try again later.";
      } else if (err.message === "Network Error") {
        errorMessage = "Network error. Please check your internet connection.";
      }

      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-zinc-900">
      <div className="w-full max-w-md">
        <h2 className="headline-1 mt-5 mb-8 lg:mb-10 !text-center">
          Create an Account
          <span className="block text-center text-lg text-slate-700 dark:text-zinc-400">
            Join us today!
          </span>
        </h2>

        <Card className="shadow-lg bg-white dark:bg-zinc-900">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-slate-900 dark:text-zinc-400">
              Register
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-zinc-400 mb-1">
                  First Name&nbsp;<small className="text-red-500">*</small>
                </label>
                <Input
                  type="text"
                  placeholder="Enter your First Name"
                  {...register("first_name", {
                    required: "First Name is required",
                    minLength: {
                      value: 3,
                      message: "First Name must be at least 3 characters",
                    },
                  })}
                />
                {errors?.first_name?.message && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.first_name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-zinc-400 mb-1">
                  Last Name&nbsp;<small className="text-red-500">*</small>
                </label>
                <Input
                  type="text"
                  placeholder="Enter your Last Name"
                  {...register("last_name", {
                    required: "Last Name is required",
                    minLength: {
                      value: 3,
                      message: "Last Name must be at least 3 characters",
                    },
                  })}
                />
                {errors?.last_name?.message && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.last_name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-zinc-400 mb-1">
                  Email&nbsp;<small className="text-red-500">*</small>
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
                {errors?.email?.message && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-zinc-400 mb-1">
                  Password&nbsp;<small className="text-red-500">*</small>
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

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-zinc-400 mb-1">
                  Confirm Password&nbsp;
                  <small className="text-red-500">*</small>
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
                  <p className="text-red-500 text-xs mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-slate-900 text-slate-200 dark:bg-zinc-600 dark:text-zinc-100 dark:hover:bg-zinc-600 cursor-pointer"
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Register"}
              </Button>
            </form>

            {error && (
              <p className="text-red-600 dark:text-red-400 text-sm text-center mt-4">
                {error}
              </p>
            )}

            <p className="text-center text-sm mt-3 text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
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
