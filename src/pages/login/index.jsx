import { useState } from "react";
import FormInput from "../../Components/formInput";
import Button from "../../Components/button";

const initialDetails = {
  email: "",
  password: "",
};

export default function LoginPage() {
  const [loginDetails, setLoginDetails] = useState(initialDetails);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Details: ", loginDetails);
    setLoginDetails(initialDetails);
  };

  return (
    <main className=" flex items-center justify-center min-h-screen bg-primary">
      <div className="w-[70%] px-8 py-10 align-center bg-white rounded-md sm:w-[60%] md:w-[50%] lg:w-[40%] xl:w-[35%]">
        <h1 className="mt-6 text-center text-xl font-semibold text-textColor">
          Login{" "}
        </h1>
        <form
          action="#"
          onSubmit={handleSubmit}
          className="flex flex-col space-y-2 "
        >
          <label htmlFor="login_email">
            <p className="text-sm text-textColor">Email</p>
            <FormInput
              id="login_email"
              type="email"
              placeholder="Enter Email"
              value={loginDetails.email}
              required={true}
              handleChange={(e) =>
                setLoginDetails((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </label>
          <label htmlFor="login_password">
            <p className="text-sm text-textColor">Password</p>
            <FormInput
              id="login_password"
              type="password"
              placeholder="Enter Password"
              value={loginDetails.password}
              required={true}
              handleChange={(e) =>
                setLoginDetails((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
            />
          </label>
          <div className="  flex flex-col justify-center gap-1 text-xs text-textColor ">
            <p>
              Forgot password?{" "}
              <a href="#" className="font-semibold underline hover:scale-95">
                Reset
              </a>
            </p>
            <p>
              Do not have an account?{" "}
              <a
                href="/get-started/signup"
                className="font-semibold underline hover:scale-95"
              >
                Signup
              </a>
            </p>
          </div>

          <Button text="Login" type="submit" />
        </form>
      </div>
    </main>
  );
}
