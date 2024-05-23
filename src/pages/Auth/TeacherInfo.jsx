import {
  Input,
  Button,
  DropDownMenu,
  DateInput,
} from "../../components/Globals";
import { ErrorToast } from "../../components/Globals/toasts";
import EditProfilePic from "./EditProfilePicture";
import { useState } from "react";

const TeacherInfoPage = ({
  advance,
  user,
  establishment,
  grades,
  spec,
  handleUser,
}) => {
  const currentDate = new Date();
  const [error, setError] = useState("");
  const [est, setEst] = useState(
    establishment[user.establishment_id - 1]?.name
  );
  const [f, setF] = useState(grades[user.grade_id - 1]?.name);
  const [s, setS] = useState(spec[user.speciality_id - 1]?.name);
  const [bac, setBac] = useState(user.matricule ? user.matricule : "");
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
        birth_place: birthPlace,
        birthday: birthDay
          .toLocaleDateString("en-CA", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })
          .replace(/\//g, "-"),
        matricule: bac,
        establishment_id:
          establishment[establishment.findIndex((item) => item.name === est)]
            .id,
        grade_id: grades[grades.findIndex((item) => item.name === f)].id,
        speciality_id: spec[spec.findIndex((item) => item.name === s)].id,
        image: image,
      };
      handleUser({ ...user, ...new_user });
      advance();
    }
  }
  const handleSpec = (value) => setS(value);
  const handleEsta = (value) => setEst(value);
  const handleGrad = (value) => setF(value);

  return (
    <>
      {error && <ErrorToast message={error} />}
      <div className='px-[4rem] py-[3.5rem]'>
        <div className='mb-[2.6rem]'>
          <div>
            <h3 className='text-fs-400 text-secondaryColor mb-[0.4rem]'>
              Personal informations
            </h3>
            <p className='text-fs-300 text-thirdColor'>
              Please fill in the rest of informations in order to complete your
              registration
            </p>
          </div>
        </div>
        <EditProfilePic
          className='mb-[2.5rem]'
          action='Add a profile piicture'
          user={user}
          handleImage={handleImage}
          image={user.image}
        />

        <div className='flex  gap-[5.5rem]'>
          <div className='flex flex-col gap-[1rem]'>
            <Input
              label={'Username'}
              icon='profile-1'
              inputProps={{
                placeholder: 'user name',
                defaultValue: user.username,
              }}
              className={`max-w-[22.7rem]`}
              onChange={(e) => {
                setUser(e.target.value)
              }}
            />
            <Input
              label={'First Name'}
              icon='profile-1'
              inputProps={{
                placeholder: 'First name',
                defaultValue: user.first_name,
              }}
              className={`min-w-[22.7rem] `}
              onChange={(e) => {
                setFirst(e.target.value)
              }}
            />
            <Input
              label={'Last Name'}
              icon='profile-1'
              inputProps={{
                placeholder: 'Last name',
                defaultValue: user.last_name,
              }}
              className={`min-w-[22.7rem]  `}
              onChange={(e) => {
                setLast(e.target.value)
              }}
            />
            <Input
              label={'Birth place'}
              icon='tag-user'
              inputProps={{
                placeholder: 'Enter your birth place',
                defaultValue: user.birth_place,
              }}
              className={`max-w-[22.7rem]`}
              onChange={(e) => {
                console.log(e.target.value)
                setBirthPlace(e.target.value)
              }}
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
              label={'Birthday'}
              icon='calendar'
              handleChange={handleChangeDate}
            />
          </div>
          <div className='flex flex-col gap-[1rem]'>
            <Input
              label={'Matricule'}
              icon='id'
              inputProps={{
                placeholder: 'Matricule',
                defaultValue: user.matricule,
              }}
              className={`max-w-[22.7rem]`}
              onChange={(e) => {
                setBac(e.target.value)
              }}
            />
            <DropDownMenu
              icon={'house'}
              iconColor={'stroke-thirdColor'}
              label={'Establishment'}
              title={
                establishment[user.establishment_id - 1]?.name
                  ? establishment[user.establishment_id - 1].name
                  : 'Select your establishment'
              }
              list={establishment.map((e) => e.name)}
              isEdit={true}
              handleChange={handleEsta}
            />

            <DropDownMenu
              icon={'grade'}
              iconColor={'stroke-thirdColor'}
              label={'Grade'}
              title={
                grades[user.grade_id - 1]?.name
                  ? grades[user.grade_id - 1].name
                  : 'Select your grade'
              }
              list={grades
                .filter((obj) => obj.type === 'teacher')
                .map((e) => e.name)}
              isEdit={true}
              handleChange={handleGrad}
            />

            <DropDownMenu
              icon={'book-square'}
              iconColor={'stroke-thirdColor'}
              label={'Speciality'}
              title={
                spec[user.speciality_id - 1]?.name
                  ? spec[user.speciality_id - 1].name
                  : 'Select your speciality'
              }
              list={spec
                .filter((obj) => obj.type === 'teacher')
                .map((e) => e.name)}
              isEdit={true}
              handleChange={handleSpec}
            />
            <Button
              onClick={handleNext}
              className={`max-w-[22.7rem] mt-[1.75rem]`}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </>
  )
};

export default TeacherInfoPage;
