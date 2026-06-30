import AdminManageStartup from "@/components/adminManageStartup/AdminManageStartup";
import axios from "axios";



export default async function AdminManageStartupsPage () {
  const baseURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;
  const response = await axios.get(`${baseURL}/api/admin/manage_startups`);
  const startups = response.data.data;
  return (
    <AdminManageStartup startups = {startups} />
  );
}