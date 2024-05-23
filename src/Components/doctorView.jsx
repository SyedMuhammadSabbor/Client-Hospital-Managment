import { useState, useEffect } from "react";
import USER_PROFILE from "/user-regular.png";
import { SampleDoctors } from "../sampleData/sampleDoctors";
import Loader from "./loader";
import Button from "./button";
import { useNavigate, useParams } from "react-router-dom";
import NotFoundPage from "../pages/not-found";
import { sendNotification } from "./utils/sendNotification";

export default function DoctorView({ viewRole = "patient" }) {
  const params = useParams();
  const { doctorId } = params;
  const [doctorDetails, setDoctorDetails] = useState({});
  const [doctorDetailsFound, setDoctorDetailsFound] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const makeDataRequest = () => {
    setTimeout(() => {
      const temp = SampleDoctors.find((e) => e.id == doctorId);
      if (!temp) {
        setIsLoading(false);
        setDoctorDetailsFound(false);
        return;
      }
      console.log("temp: ", temp);
      const tempIndex = SampleDoctors.findIndex((e) => e.id == temp.id);
      SampleDoctors[tempIndex].viewed = true;

      setDoctorDetails(temp);
      setIsLoading(false);
      setDoctorDetailsFound(true);
    }, 2000);
  };

  const handleApproveDoctor = (doctorId) => {
    const tempDoctor = SampleDoctors.find(
      (doctorItem) => doctorItem.id == doctorDetails.id
    );
    const tempDoctorIndex = SampleDoctors.findIndex(
      (doctorItem) => doctorItem.id == doctorDetails.id
    );
    tempDoctor.status = "approved";
    SampleDoctors[tempDoctorIndex] = tempDoctor;

    // send notification of approval
    const message =
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
    sendNotification(
      0, // admin by default
      tempDoctor.id,
      viewRole,
      "approval of doctor",
      message
    );

    navigate(-1)
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    setIsLoading(true);
    makeDataRequest();
  }, [doctorId]);

  if (!doctorDetailsFound) {
    switch (viewRole) {
      case "patient":
        return <NotFoundPage redirectTo="/patient" />;
      case "admin":
        return <NotFoundPage redirectTo="/admin" />;
      default:
        <NotFoundPage redirectTo="/" />;
    }
  }
  return (
    <section className="w-full flex flex-col items-center">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full p-2 sm:w-[90%] md:w-[85%] lg:w-[80%] xl:w-[75%]">
          <div className="w-full text-center bg-primary py-4">
            <h3 className="font-semibold lg:text-lg">Doctor Details</h3>
          </div>

          <div className="w-full flex justify-center items-center mt-4 bg-primary p-4 text-textColor rounded text-sm lg:text-base">
            <div className="flex-[75%] ">
              <h2>
                Name:{" "}
                <span className="font-semibold">{doctorDetails.name}</span>
              </h2>
              <h2>
                Field:{" "}
                <span className="font-semibold">{doctorDetails.field}</span>
              </h2>
              <h2>
                Qualification:{" "}
                <span className="font-semibold">
                  {doctorDetails.qualification}
                </span>
              </h2>
              {doctorDetails.status == "pending" && (
                <Button
                  text={"approve"}
                  handleOnClick={() => handleApproveDoctor(doctorDetails.id)}
                />
              )}
            </div>
            <div className="flex-[25%] flex items-center justify-center">
              <img
                src={USER_PROFILE}
                alt="USER_PROFILE"
                className="w-full rounded-full border border-black p-1 sm:w-[90%] md:w-[85%] lg:w-[80%] xl:w-[75%]"
              />
            </div>
          </div>
          <div className="flex justify-center py-2">
            <p className="w-[90%] text-sm lg:text-base">
              <span className="font-semibold"> About:</span>{" "}
              <span>{doctorDetails.about}</span>
            </p>
          </div>
          <div className="w-full text-left mt-2 lg:mt-4">
            <Button text={"back"} handleOnClick={handleGoBack} />
          </div>
        </div>
      )}
    </section>
  );
}
