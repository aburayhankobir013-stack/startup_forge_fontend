"use client";
import { Button, toast } from "@heroui/react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function FounderAddStartup() {
  const [preview, setPreview] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState("Submit Form");
  const { data: session } = useSession();
  const baseURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      founder_email: session?.user?.email || "",
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

  useEffect(() => {
    if (session?.user?.email) {
      reset({
        founder_email: session.user.email,
      });
    }
  }, [session]);

  const handleOnSubmit = async (formData) => {
    try {
      if (!imageUrl) {
        toast.danger("Please upload am image first!");
      } else {
        const startupFormData = {
          startup_name: formData.startup_name,
          industry: formData.industry,
          founding_stage: formData.founding_stage,
          founder_email: formData.founder_email,
          imageUrl: imageUrl,
          description: formData.description,
        };
        setMessage("Submitting Form...");
        const response = await axios.post(
          `${baseURL}/api/founder/add_startup`,
          startupFormData,
        );
        const data = response.data;
        if (data.success) {
          toast.success(data.message);
          setMessage("Submit Form");
          router.push("/dashboard/founder/my_startup");
        } else {
          toast.danger(data.message);
          setMessage("Submit Form");
        }
      }
    } catch (error) {
      console.log(error.message);
      setMessage("Submit Form");
    }
    reset();
  };
  return (
    <div className="h-full flex flex-col justify-center items-center gap-2">
      {/* Wrapper */}
      <div className="text-center flex flex-col gap-1">
        <h1 className="font-bold text-2xl">Add Your Startup</h1>
        <p>
          Share your startup idea, vision, and details to connect
          <br /> with founders, collaborators, and investors.
        </p>
      </div>
      <div className="p-2">
        {/* Main container */}
        <form
          className="shadow-sm shadow-orange-500 p-4 bg-orange-300 flex flex-col gap-2 w-full xs:max-w-md rounded-sm"
          onSubmit={handleSubmit(handleOnSubmit)}
        >
          <div className="flex flex-col gap-1">
            <div className="flex flex-col gap-1">
              <label htmlFor="startupName" className="font-semibold">
                Startup name
              </label>
              <input
                type="text"
                id="startupName"
                {...register("startup_name", {
                  required: "Startup name is required!",
                })}
                className={`bg-gray-200 px-2 py-1 rounded-sm outline-orange-500 w-full border ${errors.startup_name && `border-red-500`}`}
                placeholder="Enter startup name"
              />
              {errors.startup_name && (
                <p className="text-red-500">{errors.startup_name.message}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex flex-col gap-1">
              <label htmlFor="industry" className="font-semibold">
                Industry
              </label>
              <input
                type="text"
                id="industry"
                {...register("industry", {
                  required: "Industry name is required!",
                })}
                className={`bg-gray-200 px-2 py-1 rounded-sm outline-orange-500 w-full border ${errors.industry && `border-red-500`}`}
                placeholder="Enter your industry"
              />
            </div>
            {errors.industry && (
              <p className="text-red-500">{errors.industry.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex flex-col gap-1">
              <label htmlFor="foundingStage" className="font-semibold">
                Founding stage
              </label>
              <input
                type="text"
                id="foundingStage"
                {...register("founding_stage", {
                  required: "Founding stage is required!",
                })}
                className={`bg-gray-200 px-2 py-1 rounded-sm outline-orange-500 w-full border ${errors.founding_stage && `border-red-500`}`}
                placeholder="Enter your founding stage"
              />
            </div>
            {errors.founding_stage && (
              <p className="text-red-500">{errors.founding_stage.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex flex-col gap-1">
              <label htmlFor="founderEmail" className="font-semibold">
                Founder Email
              </label>
              <input
                type="email"
                {...register("founder_email", {
                  required: "Founder email is required!",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
                disabled={true}
                className={`bg-gray-200 px-2 py-1 rounded-sm outline-orange-500 w-full border ${errors.founder_email && `border-red-500`}`}
                id="founderEmail"
                placeholder="Enter founder email"
              />
            </div>
            {errors.founder_email && (
              <p className="text-red-500">{errors.founder_email.message}</p>
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
                  className={`relative w-full overflow-hidden rounded-sm border-none font-bold text-white shadow-sm hover:shadow-orange-400 ${isUploading && `bg-black`}`}
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
            <div className="flex flex-col gap-1">
              <label htmlFor="description" className="font-semibold">
                Description
              </label>
              <textarea
                name=""
                id="description"
                {...register("description", {
                  required: "Description is required!",
                })}
                className={`bg-gray-200 rounded-sm h-20 w-full px-2 py-1 resize-none outline-orange-500 border ${errors.description && `border-red-500`}`}
                placeholder="Enter description here..."
              ></textarea>
            </div>
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <Button
              variant="outline"
              onClick={() => reset()}
              className="w-full rounded-sm bg-orange-500 font-bold text-white shadow-sm shadow-orange-500 hover:bg-orange-700 border-none"
            >
              Reset Form
            </Button>
            <Button
              variant="outline"
              className="w-full rounded-sm bg-orange-500 font-bold text-white shadow-sm shadow-orange-500 hover:bg-orange-700 border-none"
              type="submit"
            >
              {message}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
