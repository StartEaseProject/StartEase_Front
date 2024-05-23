import { Link, matchPath, useLocation } from "react-router-dom";
import { routes } from "../../routes";

const Breadcrumbs = () => {
  const location = useLocation();
  const paths = Object.values(routes);
  const crumbs = location.pathname
    .split("/")
    .filter((crumb) => crumb !== ``)
    .reduce((acc, curr) => {
      const prev = acc.length ? acc[acc.length - 1] : "";
      acc.push(`${prev}/${curr}`);
      return acc;
    }, [])
    .map((crumb, index) => {
      return (
         paths.find((route) => matchPath(route.path, crumb)).breadcrumbs && (
          <Link
            key={crumb}
            to={crumb}
            className={`text-fs-300 capitalize font-medium text-thirdColor before:content-['>'] 
            before:mr-[10px] first:before:hidden before:text-thirdColor
          last:text-secondaryColor ${index != 0 && "ml-[10px]"}`}
          >
            {paths.find((route) => matchPath(route.path, crumb)).breadcrumbs}
          </Link>
        )
      );
    });

  return (
    <div className={`flex items-center pl-[30px] pb-[30px]`}>{crumbs}</div>
  );
};

export default Breadcrumbs;
