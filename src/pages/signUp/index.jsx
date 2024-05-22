import { useEffect, useState } from "react";
import FormInput from "../../Components/formInput";
import Button from "../../Components/button";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const initialDetails = {
  name: "",
  email: "",
  password: "",
  role: "",
};

const Signup = () => {
  const [formData, setFormData] = useState(initialDetails);
  const naviagte = useNavigate();

  // getting user state from location state
  // no location state is set if we visit url directly
  const locationState = useLocation().state;

  // validating the presence of any role
  useEffect(() => {
    if (locationState && locationState.userRole) {
      setFormData((prev) => ({ ...prev, role: locationState.userRole }));
    } else {
      naviagte("/get-started", {});
    }
  }, [naviagte, locationState]);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("details:", formData);
    setFormData(initialDetails);
    // handle form submission
  };

  return (
    <main className="min-h-screen  flex items-center justify-center bg-primary">
      <div className="w-[70%] space-y-8 px-8 py-10 bg-white rounded-md sm:w-[60%] md:w-[50%] lg:w-[40%] xl:w-[35%]">
        <div>
          <h2 className="mt-6 text-center text-xl font-semibold text-textColor">
            Sign up
          </h2>
        </div>
        <form
          className="mt-8 space-y-2 w-full flex flex-col"
          onSubmit={onSubmit}
        >
          <label>
            <p className="text-sm text-textColor">Name</p>
            <FormInput
              id="name"
              name="name"
              type="text"
              required={true}
              placeholder="Name"
              value={formData.name}
              handleChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </label>
          <label>
            <p className="text-sm text-textColor">Email</p>
            <FormInput
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required={true}
              placeholder="Email address"
              value={formData.email}
              handleChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </label>
          <label>
            <p className="text-sm text-textColor">Password</p>

            <FormInput
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required={true}
              placeholder="Password"
              value={formData.password}
              handleChange={(e) =>
                setFormData((prev) => ({ ...prev, password: e.target.value }))
              }
            />
          </label>

          <div className="  flex flex-col justify-center gap-1 text-xs text-textColor">
            <p>
              Already have an account?{" "}
              <a
                href="/get-started/login"
                className="font-semibold underline hover:scale-95"
              >
                Login
              </a>
            </p>
          </div>

          <Button type="submit" text="Sign up" />
        </form>
      </div>
    </main>
  );
};

export default Signup;
