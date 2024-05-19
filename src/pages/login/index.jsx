import React, { useState } from "react";
import FormInput from "../../Components/formInput";
import Button from "../../Components/button";

const initialDetails = {
  email: "",
  password: "",
};

export default function LoginPage() {
  const [loginDetails, setLoginDetails] = useState(initialDetails);

  const handleSubmit = (e)=>{
    e.preventDefault();
    console.log("Login Details: ", loginDetails);
    setLoginDetails(initialDetails)
  }

  return (
    <main  className=" flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md px-8 py-10 align-center bg-white rounded-lg shadow-md">
      <h1  className="mt-6 text-center text-3xl font-extrabold text-textColor">Login </h1>
      <form action="#" onSubmit={handleSubmit} className="flex flex-col ">
        <label htmlFor="login_email">
          <p className="text-sm text-textColor mb-2">Email</p>
          <FormInput
            id="login_email"
            type="email"
            placeholder="Enter Email"
            value={loginDetails.email}
            handleChange={(e) =>
              setLoginDetails((prev) => ({ ...prev, email: e.target.value }))
            }
          />
        </label>
        <label htmlFor="login_password">
          <p className="text-sm text-textColor mb-2">Password</p>
          <FormInput
            id="login_password"
            type="password"
            placeholder="Enter Password"
            value={loginDetails.password}
            handleChange={(e) =>
              setLoginDetails((prev) => ({ ...prev, password: e.target.value }))
            }
          />
        </label>
        <div class="  flex items-center gap-1 justify-round">
        <div class="flex items-center">
          <input type="checkbox" name="remember" id="remember" className="w-4 h-4 rounded border-gray-300 focus:ring-1 focus:ring-blue-500"
          />
          <label for="remember" className="text-sm ml-2 text-textColor ">Remember Me</label>
        </div>
        <a href="#" class="text-sm text-blue-500 hover:underline">Forgot Password?</a>
      </div>

        <Button text="Login" type="submit"/>
      </form>
      </div>
    </main>
  );
}
