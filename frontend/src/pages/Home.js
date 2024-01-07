import { Navigate } from "react-router-dom";
const Home = () => {
  let user = {
    isAdmin: false,
  };

  return (
    <>
      {user.isAdmin && <Navigate to={"/course"} replace={true} />}
      {!user.isAdmin && <Navigate to={"/lectures"} replace={true} />}
    </>
  );
};

export default Home;
