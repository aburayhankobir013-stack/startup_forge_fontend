"use client";
import { Button, toast } from "@heroui/react";
import { Label, ListBox, Select } from "@heroui/react";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { FaUser } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { HiArrowLongRight } from "react-icons/hi2";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { RxEyeOpen } from "react-icons/rx";
import { VscEyeClosed } from "react-icons/vsc";
import axios from "axios";
import Image from "next/image";

export default function SignupForm() {
  const [isOpen, setIsOpen] = useState(true);
  const [preview, setPreview] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      role: "collaborator",
    },
  });
  const imageFile = watch("image");
  const handleImageUpload = async () => {
    try {
      const file = imageFile?.[0];
      if (!file) {
        toast.danger("Please select an image!");
        return;
      } else {
        setIsUploading(true);
        setUploadProgress(0);
        const formData = new FormData();
        formData.append("image", file);
        const response = await axios.post(
          `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
          formData,
          {
            onUploadProgress: (progressEvent) => {
              const percentage = Math.round(
                (progressEvent.loaded * 100) / (progressEvent.total || 1),
              );
              setUploadProgress(percentage);
            },
          },
        );
        setImageUrl(response.data.data.url);
        toast.success("Image uploaded successfully!");
      }
    } catch (error) {
      toast.danger("Image upload failed!");
    } finally {
      setIsUploading(false);
    }
  };
  useEffect(() => {
    if (imageFile?.[0]) {
      const url = URL.createObjectURL(imageFile[0]);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [imageFile]);

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
    if (!imageUrl) {
      toast.danger("Please upload am image first!");
    } else {
      console.log(formData);
    }
  };
  return (
    <div className="min-h-screen bg-linear-to-l from-orange-200 via-orange-100 to-orange-50">
      {/* Wrapper */}
      <div className="container mx-auto flex flex-col items-center gap-3 p-2">
        {/* Main container */}
        <h1 className="text-center text-2xl font-bold">Sign Up Form</h1>
        <div className="flex flex-col lg:flex-row w-full xs:max-w-sm md:max-w-md lg:max-w-4xl p-2 bg-orange-300 rounded-sm shadow-sm shadow-orange-300">
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
              <label htmlFor="name">Name</label>
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  {...register("name", {
                    required: "Name is required!",
                  })}
                  placeholder="Enter your full name"
                  className={`bg-zinc-200 border rounded-sm px-6 py-1 outline-orange-400 w-full ${errors.name && `border-red-500`}`}
                />
                <FaUser
                  size={15}
                  className="absolute top-1/2 -translate-y-1/2 left-1"
                />
              </div>
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>
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
              <label htmlFor="image">Upload image</label>
              <div className="flex items-center gap-1">
                <div className="flex-none border text-center size-20 flex justify-center items-center bg-zinc-200 rounded-sm">
                  {preview ? (
                    <figure className="relative size-full">
                      <Image
                        src={preview}
                        alt="User image"
                        fill
                        className="object-fit rounded-sm"
                      />
                    </figure>
                  ) : (
                    <p>
                      Preview
                      <br />
                      image
                    </p>
                  )}
                </div>
                <div className="flex flex-1 flex-col items-center gap-1">
                  <input
                    type="file"
                    accept="image/*"
                    {...register("image", {
                      required: "Image is required!",
                    })}
                    id="image"
                    className="w-full border bg-zinc-200 px-2 py-1 rounded-sm"
                  />
                  <Button
                    variant="outline"
                    onClick={handleImageUpload}
                    disabled={isUploading}
                    className="relative w-full overflow-hidden rounded-sm border-none font-bold text-white shadow-sm hover:shadow-orange-400"
                  >
                    {isUploading && (
                      <span
                        className="absolute inset-y-0 left-0 bg-orange-700 transition-all duration-300"
                        style={{
                          width: `${uploadProgress}%`,
                        }}
                      />
                    )}
                    <span className="relative z-10">
                      {isUploading
                        ? `Uploading ${uploadProgress}%`
                        : `Upload Image`}
                    </span>
                  </Button>
                </div>
              </div>
              {errors.image ? (
                <p className="text-red-500">{errors.image.message}</p>
              ) : !imageUrl ? (
                <p className="text-red-500">Image not uploaded!</p>
              ) : (
                <p className="text-green-500">Image uploaded successfully!</p>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <Select
                    selectedKey={field.value}
                    onSelectionChange={field.onChange}
                    placeholder="Select your role"
                  >
                    <Label className="font-normal text-base">Select role</Label>

                    <Select.Trigger className="rounded-sm bg-zinc-200 px-2 py-1">
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>

                    <Select.Popover className="rounded-sm bg-zinc-200">
                      <ListBox>
                        <ListBox.Item
                          id="collaborator"
                          textValue="collaborator"
                          className="rounded-sm hover:bg-zinc-300"
                        >
                          Collaborator
                          <ListBox.ItemIndicator />
                        </ListBox.Item>

                        <ListBox.Item
                          id="founder"
                          textValue="founder"
                          className="rounded-sm hover:bg-zinc-300"
                        >
                          Founder
                          <ListBox.ItemIndicator />
                        </ListBox.Item>
                      </ListBox>
                    </Select.Popover>
                  </Select>
                )}
              />
              <p className="text-xs text-zinc-500 text-center">
                Default role is set to{" "}
                <span className="font-semibold">Collaborator</span>. You can
                change it if needed.
              </p>
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
                className="w-full rounded-sm bg-orange-500 font-bold text-white border-none shadow-sm hover:shadow-orange-400"
              >
                Reset
              </Button>
              <Button
                variant="outline"
                type="submit"
                className="w-full rounded-sm bg-orange-500 font-bold text-white border-none shadow-sm hover:shadow-orange-400"
              >
                Sign Up
              </Button>
            </div>
            <p className="text-center">
              Continue with Google to create your account instantly.
            </p>
            <div className="flex flex-col gap-1">
              <Button
                variant="outline"
                className="w-full rounded-sm bg-orange-500 font-bold text-white border-none shadow-sm hover:shadow-orange-400"
              >
                <FcGoogle />
                <span>Sign up with google</span>
              </Button>
              <Button
                variant="outline"
                className="w-full rounded-sm bg-zinc-100 font-bold text-black border-none shadow-sm hover:shadow-orange-400"
              >
                <span>Go to sign in page</span>
                <HiArrowLongRight />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
