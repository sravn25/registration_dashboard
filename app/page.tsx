import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "@/components/Navbar";
import RegistrationManager from "@/components/RegistrationManager";

export default function Home() {
  return (
    <ProtectedRoute>
      <Navbar />
      <RegistrationManager />
    </ProtectedRoute>
  );
}
