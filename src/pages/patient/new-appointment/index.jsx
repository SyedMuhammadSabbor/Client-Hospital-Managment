import { useEffect, useState } from "react";
import { SamplePatients } from "../../../sampleData/samplePatients";
import Loader from "../../../Components/loader";
import FormInput from "../../../Components/formInput";
import { SampleDoctors } from "../../../sampleData/sampleDoctors";
import { SampleAppintments } from "../../../sampleData/sampleAppointments";
import Button from "../../../Components/button";
import { SampleNotifications } from "../../../sampleData/sampleNotification";
import { useNavigate } from "react-router-dom";

const sampleUser = SamplePatients[0];

export default function NewAppointment() {
  const [userDetails, setUserDetails] = useState({});
  const [newAppointmentDetails, setNewAppointmentDetails] = useState({
    doctorId: 0,
    patientId: 0,
    doctorName: "",
    doctorField: "",
    patientName: "",
    dated: 0,
    hoursTime: 0,
    status: "pending",
    details: {
      pre: "",
      post: "",
    },
  });
  const [isLaoding, setIsLaoding] = useState(true);

  const [doctorFields, setDoctorFields] = useState([]);
  const [allDoctorsNameAndId, setAllDoctorsNameAndId] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState({});

  const navigate = useNavigate();

  const makeDataRequest = () => {
    setIsLaoding(true);
    setTimeout(() => {
      setUserDetails(sampleUser);
      setNewAppointmentDetails((prev) => ({
        ...prev,
        patientName: sampleUser.name,
        patientId: sampleUser.id,
      }));
      setIsLaoding(false);
    }, 1000);
  };

  const makeDoctorFieldsRequest = () => {
    const tempFields = SampleDoctors.map((doctor) => doctor.field);
    setDoctorFields(tempFields);
  };

  const makeAllDoctorsNameAndIdRequest = (fieldName) => {
    // it will be called when field is selected
    const tempDoctors = SampleDoctors.filter(
      (doctorItem) => doctorItem.field == fieldName
    );
    const tempDoctorNameAndId = tempDoctors.map((doctorItem) => ({
      name: doctorItem.name,
      id: doctorItem.id,
    }));
    setAllDoctorsNameAndId(tempDoctorNameAndId);
  };

  const makeDoctorDataRequest = (doctorId) => {
    // it will be called when doctor name is changed
    const doctor = SampleDoctors.find(
      (doctorItem) => doctorItem.id == doctorId
    );
    setSelectedDoctor(doctor);
  };

  useEffect(() => {
    makeDataRequest();
    makeDoctorFieldsRequest();
  }, []);

  const handlePateintNameChange = (e) => {
    setNewAppointmentDetails((prev) => ({
      ...prev,
      patientName: e.target.value,
    }));
  };

  const handleFieldChange = (e) => {
    const fieldName = e.target.value;
    setNewAppointmentDetails((prev) => ({
      ...prev,
      doctorField: fieldName,
    }));
    makeAllDoctorsNameAndIdRequest(fieldName);
  };

  const handleDoctorChange = (e) => {
    const doctorId = e.target.value;
    const doctorNameAndId = allDoctorsNameAndId.find(
      (doctorItem) => doctorItem.id == doctorId
    );
    setNewAppointmentDetails((prev) => ({
      ...prev,
      doctorName: doctorNameAndId.name,
      doctorId: doctorId,
    }));
    makeDoctorDataRequest(doctorId);
  };

  const handleAppointmentTime = (e) => {
    const choosenHour = e.target.value;
    setNewAppointmentDetails((prev) => ({
      ...prev,
      hoursTime: choosenHour,
      dated: Date.now(),
    }));
    // update doctor time table
    const tempAppointedHours = [...selectedDoctor.appointedHours]; // make a copy
    tempAppointedHours.push(
      choosenHour - selectedDoctor.appointmentHours.start
    );
    // const tempData = {...selectedDoctor};
    // tempData.currentAppointments++;
    // tempData.appointedHours.push(choosenHour - tempData.appointmentHours.start);
    console.log("Hello: ", tempAppointedHours);
  };

  const handlePreMessageChange = (e) => {
    setNewAppointmentDetails((prev) => ({
      ...prev,
      details: {
        pre: e.target.value,
        post: prev.details.post,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Appointment details: ", newAppointmentDetails);

    // update doctor time table
    selectedDoctor.currentAppointments++;
    selectedDoctor.appointedHours.push(
      newAppointmentDetails.hoursTime - selectedDoctor.appointmentHours.start
    );
    const doctorIndex = SampleDoctors.findIndex(
      (doctorItem) => doctorItem.id == selectedDoctor.id
    );
    SampleDoctors[doctorIndex] = selectedDoctor;

    // update user appointments table
    SampleAppintments.unshift({
      id: SampleAppintments.length,
      ...newAppointmentDetails,
    });

    // update user notification
    SampleNotifications.unshift({
      id: SampleNotifications.length,
      name: "Appointment letter",
      dated: 1716184560522,
      viewed: true,
      from: "Admin",
      message:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    });

    // navigate to home page
    navigate("/patient/appointments")
  };

  return (
    <section className="w-full flex flex-col ">
      <div className="w-full flex justify-center space-x-1 my-2  md:my-4 lg:my-6">
        <p className="text-textColor font-medium  md:text-lg lg:text-xl ">
          Book an Appointment
        </p>
      </div>

      <div className="mx-2 flex justify-center">
        {isLaoding ? (
          <div className="w-full flex justify-center">
            <Loader />
          </div>
        ) : (
          <div className="w-full p-2 sm:w-[90%] md:w-[85%] lg:w-[80%] xl:w-[75%]">
            <p className="w-full text-left border-b border-designColor2 text-textColor font-semibold my-2">
              Enter details:{" "}
            </p>

            <form
              action=""
              onSubmit={handleSubmit}
              className="flex flex-col space-y-2 md:space-y-3"
            >
              <label>
                <p className="text-sm text-textColor">Name</p>
                <FormInput
                  id="name"
                  name="name"
                  type="text"
                  required={true}
                  placeholder="Name"
                  value={newAppointmentDetails.patientName}
                  handleChange={handlePateintNameChange}
                />
              </label>

              <label>
                <p className="text-sm text-textColor">Problem Field</p>
                <select
                  onChange={handleFieldChange}
                  required
                  className="w-full bg-white  text-textColor my-1 p-1 border-designColor2 border rounded focus:outline-none focus:border-textColor"
                >
                  <option value="">none selected</option>
                  {doctorFields.map((field, index) => (
                    <option key={index} value={field}>
                      {field}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                <p className="text-sm text-textColor">Doctors</p>
                {newAppointmentDetails.doctorField == "" ? (
                  "Please choose a field first"
                ) : (
                  <select
                    onChange={handleDoctorChange}
                    required
                    className="w-full bg-white  text-textColor my-1 p-1 border-designColor2 border rounded focus:outline-none focus:border-textColor"
                  >
                    <option value="">none selected</option>
                    {allDoctorsNameAndId.map((field, index) => (
                      <option key={index} value={field.id}>
                        {field.name}
                      </option>
                    ))}
                  </select>
                )}
              </label>

              <label>
                <p className="text-sm text-textColor">Time </p>
                {newAppointmentDetails.doctorName == "" ? (
                  "Please select a doctor first"
                ) : (
                  <select
                    onChange={handleAppointmentTime}
                    required
                    className="w-full bg-white  text-textColor my-1 p-1 border-designColor2 border rounded focus:outline-none focus:border-textColor"
                  >
                    <option value="">none selected</option>
                    {[...Array(selectedDoctor.maxAppointments)].map(
                      (_, index) => (
                        <option
                          key={index}
                          value={selectedDoctor.appointmentHours.start + index}
                          disabled={selectedDoctor.appointedHours.includes(
                            index
                          )}
                          className={`${
                            selectedDoctor.appointedHours.includes(index)
                              ? "text-red-800 font-semibold text-sm"
                              : "text-textColor "
                          }`}
                        >
                          {selectedDoctor.appointmentHours.start + index > 12
                            ? `${
                                (selectedDoctor.appointmentHours.start +
                                  index) %
                                12
                              } P.M`
                            : `${
                                selectedDoctor.appointmentHours.start + index
                              } A.M`}
                          {" - "}
                          {selectedDoctor.appointedHours.includes(index)
                            ? "Booked"
                            : "Available"}
                        </option>
                      )
                    )}
                  </select>
                )}
              </label>

              <label htmlFor="pre-details">
                <p className="text-sm text-textColor">
                  Discuss Details (optional)
                </p>
                <textarea
                  className="w-full bg-white  text-textColor my-1 p-1 border-designColor2 border rounded focus:outline-none focus:border-textColor"
                  id="pre-details"
                  name="pre-details"
                  type="text"
                  placeholder="Name"
                  value={newAppointmentDetails.details.pre}
                  onChange={handlePreMessageChange}
                />
              </label>

              <Button type="submit" text={"submit for approval"} />
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
