// app/routes/RegisterForm.tsx (or wherever you define your routes)
import { Form, Link } from "react-router-dom";

export default function LoginForm() {
  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <Form method="post" action="." className="space-y-4">
        <div>
          <label htmlFor="username" className="block mb-1 font-medium">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        {/* <div>
          <label htmlFor="email" className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            className="w-full border rounded px-3 py-2"
          />
        </div> */}
        <div>
          <label htmlFor="password" className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </Form>
      <Link to="/register" className="underline decoration-sky-500 my-50 block"> I do not have an account. </Link>
      <Link to="*" className="underline decoration-sky-500 my-50"> I forgot my password. </Link>
    </div>
  );
}
