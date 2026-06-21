"use client";
import { Button, Spinner, toast } from "@heroui/react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { HiArrowLongRight } from "react-icons/hi2";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { RxEyeOpen } from "react-icons/rx";
import { VscEyeClosed } from "react-icons/vsc";
import Link from "next/link";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function SigninForm() {
  const [isOpen, setIsOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("Sign In");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const password = watch("password", "");
  const passwordRules = {
    required: "Password is required!",
    validate: (value) => {
      const hasMinLength = value.length >= 6;
      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);

      if (!hasMinLength) {
        return "At least 6 charecters required!";
      }
      if (!hasUpperCase) {
        return "At least 1 uppercase letter required!";
      }
      if (!hasLowerCase) {
        return "At least 1 lowercase letter required!";
      }
      return true;
    },
  };
  const handleOnSubmit = async (formData) => {
    await authClient.signIn.email(
      {
        email: formData.email,
        password: formData.password,
        rememberMe: false,
      },
      {
        onRequest: (ctx) => {
          setIsLoading(true);
          setMessage("Sign In...");
        },
        onSuccess: (ctx) => {
          toast.success("User successfully signin!");
          setIsLoading(false);
          setMessage("Sign In");
          setTimeout(() => {
            router.push("/");
          }, 2000);
        },
        onError: (ctx) => {
          setIsLoading(false);
          setMessage("Sign In");
          toast.danger(ctx.error.message);
        },
      },
    );
    reset();
  };
  const handleGoogleSignin = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };
  return (
    <div className="min-h-screen bg-linear-to-l from-orange-200 via-orange-100 to-orange-50">
      {/* Wrapper */}
      <div className="container mx-auto flex flex-col items-center gap-3 p-2">
        {/* Main container */}
        <h1 className="text-center text-2xl font-bold">
          Welcome To Sign Up Form
        </h1>
        <div className="flex flex-col lg:flex-row w-full xs:max-w-sm md:max-w-md lg:max-w-4xl gap-3 p-2 bg-orange-300 rounded-sm shadow-sm shadow-orange-300">
          {/* Form container */}
          <div className="flex-1 flex flex-col justify-center items-center text-center gap-3">
            {/* Left container */}
            <h1 className="text-2xl font-bold">
              <span className="text-indigo-500">STARTUP</span>
              <span className="text-orange-500">FORGE</span>
            </h1>
            <h3 className="font-bold text-xl">Join the Startup Community</h3>
            <p className="font-semibold">
              Whether you're a founder looking for talent or a collaborator
              seeking exciting opportunities, StartupForge helps you build
              meaningful connections and grow together.
            </p>
          </div>
          <form
            onSubmit={handleSubmit(handleOnSubmit)}
            className="flex-1 flex flex-col gap-2 rounded-sm p-2 bg-orange-400"
          >
            <div className="flex flex-col gap-1">
              <label htmlFor="email">Email</label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  {...register("email", {
                    required: "Email is required!",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  })}
                  placeholder="Enter your email address"
                  className={`bg-zinc-200 border rounded-sm px-6 py-1 outline-orange-400 w-full ${errors.email && `border-red-500`}`}
                />
                <MdEmail
                  size={15}
                  className="absolute top-1/2 -translate-y-1/2 left-1"
                />
              </div>
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="password">Password</label>
              <div className="relative">
                <input
                  type={isOpen ? "password" : "text"}
                  id="password"
                  {...register("password", passwordRules)}
                  placeholder="Enter your password"
                  className={`bg-zinc-200 rounded-sm border px-6 py-1 outline-orange-400 w-full ${errors.password && `border-red-500`}`}
                />
                <RiLockPasswordFill
                  size={15}
                  className="absolute top-1/2 -translate-y-1/2 left-1"
                />
                {isOpen ? (
                  <RxEyeOpen
                    size={18}
                    className="cursor-pointer absolute top-1/2 -translate-y-1/2 right-2"
                    onClick={() => setIsOpen((prevCondition) => !prevCondition)}
                  />
                ) : (
                  <VscEyeClosed
                    size={18}
                    className="cursor-pointer absolute top-1/2 -translate-y-1/2 right-2"
                    onClick={() => setIsOpen((prevCondition) => !prevCondition)}
                  />
                )}
              </div>
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="confirm_password">Confirm password</label>
              <div className="relative">
                <input
                  type="password"
                  id="contirm_password"
                  {...register("confirm_password", {
                    required: "Confirm password is required!",
                    validate: (value) => {
                      return value === password || "Password do not match!";
                    },
                  })}
                  placeholder="Re-type your password"
                  className={`bg-zinc-200 border rounded-sm px-6 py-1 outline-orange-400 w-full ${errors.confirm_password && `border-red-500`}`}
                />
                <RiLockPasswordFill
                  size={15}
                  className="absolute top-1/2 -translate-y-1/2 left-1"
                />
              </div>
              {errors.confirm_password && (
                <p className="text-red-500">
                  {errors.confirm_password.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <Button
                variant="outline"
                onClick={() => reset()}
                disabled={isLoading}
                className={`w-full rounded-sm font-bold text-white border-none shadow-sm hover:shadow-orange-400 ${isLoading ? `bg-black` : `bg-orange-500`}`}
              >
                Reset
              </Button>
              <Button
                variant="outline"
                type="submit"
                className={`w-full rounded-sm font-bold text-white border-none shadow-sm hover:shadow-orange-400 ${isLoading ? `bg-black` : `bg-orange-500`}`}
              >
                {isLoading ? (
                  <>
                    <Spinner color="current" />
                    {message}
                  </>
                ) : (
                  message
                )}
              </Button>
            </div>
            <p className="text-center">
              An account already exists. Please sign in using Google.
            </p>
            <div className="flex flex-col gap-1">
              <Button
                variant="outline"
                onClick={handleGoogleSignin}
                className="w-full rounded-sm bg-orange-500 font-bold text-white border-none shadow-sm hover:shadow-orange-400"
              >
                <FcGoogle />
                <span>Sign in with google</span>
              </Button>
              <Link href={"/signup"}>
                <Button
                  variant="outline"
                  className="w-full rounded-sm bg-zinc-100 font-bold text-black border-none shadow-sm hover:shadow-orange-400"
                >
                  <span>Go to sign up page</span>
                  <HiArrowLongRight />
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
