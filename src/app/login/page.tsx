"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Page = () => {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [formData, setFormData] = useState({
    email: "deepak@gmail.com",
    password: "1234",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const onSubmit = async (e: any) => {
    e.preventDefault();

    setErrors({ email: "", password: "" });

    let valid = true;

    if (!formData.email) {
      setErrors((prevState) => ({
        ...prevState,
        email: "Email is required",
      }));
      valid = false;
    }

    if (!formData.password) {
      setErrors((prevState) => ({
        ...prevState,
        password: "Password is required",
      }));
      valid = false;
    }

    if (valid) {
      // Form data is valid, proceed with form submission
      const res = await signIn("credentials", {
        phone: formData.email,
        password: formData.password,

        redirect: false,
      });
      res?.ok &&
        router.push(
          callbackUrl(params.get("callbackUrl") || (pathname as string)) || "/"
        );
    }
  };
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full text-gray-600">
        <div className="text-center">
          <img src="/logo.png" width={100} className="mx-auto" />
          <div className="mt-5 space-y-2">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
              Log in to your account
            </h3>
          </div>
        </div>
        <form onSubmit={onSubmit} className="mt-8 space-y-5">
          <div>
            <label className="font-medium">Email/name</label>
            <input
              type="text"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>
          <div>
            <label className="font-medium">Password</label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password}</p>
            )}
          </div>
          <button className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
            Sign in
          </button>
        </form>
      </div>
    </main>
  );
};

export default Page;

function callbackUrl(url: string) {
  const segments = url.split("/");
  const routes = ["admin", "scanner"];
  for (const route of routes) {
    if (segments.includes(route)) {
      return `/${route}`;
    }
  }
}
