import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "@/components/Navbar";
import RegisterSheet from "@/components/RegisterSheet";

export default function Home() {
  return (
    <ProtectedRoute>
      <Navbar />
      <RegisterSheet />
      <main></main>
    </ProtectedRoute>
  );
}
