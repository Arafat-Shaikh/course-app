import { useRecoilState } from "recoil";
import Lectures from "../components/Lectures";
import Navbar from "../components/Navbar";
import userAtom from "../atoms/userAtom";
import { Navigate } from "react-router-dom";

const LecturesPage = () => {
  const [loggedInUser, setLoggedInUser] = useRecoilState(userAtom);
  return (
    <>
      {!loggedInUser.email && <Navigate to={"/login"} replace={true} />}
      <Navbar />
      <Lectures />
    </>
  );
};

export default LecturesPage;
