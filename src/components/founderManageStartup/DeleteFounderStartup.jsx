"use client";
import { Avatar, Button, Modal, toast } from "@heroui/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RiDeleteBin6Line, RiSkull2Fill } from "react-icons/ri";

export default function DeleteFounderStartup({ deleteState, details }) {
  const baseURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;
  const { _id, imageUrl, startup_name } = details;
  const [message, setMessage] = useState("Permanently Delete");
  const router = useRouter();
  const handleDelete = async (id) => {
    setMessage("Deleting permanently...");
    const response = await axios.delete(`${baseURL}/api/founder/delete_startup/${id}`);
    const data = response.data;
    if (data.success) {
      toast.success(data.message);
      setMessage("Permanently Delete");
      router.push("/dashboard/founder/my_startup");
    } else {
      toast.danger(data.message);
      setMessage("Permanently Delete");
    }
  }
  return (
    <Modal isOpen={deleteState.isOpen} onOpenChange={deleteState.setOpen}>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="rounded-xs bg-green-100 p-2">
            <Modal.CloseTrigger className="bg-green-300 text-green-950" />
            <div className="flex flex-col items-center gap-1 mb-2">
              <RiSkull2Fill size={30} className="text-red-500" />
              <h1 className="text-lg text-red-500 font-semibold text-center">
                You are going to perform a dangerous operation!
              </h1>
            </div>
            <Modal.Body className="flex flex-col gap-2 items-center">
              <Avatar className="size-25 rounded-sm ring-2 ring-orange-500">
                <Avatar.Image alt={startup_name} src={imageUrl} />
              </Avatar>
              <h1 className="font-bold text-lg text-green-950">
                {startup_name}
              </h1>
            </Modal.Body>
            <Modal.Footer className="flex-col">
              <p className="text-red-500 font-bold text-center">
                Do you want delete it permanently?
              </p>
              <Button
                className="w-full rounded-xs bg-red-500"
                onClick={() => handleDelete(_id)}
              >
                <span>{message}</span>
                <RiDeleteBin6Line />
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
