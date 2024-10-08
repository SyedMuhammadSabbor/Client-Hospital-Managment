import { useEffect, useState } from "react";
import { SamplePatients } from "../../sampleData/samplePatients";
import Loader from "../../Components/loader";
import FormInput from "../../Components/formInput";
import { SampleDoctors } from "../../sampleData/sampleDoctors";
import { SampleAppintments } from "../../sampleData/sampleAppointments";
import Button from "../../Components/button";
import { useNavigate } from "react-router-dom";
import { sendNotification } from "../../Components/utils/sendNotification";

const sampleUser = SamplePatients[0];

const todayDate = new Date().setUTCHours(0, 0, 0, 0);
const minDate = new Date(todayDate + 1 * 24 * 60 * 60 * 1000)
  .toISOString()
  .slice(0, 10); // Tomorrows's date in YYYY-MM-DD format
const maxDate = new Date(todayDate + 7 * 24 * 60 * 60 * 1000)
  .toISOString()
  .slice(0, 10); // 7 days from tomorrow

export default function NewAppointment({ viewRole = "patient" }) {
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
  const [selectedDateSchedule, setSelectedDateSchedule] = useState({});

  const navigate = useNavigate();

  const makeDataRequest = () => {
    setIsLaoding(true);
    setTimeout(() => {
      // base on view rol
      // if view role is admin, then admin must provide patient name and id
      // if view role is patiet, get pateint data from token
      if (viewRole == "patient") {
        //
        setUserDetails(sampleUser);
        setNewAppointmentDetails((prev) => ({
          ...prev,
          patientName: sampleUser.name,
          patientId: sampleUser.id,
        }));
      }

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

  const makeselectedDateScheduleDataRequest = (selectedDate) => {
    let tempSchedule = selectedDoctor.schedule.find(
      (scheduleItem) =>
        scheduleItem.day.start > selectedDate &&
        scheduleItem.day.end <= selectedDate
    );
    if (!tempSchedule) {
      const tempDoctorIndex = SampleDoctors.findIndex(
        (doctorItem) => doctorItem.id == selectedDoctor.id
      );

      const tempStartDate = new Date().setUTCHours(0, 0, 0, 0);
      const tempEndDate = tempStartDate + 1 * 24 * 60 * 60 * 1000; // 1 day ahead
      // create new schdule
      tempSchedule = {
        day: {
          start: tempStartDate,
          end: tempEndDate,
        },
        currentAppointments: 0,
        appointedHours: [],
      };
      selectedDoctor.schedule.push(tempSchedule);
      SampleDoctors[tempDoctorIndex] = selectedDoctor;
    }
    console.log("selected doctor: ", selectedDoctor);
    console.log("tempSchedule: ", tempSchedule);
    setSelectedDateSchedule(tempSchedule);
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

  const handlePateintIdChange = (e) => {
    setNewAppointmentDetails((prev) => ({
      ...prev,
      patientId: e.target.value,
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

  const handleAppointmentDateChange = (e) => {
    const tempDate = new Date(e.target.value).getTime();
    console.log("date: ", tempDate);
    makeselectedDateScheduleDataRequest(tempDate);
    setNewAppointmentDetails((prev) => ({ ...prev, dated: tempDate }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // update doctor time table
    const tempDoctor = SampleDoctors.find(
      (doctorItem) => doctorItem.id == newAppointmentDetails.doctorId
    );

    const scheduleToUpdate = tempDoctor.schedule.find(
      (schduleItem) =>
        schduleItem.day.start > newAppointmentDetails.dated &&
        schduleItem.day.end <= newAppointmentDetails.dated
    );

    const doctorIndex = SampleDoctors.findIndex(
      (doctorItem) => doctorItem.id == selectedDoctor.id
    );
    SampleDoctors[doctorIndex] = tempDoctor;

    // update user appointments table
    SampleAppintments.unshift({
      id: SampleAppintments.length,
      ...newAppointmentDetails,
    });

    // update user notification
    console.log("doctor id: ", newAppointmentDetails.doctorId);
    const message =
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
    sendNotification(
      userDetails.id,
      newAppointmentDetails.doctorId,
      userDetails.name,
      "new appointment",
      message
    );

    // navigate to home page
    switch (viewRole) {
      case "patient":
        navigate("/patient/appointments");
        break;
      case "admin":
        navigate("/patient/appointments");
        break;
      default:
        navigate("/");
    }
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
                <p className="text-sm text-textColor">Patient Id</p>
                <FormInput
                  id="patient-id"
                  name="patient-id"
                  type="text"
                  required={true}
                  placeholder="Patient Id"
                  value={newAppointmentDetails.patientId}
                  handleChange={handlePateintIdChange}
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
                <p className="text-sm text-textColor">Date </p>
                {newAppointmentDetails.doctorName == "" ? (
                  "Please seleact a doctor first"
                ) : (
                  <input
                    type="date"
                    name="dated"
                    id="dated"
                    min={minDate}
                    max={maxDate}
                    onChange={handleAppointmentDateChange}
                    required
                    className="w-full bg-white  text-textColor my-1 p-1 border-designColor2 border rounded focus:outline-none focus:border-textColor"
                  />
                )}
              </label>

              <label>
                <p className="text-sm text-textColor">Time </p>
                {newAppointmentDetails.dated == 0 ? (
                  "Please select a Date first"
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
                          value={selectedDateSchedule.day.start + index}
                          disabled={selectedDateSchedule.appointedHours.includes(
                            index
                          )}
                          className={`${
                            selectedDateSchedule.appointedHours.includes(index)
                              ? "text-red-800 font-semibold text-sm"
                              : "text-textColor "
                          }`}
                        >
                          {selectedDateSchedule.day.start + index > 12
                            ? `${
                                (selectedDateSchedule.day.start + index) % 12
                              } P.M`
                            : `${selectedDateSchedule.day.start + index} A.M`}
                          {" - "}
                          {selectedDateSchedule.appointedHours.includes(index)
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
