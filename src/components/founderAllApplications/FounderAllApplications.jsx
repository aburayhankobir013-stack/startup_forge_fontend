"use client";
import { Button, Table, toast } from "@heroui/react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function FounderAllApplications({ applications }) {
  const router = useRouter();
  const baseURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;
  const dateFormate = (createdAt) => {
    const date = new Date(createdAt);
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const yy = String(date.getFullYear()).slice(-2);
    const formatted = `${mm}-${dd}-${yy}`;
    return formatted;
  };
  const handleAccept = async (applicationId) => {
    const response = await axios.patch(
      `${baseURL}/api/founder/update_application/${applicationId}`,
      {
        status: "accepted",
      },
    );
    if (response.data.success) {
      toast.success(response.data.message);
      router.push("/dashboard/founder/applications");
    } else {
      toast.danger(response.data.message);
    }
  };
  const handleReject = async (applicationId) => {
    const response = await axios.patch(
      `${baseURL}/api/founder/update_application/${applicationId}`,
      {
        status: "rejected",
      },
    );
    if (response.data.success) {
      toast.success(response.data.message);
      router.push("/dashboard/founder/applications");
    } else {
      toast.danger(response.data.message);
    }
  };
  if (applications.length === 0) {
    return (
      <div className="h-full flex flex-col justify-center items-center">
        <h1 className="text-xl font-bold text-red-500">
          No Applications Found!
        </h1>
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
                Role title
              </Table.Column>
              <Table.Column className="text-white font-semibold text-base">
                Applicant email
              </Table.Column>
              <Table.Column className="text-white font-semibold text-base">
                Applied at
              </Table.Column>
              <Table.Column className="text-white font-semibold text-base">
                Status
              </Table.Column>
              <Table.Column className="text-white font-semibold text-base">
                Action
              </Table.Column>
            </Table.Header>
            <Table.Body>
              {applications.map((application) => {
                return (
                  <Table.Row
                    key={application.applicationId}
                    className="cursor-pointer"
                  >
                    <Table.Cell className="rounded-xs">
                      {application.role_title}
                    </Table.Cell>
                    <Table.Cell>{application.applicant_email}</Table.Cell>
                    <Table.Cell>
                      {dateFormate(application.appliedAt)}
                    </Table.Cell>
                    <Table.Cell className="capitalize">{application.status}</Table.Cell>
                    <Table.Cell className="rounded-xs flex items-center gap-2">
                      {application.status === "pending" && (
                        <>
                          <Button
                            className="rounded-sm bg-green-500 hover:bg-green-700"
                            onClick={() =>
                              handleAccept(application.applicationId)
                            }
                          >
                            Accept
                          </Button>

                          <Button
                            className="rounded-sm bg-red-500 hover:bg-red-700"
                            onClick={() =>
                              handleReject(application.applicationId)
                            }
                          >
                            Reject
                          </Button>
                        </>
                      )}

                      {application.status === "accepted" && (
                        <Button
                          className="rounded-sm bg-red-500 hover:bg-red-700"
                          onClick={() =>
                            handleReject(application.applicationId)
                          }
                        >
                          Reject
                        </Button>
                      )}

                      {application.status === "rejected" && (
                        <Button
                          className="rounded-sm bg-green-500 hover:bg-green-700"
                          onClick={() =>
                            handleAccept(application.applicationId)
                          }
                        >
                          Accept
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
