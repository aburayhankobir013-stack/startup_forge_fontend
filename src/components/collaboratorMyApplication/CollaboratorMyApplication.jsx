import { Table } from "@heroui/react";

export default function CollaboratorMyApplication({applications}) {
  const dateFormate = (createdAt) => {
    const date = new Date(createdAt);
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const yy = String(date.getFullYear()).slice(-2);
    const formatted = `${mm}-${dd}-${yy}`;
    return formatted;
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
                Startup Name
              </Table.Column>
              <Table.Column className="text-white font-semibold text-base">
                Opportunity Title
              </Table.Column>
              <Table.Column className="text-white font-semibold text-base">
                Applied at
              </Table.Column>
              <Table.Column className="text-white font-semibold text-base">
                Status
              </Table.Column>
            </Table.Header>
            <Table.Body>
              {applications.map((application) => {
                return (
                  <Table.Row
                    key={application._id}
                    className="cursor-pointer"
                  >
                    <Table.Cell className="rounded-xs">
                      {application.startup_name}
                    </Table.Cell>
                    <Table.Cell>{application.opportunity_name}</Table.Cell>
                    <Table.Cell>
                      {dateFormate(application.applied_at)}
                    </Table.Cell>
                    <Table.Cell className="capitalize rounded-xs">
                      {application.status}
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
