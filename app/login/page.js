"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Page() {
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [showpassword, setshowpassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSignIn = async (e) => {
    e.preventDefault();

    setLoading(true);
    if (email != "" && password != "") {
      try {
        const res = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (res.error) {
          alert("Email dan Password Salah!!!");
          setLoading(false);
          return;
        } else {
          router.push(`/admin`);
          setLoading(false);
        }
      } catch (error) {
        alert(error);
        setLoading(false);
      }
    } else {
      alert("Email and Password is null");
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="bg-slate-300 w-full h-screen ">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 "
          >
            Welcome To Login Page
          </a>
          <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="flex justify-center mb-12 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                Form Login
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSignIn}>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
                    placeholder="name@company.com"
                    required={true}
                    onChange={(e) => {
                      setemail(e.target.value);
                    }}
                    autoComplete="email"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    Password
                  </label>
                  <input
                    type={showpassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
                    required={true}
                    onChange={(e) => {
                      setpassword(e.target.value);
                    }}
                    autoComplete="password"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 "
                        onChange={(e) => {
                          setshowpassword(e.target.checked);
                        }}
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label className="text-gray-500 ">Show Password</label>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                  disabled={loading}
                >
                  {!loading ? "Sign in" : "Loading..."}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
