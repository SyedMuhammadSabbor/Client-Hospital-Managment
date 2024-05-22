import { Link, useNavigate } from "react-router-dom";

export default function RoleCards({ roleCardDetails }) {
  return (
    <div className="w-full flex flex-col items-center gap-2 p-2 sm:flex-row sm:justify-center ">
      {roleCardDetails.map((roleDetails, index) => (
        <div key={index} className="w-[65%] sm:w-[30%] ">
          <RoleCard
            roleText={roleDetails.roleText}
            imageSource={roleDetails.imageSource}
          />
        </div>
      ))}
    </div>
  );
}

function RoleCard({ imageSource, roleText }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/get-started/signup", { state: { userRole: roleText } });
  };

  return (
    <div
      onClick={handleClick}
      className="flex flex-col items-center bg-designColor1 text-textColor border border-designColor2 rounded  cursor-pointer active:scale-95 hover:border-2  "
    >
      <img
        src={imageSource}
        alt={imageSource}
        className="w-full sm:h-44 md:h-48 lg:h-52 xl:h-60 2xl:h-60 "
      />
      <p className="text-textColor sm:text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl capitalize">
        {roleText}
      </p>
    </div>
  );
}
