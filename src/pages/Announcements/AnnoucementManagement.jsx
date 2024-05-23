import { NavCard } from "../../components/Globals";


const AnnoucementManagement = () => {
  return (
    <>
      <section className="px-layout pb-8">
        <div>
          <div className="text-fs-400 text-thirdColor py-6">
            Annoucement management
          </div>

          <div className="pt-4 grid gap-6 max-w-[27.5rem]">
            <NavCard
              text={"My annoucement"}
              icon={"monitor"}
              link={`my-announcements`}
            />
            <NavCard
              text={"Add annoucement"}
              icon={"monitor"}
              link={`add-announcement`}
            />
  
          </div>
        </div>
      </section>
    </>
  );
};

export default AnnoucementManagement;
