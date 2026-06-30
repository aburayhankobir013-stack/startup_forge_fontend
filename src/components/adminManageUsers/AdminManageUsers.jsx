"use client";
import { Avatar, Button, Table, toast } from "@heroui/react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AdminManageUsers({ users }) {
  const baseURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;
  const router = useRouter();
  const handleActive = async (userId) => {
    const response = await axios.patch(`${baseURL}/api/admin/update_user_status/${userId}`,
      {
        isBlocked: false,
      }
    );
    const data = response.data;
    if (data.success) {
      toast.success(data.message);
      router.push("/dashboard/admin/manage_users");
    } else {
      toast.success(data.message);
    }
  }
  const handleBlock = async (userId) => {
    const response = await axios.patch(`${baseURL}/api/admin/update_user_status/${userId}`,
      {
        isBlocked: true,
      }
    );
    const data = response.data;
    if (data.success) {
      toast.success(data.message);
      router.push("/dashboard/admin/manage_users");
    } else {
      toast.success(data.message);
    }
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
                Profile
              </Table.Column>
              <Table.Column className="text-white font-semibold text-base">
                Email Address
              </Table.Column>
              <Table.Column className="text-white font-semibold text-base">
                Role
              </Table.Column>
              <Table.Column className="text-white font-semibold text-base">
                Plan
              </Table.Column>
              <Table.Column className="text-white font-semibold text-base">
                Status
              </Table.Column>
              <Table.Column className="text-white font-semibold text-base">
                Action
              </Table.Column>
            </Table.Header>
            <Table.Body>
              {users.map((user) => {
                return (
                  <Table.Row
                    key={user._id}
                    className="cursor-pointer"
                  >
                    <Table.Cell className="rounded-xs">
                      <div className="w-fit flex flex-col gap-2 items-center">
                        <Avatar>
                        <Avatar.Image
                          alt={user.name}
                          src={user.image}
                        />
                        <Avatar.Fallback>{user.name.charAt(0)}</Avatar.Fallback>
                      </Avatar>
                      <p>{user.name}</p>
                      </div>
                    </Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell>
                      {user.role}
                    </Table.Cell>
                    <Table.Cell className="capitalize">
                     {user.plan}
                    </Table.Cell>
                    <Table.Cell>
                      {
                        user.isBlocked
                        ?
                        "Blocked"
                        :
                        "Active"
                      }
                    </Table.Cell>
                    <Table.Cell className="rounded-xs">
                      {
                        user.isBlocked
                        ?
                        (<Button onClick={() => handleActive(user._id)} variant="outline" className="rounded-sm bg-green-500 text-white font-bold hover:bg-green-700">Active</Button>)
                        :
                        (<Button onClick={() => handleBlock(user._id)} variant="outline" className="rounded-sm bg-red-500 text-white font-bold hover:bg-red-700">Block</Button>)
                      }
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
