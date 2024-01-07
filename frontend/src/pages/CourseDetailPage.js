import { useRecoilState } from "recoil";
import CourseDetails from "../components/CourseDetails";
import Navbar from "../components/Navbar";
import userAtom from "../atoms/userAtom";
import { Navigate } from "react-router-dom";

const CourseDetailPage = () => {
  const [loggedInUser, setLoggedInUser] = useRecoilState(userAtom);
  return (
    <>
      {!loggedInUser.email && <Navigate to={"/login"} replace={true} />}
      {!loggedInUser.isAdmin && <Navigate to={"/lectures"} replace={true} />}
      <Navbar />
      <CourseDetails />
    </>
  );
};

export default CourseDetailPage;
