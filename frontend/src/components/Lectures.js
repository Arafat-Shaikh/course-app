import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import { data } from "autoprefixer";

const Lectures = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const [usersLectures, setUsersLectures] = useState([]);
  useEffect(() => {
    async function getUsersLectures() {
      try {
        const res = await fetch("/api/course/lectures/" + user.name);
        const data = await res.json();

        if (data.error) {
          console.log(data.error);
        } else {
          console.log(data);
          setUsersLectures(data);
        }
      } catch (error) {
        console.log(error);
        alert(data.error);
      }
    }
    getUsersLectures();
  }, []);

  console.log(usersLectures);
  return (
    <>
      {user && usersLectures && (
        <div className="flex justify-center min-h-screen bg-neutral-100 ">
          <ul className="max-w-xl divide-y divide-gray-200 dark:divide-gray-700 sm:w-4/6 w-full mt-10 p-4 rounded-md">
            <li className="py-3 sm:py-4 px-2 pr-4">
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    Lectures
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  Date
                </div>
              </div>
            </li>
            {usersLectures.map((item) => (
              <li className="pb-3 sm:pb-4 bg-white p-2 rounded-md">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      {item.name}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      {user.email}
                    </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    {item.date}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Lectures;
