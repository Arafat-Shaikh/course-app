import { useRecoilState } from "recoil";
import Course from "../components/Course";
import Navbar from "../components/Navbar";
import { Navigate } from "react-router-dom";
import userAtom from "../atoms/userAtom";

export const CoursePage = () => {
  const [loggedInUser, setLoggedInUser] = useRecoilState(userAtom);

  return (
    <>
      {!loggedInUser.email && <Navigate to={"/login"} replace={true} />}
      {!loggedInUser.isAdmin && <Navigate to={"/lectures"} replace={true} />}

      <Navbar />
      <Course />
    </>
  );
};
