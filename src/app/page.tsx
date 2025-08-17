"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "./store/auth";

export default function HomePage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Login failed");
        return;
      }

      dispatch(setUser(data.user));
      router.push("/dashboard");
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-white flex items-center justify-center'>
      <div className='max-w-md w-full space-y-8 p-8'>
        <div className='text-center'>
          <h1 className='text-4xl font-bold text-black mb-2'>WELCOME!</h1>
          <p className='text-gray-600'>Please sign in to your account</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className='space-y-6'>
          <div>
            <div className='relative'>
              <input
                type='text'
                placeholder='USERNAME'
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                className='w-full px-4 py-3 border border-blue-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                required
              />
            </div>
          </div>

          <div>
            <div className='relative'>
              <input
                type='password'
                placeholder='PASSWORD'
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className='w-full px-4 py-3 border border-blue-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                required
              />
            </div>
          </div>

          {error && (
            <div className='text-red-500 text-sm text-center'>{error}</div>
          )}

          <button
            type='submit'
            disabled={loading}
            className='w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'>
            {loading ? "Signing in..." : "LOGIN"}
          </button>
        </form>
      </div>
    </div>
  );
}
