import { Input, Button, Icon } from "../../components/Globals";
import DropDownMenu from "../../components/Globals/DropDownMenu";
import EditProfilePic from "./EditProfilePicture";
import { ErrorToast } from "../../components/Globals/toasts";
import { useState } from "react";

const CommitteInfoPage = ({ advance, user, spec, grade, handleUser }) => {
  const [error, setError] = useState("");

  const [f, setF] = useState(grade[user.grade_id - 1]?.name);
  const [s, setS] = useState(spec[user.speciality_id - 1]?.name);

  const [firstname, setFirst] = useState(
    user.first_name ? user.first_name : ""
  );
  const [lastname, setLast] = useState(user.last_name ? user.last_name : "");
  const [userName, setUser] = useState(user.last_name ? user.last_name : "");

  const [image, setImage] = useState(user.image);
  const handleImage = (value) => setImage(value);
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

    if (!f) {
      setError("Please select your grade");
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

        grade_id: grade[grade.findIndex((item) => item.name === f)].id,
        speciality_id: spec[spec.findIndex((item) => item.name === s)].id,
        image: image,
      };
      handleUser({ ...user, ...new_user });
      advance();
    }
  }
  const handleSpec = (value) => setS(value);
  const handleGrad = (value) => setF(value);

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

        <div className="grid grid-cols-2 gap-x-[5.5rem] gap-y-[0.8rem] max-w-[51rem]">
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
              placeholder: "First Name",
              defaultValue: user.first_name,
            }}
            className={`max-w-[22.7rem] order-2`}
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
            className={`max-w-[22.7rem] order-4`}
          />

          <div className="order-3">
            <DropDownMenu
              handleChange={handleGrad}
              icon={"grade"}
              iconColor={"stroke-thirdColor"}
              label={"Grade"}
              title={
                grade[user.grade_id - 1]?.name
                  ? grade[user.grade_id - 1].name
                  : "Select your grade"
              }
              list={grade
                .filter((obj) => obj.type === "scientific_committee_member")
                .map((e) => e.name)}
              isEdit={true}
            />
          </div>

          <div className="order-5">
            <DropDownMenu
              handleChange={handleSpec}
              icon={"book-square"}
              iconColor={"stroke-thirdColor"}
              label={"Speciality"}
              title={
                spec[user.speciality_id - 1]?.name
                  ? spec[user.speciality_id - 1].name
                  : "Select your speciality"
              }
              list={spec
                .filter((obj) => obj.type === "scientific_committee_member")
                .map((e) => e.name)}
              isEdit={true}
            />
          </div>

          <Button
            onClick={handleNext}
            className={`max-w-[22.7rem] mt-[1.75rem] order-6`}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
};

export default CommitteInfoPage;
