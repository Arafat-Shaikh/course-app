import { useRecoilState } from "recoil";
import Instructors from "../components/Instructors";
import Navbar from "../components/Navbar";
import userAtom from "../atoms/userAtom";
import { Navigate } from "react-router-dom";

const InstructorsPage = () => {
  const [loggedInUser, setLoggedInUser] = useRecoilState(userAtom);

  return (
    <>
      {!loggedInUser.email && <Navigate to={"/login"} replace={true} />}
      {!loggedInUser.isAdmin && <Navigate to={"/lectures"} replace={true} />}

      <Navbar />
      <Instructors />
    </>
  );
};

export default InstructorsPage;
