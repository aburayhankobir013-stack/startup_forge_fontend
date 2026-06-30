import AdminManageUsers from "@/components/adminManageUsers/AdminManageUsers";
import axios from "axios";


export default async function AdminManageUsersPage () {
  const baseURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;
  const response = await axios.get(`${baseURL}/api/admin/manage_users`);
  const users = response.data.data;
  return (
    <AdminManageUsers users = {users} />
  );
}