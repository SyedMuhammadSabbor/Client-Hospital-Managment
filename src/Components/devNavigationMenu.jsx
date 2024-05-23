import MenuItem from "./menuItem";

export default function DevNavigationMenu() {
  return (
    <div className="bg-pink-400 fixed top-0 mt-4 flex w-full justify-center">
    <div  className="w-[40%] flex justify-center space-x-2">
    <MenuItem linkText={"Admin"} linkPath={"/admin"} />
      <MenuItem linkText={"Doctor"} linkPath={"/doctor"} />
      <MenuItem linkText={"Patient"} linkPath={"/patient"} />
    </div>
    </div>
  );
}
