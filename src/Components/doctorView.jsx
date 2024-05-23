import { useState, useEffect } from "react";
import USER_PROFILE from "/user-regular.png";
import { SampleDoctors } from "../sampleData/sampleDoctors";
import Loader from "./loader";
import Button from "./button";
import { useNavigate, useParams } from "react-router-dom";
import PateintNotFoundPage from "../pages/patient/not-found";
import NotFound from "../pages/not-found";

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
    tempDoctor.status = "pending";
    SampleDoctors[tempDoctorIndex] = tempDoctor;

    // send notification
    
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
        return <PateintNotFoundPage />;
      default:
        <NotFound />;
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
              {doctorDetails.status == "pending" && <Button text={"approve"} />}
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
