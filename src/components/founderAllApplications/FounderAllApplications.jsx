"use client";
import { Button, Table } from "@heroui/react";

export default function FounderAllApplications({ applications }) {
  const dateFormate = (createdAt) => {
    const date = new Date(createdAt);
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const yy = String(date.getFullYear()).slice(-2);
    const formatted = `${mm}-${dd}-${yy}`;
    return formatted;
  };
  const handleAccept = async () => {
    
  }
  const handleReject = async () => {

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
                    <Table.Cell>{application.status}</Table.Cell>
                    <Table.Cell className="rounded-xs flex items-center gap-2">
                      {application.status === "pending" && (
                        <>
                          <Button className="rounded-sm bg-green-500 hover:bg-green-700"
                            onClick={() =>
                              handleAccept(application.applicationId)
                            }
                          >
                            Accept
                          </Button>

                          <Button className="rounded-sm bg-red-500 hover:bg-red-700"
                            onClick={() =>
                              handleReject(application.applicationId)
                            }
                          >
                            Reject
                          </Button>
                        </>
                      )}

                      {application.status === "accepted" && (
                        <Button className="rounded-sm bg-red-500 hover:bg-red-700"
                          onClick={() =>
                            handleReject(application.applicationId)
                          }
                        >
                          Reject
                        </Button>
                      )}

                      {application.status === "rejected" && (
                        <Button className="rounded-sm bg-green-500 hover:bg-green-700"
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
