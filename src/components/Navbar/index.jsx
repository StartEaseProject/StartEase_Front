import MainMenu from "./MainMenu";
import SettingsMenu from "./SettingsMenu";
import logo from "../../assets/Navbar/logo-small.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate()

  return (
    <nav className="bg-bgColor py-10 pl-7 w-[17.5rem] shrink-0 min-h-screen">
      <div onClick={()=>{
        navigate('/')
      }} className="hover:cursor-pointer hover:scale-105 transition-all duration-700 inline-flex gap-4 items-center mb-11">
        <img src={logo} alt="" />
        <h1 className="  text-fs-500 font-extrabold text-secondaryColor">
          StartEase
        </h1>
      </div>
      <div className="space-y-11">
        <MainMenu title="main menu" />
        <SettingsMenu title="settings" />
      </div>
    </nav>
  );
};

export default Navbar;
