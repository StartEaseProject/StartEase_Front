import { useState } from "react";
import { useEffect } from "react";
import {
  ErrorToast,
  SuccessToast,
  LoadingToast,
} from "../../components/Globals/toasts";
import {
  Button,
  DropDownMenu,
  Input,
  Timeline,
} from "../../components/Globals";
import API from "../../utils/api-client";
import Description from "../../components/RolesManagement/CreateRolePage/Description";
import useRedirect from "../../useRedirect";
import { routes } from "../../routes";

const CreateUserPage = () => {
  const redirect = useRedirect(routes.USERS.path)
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [user, setUser] = useState({});
  const [establishments, setEstablishments] = useState([]);

  const handleChangeEstb = (name) => {
    setUser((u) => ({
      ...u,
      establishment_id: establishments.find((e) => e.name === name).id,
    }));
  };
  const handleChangeType = (type) => {
    setUser((u) => ({
      ...u,
      person_type: type,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(null);
    setError(null);
    setLoading(true);
    try {
      const res = await API.post("/users", user);
      setSuccess(res.data.message);
      redirect()
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchEstb = async () => {
    try {
      const res = await API.get("/establishments");
      setEstablishments(res.data.data.establishments);
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  useEffect(() => {
    fetchEstb();
  }, []);
  return (
    <>
      {success && <SuccessToast message={success} />}
      {error && <ErrorToast message={error} />}
      {loading && <LoadingToast />}
      <section className="mt-7 px-layout">
        <Description
          title={"Create new user"}
          description={
            "In order to create an account for scientific committee member, incubator president, headmaster and internship service, you must provide his email and his role. A link will be sent to the email in order for the user to complete his registration. Please fill in the form carefully"
          }
        />
        <form
          className="max-w-[22.5rem] flex flex-col gap-8 py-8"
          onSubmit={handleSubmit}
        >
          <Input
            icon={"email"}
            label={"Email"}
            inputProps={{
              placeholder: "new@example.com",
              onChange: (e) => {
                setUser((u) => ({ ...u, email: e.target.value }));
              },
            }}
          />
          <DropDownMenu
            icon={"profile"}
            iconColor={"stroke-thirdColor"}
            handleChange={handleChangeType}
            list={[
              "scientific committee member",
              "internship service member",
              "headmaster",
            ]}
            isEdit={true}
            label={"Role"}
            title={"Select the Role"}
          />
          <DropDownMenu
            icon={"house"}
            iconColor={"stroke-thirdColor"}
            isEdit={true}
            handleChange={handleChangeEstb}
            list={establishments.map((e) => e.name)}
            label={"Establishment"}
            title={"Select the establishment"}
          />
          <Button className="font-semibold">Submit</Button>
        </form>
      </section>
    </>
  );
};

export default CreateUserPage;
