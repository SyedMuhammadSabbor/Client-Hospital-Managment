import { useEffect, useState } from "react";
import FormInput from "../../Components/formInput";
import Button from "../../Components/button";
import FormSelecetInput from "../../Components/formSelectInput";
import useErrorContext from "../../context/errorContext";
import Loader from "../../Components/loader";
import { SamplePatients } from "../../sampleData/samplePatients";

const initialPatientDetails = {
  name: "",
  email: "",
  cnic: "",
  age: 0,
  gender: "",
  address: "",
  password: "",
  confirmPassword: "",
};

const EmailRegex = new RegExp(import.meta.env.VITE_EMAIL_REGEX);
const PasswordRegex = new RegExp(import.meta.env.VITE_PASSWORD_REGEX);

export default function PatientSignUp({ formMode = "signup" }) {
  const [patientDetails, setPatientDetails] = useState({});
  const [isLoading, setIsLaoding] = useState(true);
  const [isSendingDetails, setIsSendingDetails] = useState(false);
  const { addError } = useErrorContext();

  const handleNameChange = (e) => {
    setPatientDetails((prev) => ({ ...prev, name: e.target.value }));
  };

  const handleEmailChange = (e) => {
    setPatientDetails((prev) => ({ ...prev, email: e.target.value }));
  };

  const handleCnicChange = (e) => {
    setPatientDetails((prev) => ({ ...prev, cnic: e.target.value }));
  };

  const handleAgeChange = (e) => {
    setPatientDetails((prev) => ({ ...prev, age: e.target.value }));
  };

  const handleGenderChange = (e) => {
    setPatientDetails((prev) => ({ ...prev, gender: e.target.value }));
  };

  const handleAddressChange = (e) => {
    setPatientDetails((prev) => ({ ...prev, address: e.target.value }));
  };

  const handlePasswordChange = (e) => {
    setPatientDetails((prev) => ({ ...prev, password: e.target.value }));
  };

  const handleConfirmPasswordChange = (e) => {
    setPatientDetails((prev) => ({
      ...prev,
      confirmPassword: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // validate name length
    if (patientDetails.name.length < 3 || patientDetails.name.length > 30) {
      addError("Name must me of length greather than 3 and less than 30");
      return;
    }

    //validate email
    if (!EmailRegex.test(patientDetails.email)) {
      addError("Email is not a valid email");
      return;
    }

    // validate cnic
    if (patientDetails.cnic.length != 13) {
      addError("Invalid cnic, please remove '-' if included");
      return;
    }

    // validate age
    if (patientDetails.age == 0) {
      addError("invalid patient age");
      return;
    }

    // validate gender
    if (!["male", "female"].includes(patientDetails.gender)) {
      addError("invalid gender selected");
      return;
    }

    // no addess validation

    // password validation
    if (formMode == "signup") {
      if (patientDetails.password != patientDetails.confirmPassword) {
        addError("password and conform password do not match");
        return;
      }
      if (!PasswordRegex.test(patientDetails.password)) {
        addError(
          "password must contain a low-case, a upper-case, a numeric and special letter"
        );
        return;
      }
    }

    // send data to differnt apis based on formmMode
    setIsSendingDetails(true);
    console.log("Patient details: ", patientDetails);
    setTimeout(() => {
      // setPatientDetails(initialPatientDetails);

      setIsSendingDetails(false);
    }, 5000);
  };

  const makeDataRequest = async () => {
    // base on form mode set data
    setTimeout(() => {
      if (formMode == "signup") {
        setPatientDetails(initialPatientDetails);
      } else if (formMode == "edit") {
        // get data from srver using token
        // for now data is set to initia
        setPatientDetails(SamplePatients[0]);
      }
      setIsLaoding(false);
    }, 1000);
  };

  useEffect(() => {
    setIsLaoding(true);
    makeDataRequest();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
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
              value={patientDetails.name}
              handleChange={handleNameChange}
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
              value={patientDetails.email}
              handleChange={handleEmailChange}
            />
          </label>
          <label>
            <p className="text-sm text-textColor">Cnic</p>
            <FormInput
              id="cnic"
              name="cnic"
              type="text"
              autoComplete="cnic"
              required={true}
              placeholder="Cnic"
              value={patientDetails.cnic}
              handleChange={handleCnicChange}
            />
          </label>

          <label>
            <p className="text-sm text-textColor">Age</p>
            <FormInput
              id="age"
              name="age"
              type="number"
              autoComplete="age"
              required={true}
              placeholder="Age"
              value={patientDetails.age}
              handleChange={handleAgeChange}
            />
          </label>

          <label>
            <p className="text-sm text-textColor">Gender</p>
            <FormSelecetInput
              handleOnChange={handleGenderChange}
              value={patientDetails.gender}
              options={[
                { value: "male", text: "Male" },
                { value: "female", text: "Female" },
              ]}
            />
          </label>

          <label>
            <p className="text-sm text-textColor">Address</p>
            <FormInput
              id="address"
              name="address"
              type="text"
              autoComplete="adddress"
              required={false}
              placeholder="Address"
              value={patientDetails.address}
              handleChange={handleAddressChange}
            />
          </label>

          {formMode == "signup" && (
            <>
              <label>
                <p className="text-sm text-textColor">Password</p>
                <FormInput
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required={true}
                  placeholder="Password"
                  value={patientDetails.password}
                  handleChange={handlePasswordChange}
                />
              </label>

              <label>
                <p className="text-sm text-textColor">Confirm password</p>
                <FormInput
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  required={true}
                  placeholder="Confirm Password"
                  value={patientDetails.confirmPassword}
                  handleChange={handleConfirmPasswordChange}
                />
                {patientDetails.password != "" &&
                  patientDetails.confirmPassword != "" &&
                  patientDetails.password != patientDetails.confirmPassword && (
                    <p className="text-xs text-red-700">
                      password do not match
                    </p>
                  )}
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
            </>
          )}

          <Button
            type="submit"
            text={formMode == "signup" ? "Sign up" : "Update"}
            disabled={isSendingDetails}
          />
        </form>
      )}
    </>
  );
}
