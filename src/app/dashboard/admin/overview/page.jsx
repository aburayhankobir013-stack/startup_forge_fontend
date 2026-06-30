import AdminOverview from "@/components/adminOverview/AdminOverview";
import axios from "axios";



export default async function AdminOverviewPage() {
  const baseURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;
  const response = await axios.get(`${baseURL}/api/admin/overview`);
  const overview = response.data.data;
  return (
    <AdminOverview overview = {overview} />
  );
}