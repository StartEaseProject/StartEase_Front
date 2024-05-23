import { Input, Button, DateInput } from "../../components/Globals";
import DropDownMenu from "../../components/Globals/DropDownMenu";
import { useState } from "react";
import EditProfilePic from "./EditProfilePicture";
import { ErrorToast } from "../../components/Globals/toasts";

const StudentInfoPage = ({
  advance,
  user,
  establishment,
  filieres,
  spec,
  handleUser,
}) => {
  const [change, setChange] = useState(false);
  const currentDate = new Date();
  const [error, setError] = useState("");
  const [est, setEst] = useState(
    establishment[user.establishment_id - 1]?.name
  );
  const [f, setF] = useState(filieres[user.filiere_id - 1]?.name);
  const [s, setS] = useState(spec[user.speciality_id - 1]?.name);
  const [bac, setBac] = useState(
    user.num_inscription ? user.num_inscription : ""
  );
  const [firstname, setFirst] = useState(
    user.first_name ? user.first_name : ""
  );
  const [lastname, setLast] = useState(user.last_name ? user.last_name : "");
  const [userName, setUser] = useState(user.last_name ? user.last_name : "");
  const [birthPlace, setBirthPlace] = useState(
    user.birth_place ? user.birth_place : ""
  );
  const [birthDay, setBirthDay] = useState(
    user.birthday ? new Date(user.birthday) : ""
  );
  const [image, setImage] = useState(user.image);
  const handleImage = (value) => setImage(value);
  const handleChangeDate = (date) => {
    setBirthDay(date);
  };
  function handleNext() {
    setError("");
    let err = false;
    if (userName.length < 3) {
      setError("User name can't be less than 3 characters");
      err = true;
    }
    if (firstname.length < 3) {
      setError("First name  can't be less than 3 characters");
      err = true;
    }
    if (lastname.length < 3) {
      setError("Last name  can't be less than 3 characters");
      err = true;
    }
    if (birthPlace.length < 3) {
      setError("Birth place can't be less than 3 characters");
      err = true;
    }
    if (!birthDay) {
      setError("Please enter your birthday");
      err = true;
    }
    if (bac.length < 5) {
      setError("Please enter your registration number");
      err = true;
    }
    if (!est) {
      setError("Please select your establishment");
      err = true;
    }
    if (!f) {
      setError("Please select your filiere");
      err = true;
    }
    if (!s) {
      setError("Please select your speciality");
      err = true;
    }
    if (!err) {
      const new_user = {
        username: userName,
        first_name: firstname,
        last_name: lastname,
        birth_place: birthPlace,
        birthday: birthDay
          .toLocaleDateString("en-CA", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })
          .replace(/\//g, "-"),
        num_inscription: bac,
        establishment_id:
          establishment[establishment.findIndex((item) => item.name === est)]
            .id,
        filiere_id: filieres[filieres.findIndex((item) => item.name === f)].id,
        speciality_id: spec[spec.findIndex((item) => item.name === s)].id,
        image: image,
      };
      handleUser({ ...user, ...new_user });
      advance();
    }
  }
  const handleSpec = (value) => {
    setChange(false);
    setS(value);
  };
  const handleEsta = (value) => setEst(value);
  const handleFil = (value) => {
    setChange(true);
    setF(value);
  };

  return (
    <>
      {error && <ErrorToast message={error} />}
      <div className="px-[4rem] py-[3.5rem]">
        <div className="mb-[2.6rem]">
          <div>
            <h3 className="text-fs-400 text-secondaryColor mb-[0.4rem]">
              Personal informations
            </h3>
            <p className="text-fs-300 text-thirdColor">
              Please fill in the rest of informations in order to complete your
              registration
            </p>
          </div>
        </div>
        <EditProfilePic
          className="mb-[2.5rem]"
          action="Add a profile piicture"
          user={user}
          handleImage={handleImage}
          image={user.image}
        />

        <form
          className="grid grid-cols-2 gap-x-[5.5rem] gap-y-[0.8rem] max-w-[51rem]"
          onSubmit={(e) => {
            e.preventDefault();
            handleNext();
          }}
        >
          <Input
            onChange={(e) => {
              setUser(e.target.value);
            }}
            label={"Username"}
            icon="profile-1"
            inputProps={{
              placeholder: "user name",
              defaultValue: user.username,
            }}
            className={`max-w-[22.7rem] order-1`}
          />
          <Input
            onChange={(e) => {
              setFirst(e.target.value);
            }}
            label={"First Name"}
            icon="profile-1"
            inputProps={{
              placeholder: "First name",
              defaultValue: user.first_name,
            }}
            className={`max-w-[22.7rem] order-3`}
          />
          <Input
            onChange={(e) => {
              setLast(e.target.value);
            }}
            label={"Last Name"}
            icon="profile-1"
            inputProps={{
              placeholder: "Last name",
              defaultValue: user.last_name,
            }}
            className={`max-w-[22.7rem] order-5 `}
          />
          <Input
            onChange={(e) => {
              setBirthPlace(e.target.value);
            }}
            label={"Birth place"}
            icon="tag-user"
            inputProps={{
              placeholder: "Enter your birth place",
              defaultValue: user.birth_place,
            }}
            className={`max-w-[22.7rem] order-7`}
          />

          <DateInput
            max={
              new Date(
                currentDate.getFullYear() - 18,
                currentDate.getMonth(),
                currentDate.getDate()
              )
            }
            value={birthDay}
            label={"Birthday"}
            icon="calendar"
            handleChange={handleChangeDate}
          />
          <Input
            onChange={(e) => {
              setBac(e.target.value);
            }}
            label={"Registration Number"}
            icon="id"
            inputProps={{
              placeholder: "Registration number",
              defaultValue: user.num_inscription,
            }}
            className={`max-w-[22.7rem] order-2`}
          />

          <div className="order-4">
            <DropDownMenu
              icon={"house"}
              iconColor={"stroke-thirdColor"}
              label={"Establishment"}
              title={
                establishment[user.establishment_id - 1]?.name
                  ? establishment[user.establishment_id - 1].name
                  : "Select your establishment"
              }
              list={establishment.map((e) => e.name)}
              isEdit={true}
              handleChange={handleEsta}
            />
          </div>

          <div className="order-6">
            <DropDownMenu
              icon={"book-saved"}
              iconColor={"stroke-thirdColor"}
              label={
                filieres[user.filiere_id - 1]?.name
                  ? filieres[user.filiere_id - 1].name
                  : "Filiere"
              }
              title={"Select your filiere"}
              list={filieres.map((e) => e.name)}
              isEdit={true}
              handleChange={handleFil}
            />
          </div>

          <div className="order-8">
            <DropDownMenu
              isSpec={change}
              icon={"book-square"}
              iconColor={"stroke-thirdColor"}
              label={"Speciality"}
              title={
                spec[user.speciality_id - 1]?.name
                  ? spec[user.speciality_id - 1].name
                  : "Select your speciality"
              }
              list={
                f
                  ? spec
                      .filter((obj) => obj.type === "student")
                      .filter((e) => {
                        return (
                          e.filiere_id ===
                          filieres.find((filiere) => {
                            return filiere.name === f;
                          }).id
                        );
                      })
                      .map((e) => e.name)
                  : []
              }
              isEdit={true}
              handleChange={handleSpec}
            />
          </div>

          <Button className={`max-w-[22.7rem] mt-[1.75rem] order-10`}>
            Next
          </Button>
        </form>
      </div>
    </>
  );
};

export default StudentInfoPage;
