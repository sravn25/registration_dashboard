import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "@/components/Navbar";
import RegisterSheet from "@/components/RegisterSheet";
import TicketTable from "@/components/TicketTable";

export default function Home() {
  return (
    <ProtectedRoute>
      <Navbar />
      <RegisterSheet />
      <TicketTable />
    </ProtectedRoute>
  );
}
