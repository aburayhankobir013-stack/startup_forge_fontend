"use client";
import { Button, Modal, toast } from "@heroui/react";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function ApplyOpportunity({ applyState, opportunity, session}) {
  const [message, setMessage] = useState("Apply");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      applicantEmail: session?.user?.email || "",
    },
  });
  const baseURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;
  const handleOnSubmit = async (formData) => {
    const applicationData = {
      ...formData,
      opportunity_id:opportunity._id,
      status: "pending",
      applied_at: new Date(),
    }
    setMessage("Appling...");
    const response = await axios.post(`${baseURL}/api/apply_opportunity`, applicationData);
    const data = response.data;
    if (data.success) {
      toast.success(data.message);
      applyState.setOpen(false);
      setMessage("Apply");
    } else {
      toast.danger(data.message);
      setMessage("Apply");
    }
    reset();
  };
  return (
    <Modal isOpen={applyState.isOpen} onOpenChange={applyState.setOpen}>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="rounded-xs bg-green-100 p-2">
            <Modal.CloseTrigger className="bg-green-300 text-green-950" />
            <Modal.Body className="flex flex-col items-center bg-linear-to-r from-orange-200 via-orange-100 to-orange-50 text-black p-4 rounded-sm">
              <div className="flex flex-col items-center gap-4">
                <div className="flex flex-col items-center text-center gap-2">
                  <h1 className="font-bold text-xl">
                    Apply for This Opportunity
                  </h1>
                  <p className="font-semibold">
                    Share your skills, experience, and enthusiasm to apply for
                    this opportunity.
                  </p>
                </div>
                <form
                  className="rounded-sm bg-orange-300 flex flex-col gap-2 p-4 w-full"
                  onSubmit={handleSubmit(handleOnSubmit)}
                >
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-col gap-1">
                      <label htmlFor="applicantEmail" className="font-semibold">
                        Applicant email
                      </label>
                      <input
                        type="email"
                        id="applicantEmail"
                        disabled
                        {...register("applicantEmail", {
                          required: "Email is required!",
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Please enter a valid email address!",
                          },
                        })}
                        placeholder="Enter your email address"
                        className={`bg-gray-200 px-2 py-1 rounded-sm border outline-orange-500 ${errors.applicantEmail && `border-red-500`}`}
                      />
                    </div>
                    {errors.applicantEmail && (
                      <p className="text-red-500">
                        {errors.applicantEmail.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-col gap-1">
                      <label htmlFor="portfolioLink" className="font-semibold">
                      Portfolio link
                    </label>
                    <input
                      type="text"
                      id="portfolioLink"
                      {...register("portfolioLink", {
                        required: "Portfolio link is required",
                        pattern: {
                          value: /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/,
                          message: "Please enter a valid URL",
                        },
                      })}
                      placeholder="Enter your portfolio link"
                      className={`bg-gray-200 px-2 py-1 rounded-sm border outline-orange-500 ${errors.portfolioLink && `border-red-500`}`}
                    />
                    </div>
                    {
                      errors.portfolioLink
                      &&
                      (<p className="text-red-500">{errors.portfolioLink.message}</p>)
                    }
                  </div>
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="motivationMessage"
                      className="font-semibold"
                    >
                      Motivational Message (Optional)
                    </label>
                    <textarea
                      id="motivationalMessage"
                      {...register("motivationalMessage",)}
                      placeholder="Enter your motivation message here..."
                      className="border bg-gray-200 rounded-sm h-25 resize-none px-2 py-1"
                    ></textarea>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Button
                      onClick={() => reset()}
                      variant="outline"
                      className="rounded-sm w-full border-none bg-orange-500 shadow-sm shadow-orange-500 hover:bg-orange-700 text-white font-bold"
                    >
                      Reset Form
                    </Button>
                    <Button
                      variant="outline"
                      type="submit"
                      className="rounded-sm w-full border-none bg-orange-500 shadow-sm shadow-orange-500 hover:bg-orange-700 text-white font-bold"
                    >
                      Apply
                    </Button>
                  </div>
                </form>
              </div>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
