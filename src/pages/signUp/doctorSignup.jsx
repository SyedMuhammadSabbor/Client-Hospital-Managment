import { useEffect, useState } from "react";
import FormInput from "../../Components/formInput";
import Button from "../../Components/button";
import FormSelecetInput from "../../Components/formSelectInput";
import useErrorContext from "../../context/errorContext";
import Loader from "../../Components/loader";
import { SampleDoctors } from "../../sampleData/sampleDoctors";

const initialDoctorDetails = {
  name: "",
  email: "",
  cnic: "",
  age: 0,
  gender: "",
  field: "",
  qualification: "",
  maxAppointments: 0,
  appointmentHoursStart: -1,
  appointmentHoursEnd: -1,
  about: "",
  password: "",
  confirmPassword: "",
};

const EmailRegex = new RegExp(import.meta.env.VITE_EMAIL_REGEX);
const PasswordRegex = new RegExp(import.meta.env.VITE_PASSWORD_REGEX);

// signup and edit mode only
export default function DoctorSignUp({ formMode = "signup" }) {
  const [doctorDetails, setDoctorDetails] = useState({});
  const [isLoading, setIsLaoding] = useState(true);
  const [isSendingDetails, setIsSendingDetails] = useState(false);
  const { addError } = useErrorContext();

  const handleNameChange = (e) => {
    setDoctorDetails((prev) => ({ ...prev, name: e.target.value }));
  };

  const handleEmailChange = (e) => {
    setDoctorDetails((prev) => ({ ...prev, email: e.target.value }));
  };

  const handleCnicChange = (e) => {
    setDoctorDetails((prev) => ({ ...prev, cnic: e.target.value }));
  };

  const handleAgeChange = (e) => {
    setDoctorDetails((prev) => ({ ...prev, age: e.target.value }));
  };

  const handleGenderChange = (e) => {
    setDoctorDetails((prev) => ({ ...prev, gender: e.target.value }));
  };

  const handleFieldChange = (e) => {
    setDoctorDetails((prev) => ({ ...prev, field: e.target.value }));
  };

  const handleQualificationChange = (e) => {
    setDoctorDetails((prev) => ({ ...prev, qualification: e.target.value }));
  };

  const handleMaxAppointmentsChange = (e) => {
    // if appointment start time is not selected
    if (doctorDetails.appointmentHoursStart < 0) {
      setDoctorDetails((prev) => ({
        ...prev,
        maxAppointments: Number(e.target.value),
      }));
    } else {
      // if appointment start time is selected
      setDoctorDetails((prev) => ({
        ...prev,
        maxAppointments: Number(e.target.value),
        appointmentHoursEnd:
          prev.appointmentHoursStart + Number(e.target.value),
      }));
    }
  };

  const handleAppointmentHoursStartChange = (e) => {
    setDoctorDetails((prev) => ({
      ...prev,
      appointmentHoursStart: Number(e.target.value),
      appointmentHoursEnd: Number(e.target.value) + prev.maxAppointments,
    }));
  };

  const handleAboutChange = (e) => {
    setDoctorDetails((prev) => ({ ...prev, about: e.target.value }));
  };

  const handlePasswordChange = (e) => {
    setDoctorDetails((prev) => ({ ...prev, password: e.target.value }));
  };

  const handleConfirmPasswordChange = (e) => {
    setDoctorDetails((prev) => ({
      ...prev,
      confirmPassword: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // validate name length
    if (doctorDetails.name.length < 3 || doctorDetails.name.length > 30) {
      addError("Name must me of length greather than 3 and less than 30");
      return;
    }

    //validate email
    if (!EmailRegex.test(doctorDetails.email)) {
      addError("Email is not a valid email");
      return;
    }

    // validate cnic
    if (doctorDetails.cnic.length != 13) {
      addError("Invalid cnic, please remove '-' if included");
      return;
    }

    // validate age
    if (doctorDetails.age == 0) {
      addError("invalid  age");
      return;
    }

    // validate gender
    if (!["male", "female"].includes(doctorDetails.gender)) {
      addError("invalid gender selected");
      return;
    }

    // validate field
    if (doctorDetails.field.length < 3 || doctorDetails.field.length > 30) {
      addError("field name must be greater than 3 and less than 30");
      return;
    }

    // validate qualification
    if (
      doctorDetails.qualification.length < 3 ||
      doctorDetails.qualification.length > 30
    ) {
      addError(
        "quaalification degree's length must be greater than 3 and less than 30"
      );
      return;
    }

    // validate max appointments
    if (
      doctorDetails.maxAppointments <= 0 ||
      doctorDetails.maxAppointments > 5
    ) {
      addError("max appintments should be in range 1-5");
      return;
    }

    // validate start time
    if (
      24 - doctorDetails.maxAppointments <
      doctorDetails.appointmentHoursStart
    ) {
      addError(
        `appointment start time must b befor ${
          24 - doctorDetails.maxAppointments > 12
            ? `${(24 - doctorDetails.maxAppointments) % 12} P.M`
            : `${24 - doctorDetails.maxAppointments} A.m`
        }`
      );
      return;
    }

    // validate end time
    if (
      doctorDetails.appointmentHoursStart > doctorDetails.appointmentHoursEnd
    ) {
      addError("end time must be greather than start time");
      return;
    }

    // no about validation

    // password validation
    if (formMode == "signup") {
      if (doctorDetails.password != doctorDetails.confirmPassword) {
        addError("password and conform password do not match");
        return;
      }
      if (!PasswordRegex.test(doctorDetails.password)) {
        addError(
          "password must contain a low-case, a upper-case, a numeric and special letter"
        );
        return;
      }
    }

    setIsSendingDetails(true);
    console.log("Docotr details: ", doctorDetails);

    // base on formMode use different apis
    setTimeout(() => {
      // setDoctorDetails(initialDoctorDetails);
      setIsSendingDetails(false);
    }, 5000);
  };

  const makeDataRequest = async () => {
    // base on form mode set data
    setTimeout(() => {
      if (formMode == "signup") {
        setDoctorDetails(initialDoctorDetails);
      } else if (formMode == "edit") {
        // get data from srver using token
        // for now data is set to initia
        setDoctorDetails(SampleDoctors[0]);
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
              value={doctorDetails.name}
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
              value={doctorDetails.email}
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
              value={doctorDetails.cnic}
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
              value={doctorDetails.age}
              handleChange={handleAgeChange}
            />
          </label>

          <label>
            <p className="text-sm text-textColor">Gender</p>
            <FormSelecetInput
              handleOnChange={handleGenderChange}
              value={doctorDetails.gender}
              options={[
                { value: "male", text: "Male" },
                { value: "female", text: "Female" },
              ]}
            />
          </label>

          <label>
            <p className="text-sm text-textColor">Field</p>
            <FormInput
              id="field"
              name="field"
              type="text"
              autoComplete="field"
              required={true}
              placeholder="Field"
              value={doctorDetails.field}
              handleChange={handleFieldChange}
            />
          </label>

          <label>
            <p className="text-sm text-textColor">Qalification</p>
            <FormInput
              id="qualification"
              name="qualification"
              type="text"
              autoComplete="qualification"
              required={true}
              placeholder="Qualification"
              value={doctorDetails.qualification}
              handleChange={handleQualificationChange}
            />
          </label>

          <label>
            <p className="text-sm text-textColor">Max appointments</p>
            <FormInput
              id="max-appointments"
              name="max-appointments"
              type="number"
              autoComplete="max-appointments"
              required={true}
              placeholder="Max Appointments"
              value={doctorDetails.maxAppointments}
              handleChange={handleMaxAppointmentsChange}
              min={1}
              max={5}
            />
          </label>

          <label>
            <p className="text-sm text-textColor">Appointments start time</p>
            <FormSelecetInput
              value={doctorDetails.appointmentHoursStart}
              handleOnChange={handleAppointmentHoursStartChange}
              options={appointmentHoursData}
            />
          </label>

          <label>
            <p className="text-sm text-textColor">Appointments End time</p>
            <FormInput
              value={
                doctorDetails.appointmentHoursEnd == -1
                  ? 0
                  : doctorDetails.appointmentHoursEnd > 12
                  ? `${doctorDetails.appointmentHoursEnd % 12} P.M`
                  : `${doctorDetails.appointmentHoursEnd} A.M`
              }
              disabled={true}
            />
          </label>

          <label>
            <p className="text-sm text-textColor">About</p>
            <FormInput
              id="about"
              name="about"
              type="text"
              autoComplete="about"
              required={false}
              placeholder="About"
              value={doctorDetails.about}
              handleChange={handleAboutChange}
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
                  value={doctorDetails.password}
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
                  value={doctorDetails.confirmPassword}
                  handleChange={handleConfirmPasswordChange}
                />
                {doctorDetails.password != "" &&
                  doctorDetails.confirmPassword != "" &&
                  doctorDetails.password != doctorDetails.confirmPassword && (
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

const appointmentHoursData = [
  {
    value: 0,
    text: "12 A.M",
  },
  {
    value: 1,
    text: "1 A.M",
  },
  {
    value: 2,
    text: "2 A.M",
  },
  {
    value: 3,
    text: "3 A.M",
  },
  {
    value: 4,
    text: "4 A.M",
  },
  {
    value: 5,
    text: "5 A.M",
  },
  {
    value: 6,
    text: "6 A.M",
  },
  {
    value: 7,
    text: "7 A.M",
  },
  {
    value: 8,
    text: "8 A.M",
  },
  {
    value: 9,
    text: "9 A.M",
  },
  {
    value: 10,
    text: "10 A.M",
  },
  {
    value: 11,
    text: "11 A.M",
  },
  {
    value: 12,
    text: "12 P.M",
  },
  {
    value: 13,
    text: "1 P.M",
  },
  {
    value: 14,
    text: "2 P.M",
  },
  {
    value: 15,
    text: "3 P.M",
  },
  {
    value: 16,
    text: "4 P.M",
  },
  {
    value: 17,
    text: "5 P.M",
  },
  {
    value: 18,
    text: "6 P.M",
  },
  {
    value: 19,
    text: "7 P.M",
  },
  {
    value: 20,
    text: "8 P.M",
  },
  {
    value: 21,
    text: "9 P.M",
  },
  {
    value: 22,
    text: "10 P.M",
  },
  {
    value: 23,
    text: "11 P.M",
  },
];
