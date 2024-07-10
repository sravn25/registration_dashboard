import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <div className="bg-slate-50">
      <div className="flex flex-col items-center h-screen w-1/2 py-16 gap-8 mx-auto">
        <h1 className="text-4xl font-extrabold text-center">
          Welcome to Orientation Party
          <strong className="font-extrabold block bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Registration Counter
          </strong>
        </h1>
        <p className="text-center text-gray-500 w-96">
          Registration credentials are to be provided by the PM/APMs. Should you
          require any assistant, please contact the PM/APMs.
        </p>
        <div className="flex justify-center items-center p-8 border rounded-lg shadow-md hover:border-blue-500 hover:shadow-xl">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
