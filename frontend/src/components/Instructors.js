import { useRecoilState } from "recoil";
import instructorsAtom from "../atoms/instructorsAtom";
import { useEffect } from "react";

const Instructors = () => {
  const [instructors, setInstructors] = useRecoilState(instructorsAtom);
  console.log(instructors);

  useEffect(() => {
    async function getInstructors() {
      try {
        const res = await fetch("/api/user/");
        const data = await res.json();

        if (data.error) {
          console.log(data.error);
          alert(data.error);
        } else {
          console.log(instructors);
          setInstructors(data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getInstructors();
  }, []);
  return (
    <>
      {instructors && (
        <div className="flex justify-center min-h-screen bg-neutral-100 ">
          <ul className="max-w-xl divide-y divide-gray-200 dark:divide-gray-700 sm:w-4/6 w-full mt-10 p-4 rounded-md">
            <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    Instructor details
                  </p>
                </div>
                {/* <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  Lectures assigned
                </div> */}
              </div>
            </li>
            {instructors &&
              instructors.map((ins) => (
                <li className="pb-3 sm:pb-4 bg-white p-2 rounded-md">
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {ins.name}
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {ins.email}
                      </p>
                    </div>
                    {/* <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      Lectures: 4
                    </div> */}
                  </div>
                </li>
              ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Instructors;
