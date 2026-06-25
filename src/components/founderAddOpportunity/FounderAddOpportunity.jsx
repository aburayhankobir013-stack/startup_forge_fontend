"use client";
import { Button } from "@heroui/react";
import { useForm } from "react-hook-form";

export default function FounderAddOpportunity() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleOnSubmit = async (formData) => {
    const skills = formData.required_skills.split(",").map((s) => s.trim()).filter(Boolean);
    console.log({
      ...formData, required_skills: skills,
    });
  }
  return (
    <div className="h-full flex flex-col justify-center items-center p-2">
      {/* Warpper */}
      <div className="flex flex-col gap-2">
        {/* Main container */}
        <div className="flex flex-col items-center text-center">
          <h1 className="text-2xl font-bold">Create a New Opportunity</h1>
          <p>
            Define the role, required skills, and collaboration details <br />{" "}
            to find the right talent for your startup.
          </p>
        </div>
        <form onSubmit={handleSubmit(handleOnSubmit)} className="p-4 flex flex-col gap-2 bg-orange-300 rounded-sm shadow-sm shadow-orange-500 w-full xs:max-w-sm">
          <div className="flex flex-col gap-1">
            <div className="flex flex-col gap-1">
              <label htmlFor="role_title" className="font-semibold">
                Role title
              </label>
              <input
                type="text"
                id="role_title"
                {...register("role_title", {required: "Role title is required!"})}
                placeholder="Enter role title"
                className={`bg-gray-200 border px-2 py-1 rounded-sm outline-orange-500 ${errors.role_title && `border-red-500`}`}
              />
            </div>
            {
              errors.role_title
              &&
              <p className="text-red-500">{errors.role_title.message}</p>
            }
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex flex-col gap-1">
              <label htmlFor="required_skills" className="font-semibold">
              Required skills
            </label>
            <input
              type="text"
              {...register("required_skills", {
                required: "At least one skill is required!",
                validate: (value) => {
                  if (!value || value.trim() === "") {
                    return "At least one skill is required!";
                  }
                  const skills = value.split(",").map((s) => s.trim()).filter(Boolean);
                  if (skills.length < 1) {
                    return "Please add at least one skill!";
                  }
                  return true;
                },
              })}
              id="required_skills"
              placeholder="Enter skills with comma separated"
              className={`bg-gray-200 rounded-sm px-2 py-1 border outline-orange-500 ${errors.required_skills && `border-red-500`}`}
            />
            </div>
            {
              errors.required_skills
              &&
              <p className="text-red-500">{errors.required_skills.message}</p>
            }
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex flex-col gap-1">
            <label htmlFor="work_type" className="font-semibold">
              Work types
            </label>
            <select
              {...register("work_type", {required: "Work type is required!"})}
              id="work_type"
              className={`bg-gray-200 px-2 py-1 border rounded-sm outline-orange-500 ${errors.work_type && `border-red-500`}`}
            >
              <option value="">Select work type</option>
              <option value="remote">Remote</option>
              <option value="on-site">On-site</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>
          {
            errors.work_type
            &&
            <p className="text-red-500">{errors.work_type.message}</p>
          }
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex flex-col gap-1">
            <label htmlFor="commitment_levels" className="font-semibold">
              Commitment levels
            </label>
            <select
              {...register("commitment_levels", {required: "Commitment level is required!"})}
              id="commitment_levels"
              className={`bg-gray-200 px-2 py-1 rounded-sm outline-orange-500 border ${errors.commitment_levels && `border-red-500`}`}
            >
              <option value="">Select commitment level</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="flexible">Flexible</option>
            </select>
          </div>
          {
            errors.commitment_levels
            &&
            <p className="text-red-500">{errors.commitment_levels.message}</p>
          }
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex flex-col gap-1">
            <label htmlFor="deadline" className="font-semibold">
              Deadline
            </label>
            <input
              type="date"
              id="deadline"
              {...register("deadline", {required: "Deadline is required!",
                validate: (value) => {
                  if (!value) {
                    return "Deadline is required!";
                  }
                  const selectedDate = new Date(value);
                  selectedDate.setHours(0, 0, 0, 0);
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  if (selectedDate <= today) {
                    return "Deadline must be a future date!";
                  }
                  return true;
                },
              })}
              className={`px-2 py-1 bg-gray-200 rounded-sm uppercase border ${errors.deadline && `border-red-500`}`}
            />
          </div>
          {
            errors.deadline
            &&
            <p className="text-red-500">{errors.deadline.message}</p>
          }
          </div>
          <div className="flex flex-col gap-1">
            <Button
              variant="outline"
              className="w-full rounded-sm bg-orange-500 font-bold text-white shadow-sm shadow-orange-500 border-none hover:bg-orange-700"
            >
              Reset Form
            </Button>
            <Button
              variant="outline"
              type="submit"
              className="w-full rounded-sm bg-orange-500 font-bold text-white shadow-sm shadow-orange-500 border-none hover:bg-orange-700"
            >
              Submit Form
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
