import { useState, useEffect } from "react";
import USER_PROFILE from "/user-regular.png";
import { SampleDoctors } from "../sampleData/sampleDoctors";
import Loader from "../../../Components/loader";
import Button from "../../../Components/button";
import { useNavigate, useParams } from "react-router-dom";
import NotFound from "../not-found";

export default function DoctorView() {
  const params = useParams();
  const { doctorId } = params;

  const [doctorDetails, setDoctorDetails] = useState({});
  const [doctorDetailsFound, setDoctorDetailsFound] = useState(false);
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

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    setIsLoading(true);
    makeDataRequest();
  }, [doctorId]);

  //   First we will check whather the page is loading
  //  2nd Wheather the doctor has been found
  // if both condtions satified then we will render main content
  return (
    <section className="w-full flex flex-col items-center">
      {isLoading ? (
        <Loader />
      ) : !doctorDetailsFound ? (
        <NotFound />
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
