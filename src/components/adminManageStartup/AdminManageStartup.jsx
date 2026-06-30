"use client";
import { Avatar, Button, Table, toast } from "@heroui/react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AdminManageStartup({ startups }) {
  const baseURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;
  const router = useRouter();
  const handleApprove = async (startupId) => {
    const response = await axios.patch(
      `${baseURL}/api/admin/update_startup_status/${startupId}`,
      {
        status: "approved",
      },
    );
    const data = response.data;
    if (data.success) {
      toast.success(data.message);
      router.push("/dashboard/admin/manage_startups");
    } else {
      toast.danger(data.message);
    }
  };

  const handleReject = async (startupId) => {
    const response = await axios.patch(
      `${baseURL}/api/admin/update_startup_status/${startupId}`,
      {
        status: "rejected",
      },
    );
    const data = response.data;
    if (data.success) {
      toast.success(data.message);
      router.push("/dashboard/admin/manage_startups");
    } else {
      toast.danger(data.message);
    }
  };
  if (startups.length === 0) {
    return (
      <div className="h-full flex flex-col justify-center items-center">
        <h1 className="text-xl font-bold text-red-500">No Startups Found!</h1>
      </div>
    );
  }
  return (
    <div className="h-full p-4">
      <Table className="rounded-none  px-2 py-0 bg-transparent">
        <Table.ScrollContainer>
          <Table.Content
            aria-label="Team members"
            className="min-w-5xl rounded-xs"
          >
            <Table.Header className="bg-orange-300 border">
              <Table.Column
                isRowHeader
                className="text-white font-semibold text-base"
              >
                Startup Image
              </Table.Column>
              <Table.Column className="text-white font-semibold text-base">
                Startup Name
              </Table.Column>
              <Table.Column className="text-white font-semibold text-base">
                Founder Email
              </Table.Column>
              <Table.Column className="text-white font-semibold text-base">
                Status
              </Table.Column>
              <Table.Column className="text-white font-semibold text-base">
                Action
              </Table.Column>
            </Table.Header>
            <Table.Body>
              {startups.map((startup) => {
                return (
                  <Table.Row key={startup._id} className="cursor-pointer">
                    <Table.Cell className="rounded-xs">
                      <Avatar className="size-15">
                        <Avatar.Image
                          alt={startup.startup_name}
                          src={startup.imageUrl}
                        />
                        <Avatar.Fallback>
                          {startup.startup_name.charAt(0)}
                        </Avatar.Fallback>
                      </Avatar>
                    </Table.Cell>
                    <Table.Cell>{startup.startup_name}</Table.Cell>
                    <Table.Cell>{startup.founder_email}</Table.Cell>
                    <Table.Cell className="capitalize">
                      {startup.status}
                    </Table.Cell>
                    <Table.Cell className="rounded-xs">
                      {startup.status === "pending" && (
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            onClick={() => handleApprove(startup._id)}
                            className="bg-green-500 text-white hover:bg-green-700 rounded-sm border-none"
                          >
                            Approve
                          </Button>

                          <Button
                            variant="outline"
                            onClick={() => handleReject(startup._id)}
                            className="rounded-sm bg-red-500 text-white border-none hover:bg-red-700"
                          >
                            Reject
                          </Button>
                        </div>
                      )}
                      {startup.status === "approved" && (
                        <Button
                          variant="outline"
                          onClick={() => handleReject(startup._id)}
                          className="rounded-sm bg-red-500 text-white border-none hover:bg-red-700"
                        >
                          Reject
                        </Button>
                      )}
                      {startup.status === "rejected" && (
                        <Button
                          ariant="outline"
                          onClick={() => handleApprove(startup._id)}
                          className="bg-green-500 text-white hover:bg-green-700 rounded-sm border-none"
                        >
                          Approve
                        </Button>
                      )}
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
}
