import { Navigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
const Home = () => {
  const [loggedInUser, setLoggedInUser] = useRecoilState(userAtom);

  return (
    <>
      {loggedInUser.isAdmin && <Navigate to={"/course"} replace={true} />}
      {!loggedInUser.isAdmin && <Navigate to={"/lectures"} replace={true} />}
    </>
  );
};

export default Home;
