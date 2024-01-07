import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams, useSearchParams } from "react-router-dom";
import Select from "react-select";
import { constSelector, useRecoilState } from "recoil";
import instructorsAtom from "../atoms/instructorsAtom";
import coursesAtom from "../atoms/courseAtom";

const CourseDetails = () => {
  const [isAddingLecture, setIsAddingLecture] = useState(false);
  const [courses, setCourses] = useRecoilState(coursesAtom);
  const [selectedDate, setSelectedDate] = useState(null);
  const [courseById, setCourseByID] = useState(null);
  const [instructors, setInstructors] = useRecoilState(instructorsAtom);
  const [assignedInst, setAssignedInst] = useState(null);
  const params = useParams();
  const date = new Date(selectedDate);
  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  console.log("formatted Date " + formattedDate);
  console.log(selectedDate);
  console.log(assignedInst);

  useEffect(() => {
    async function getCourseById() {
      const res = await fetch("/api/course/detail/" + params.id);
      const data = await res.json();

      if (data.error) {
        alert(data.error);
      } else {
        console.log(data);
        setCourseByID(data);
      }
    }
    getCourseById();

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
  }, [params]);

  console.log(courseById);

  async function handleAddLecture(e) {
    e.preventDefault();

    try {
      if (!formattedDate || assignedInst == "select" || assignedInst === null) {
        return alert("Input fields are required");
      }

      const updatedCourse = {
        ...courseById,
        lectures: [
          ...courseById.lectures,
          { name: assignedInst, date: formattedDate },
        ],
      };

      console.log(updatedCourse);

      const res = await fetch("/api/course/update/", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          course: updatedCourse,
          name: assignedInst,
          date: formattedDate,
        }),
      });

      const data = await res.json();

      if (data.error) {
        console.log(data.error);
        alert(data.error);
      } else {
        console.log(data);
        const updatedCourses = courses.map((crs) => {
          if (crs._id == data._id) {
            return data;
          }
          return crs;
        });
        setCourseByID(data);
        setCourses(updatedCourses);
      }

      console.log(formattedDate);
      console.log(assignedInst);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-800 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row -mx-4">
          {!isAddingLecture && courseById && (
            <div className="md:flex-1 px-4">
              <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4 ">
                <img
                  className="w-full h-full object-cover rounded-lg "
                  src={courseById.imageUrl}
                  alt="Product Image"
                />
              </div>

              <div className="flex justify-center items-center">
                <div className="w-1/2 px-2">
                  <button
                    onClick={() => setIsAddingLecture(!isAddingLecture)}
                    className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700"
                  >
                    Add Lecture
                  </button>
                </div>
              </div>
            </div>
          )}
          {isAddingLecture && (
            <div className="md:flex-1 px-4 mb-10">
              {/* from here */}
              <div>
                {" "}
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                  <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl te font-bold text-center leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                      Add Lecture
                    </h1>
                    <form
                      className="space-y-4 md:space-y-6"
                      noValidate
                      onSubmit={handleAddLecture}
                    >
                      <div>
                        <p className="font-semibold mb-2">Select Instructor:</p>
                        <div className="bg-neutral-200 rounded-xl pr-2">
                          <select
                            onChange={(e) => setAssignedInst(e.target.value)}
                            className=" bg-transparent outline-none bg-neutral-200 p-2 pr-8 rounded-lg w-full"
                            placeholder="select Instructor"
                          >
                            <option value={"select"}>Select</option>
                            {instructors.map((p) => (
                              <>
                                <option value={p.name}>{p.name}</option>
                              </>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="bg-gray-300 p-2 rounded-xl ">
                        <DatePicker
                          selected={selectedDate}
                          onChange={(date) => setSelectedDate(date)}
                          dateFormat="dd/MM/yyyy"
                          isClearable
                          placeholderText="Select a date"
                          className="px-2 rounded-md w-[100%] bg-gray-300 hover:focus:outline-none outline-none "
                        />
                      </div>

                      <div className="flex justify-center items-center">
                        <div className="w-1/2 px-2">
                          <button
                            type="submit"
                            className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* DETAILS SECTION */}
          {courseById && (
            <div className="md:flex-1 px-4 overflow-y-auto ">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                Chat gpt course
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                {courseById.description}
              </p>
              <div className="flex mb-4">
                <div className="mr-4">
                  <span className="font-bold text-gray-700 dark:text-gray-300">
                    Level:&nbsp;
                  </span>
                  <span className="text-gray-600 dark:text-gray-300">
                    ({courseById.level})
                  </span>
                </div>
                <div>
                  <span className="font-bold text-gray-700 dark:text-gray-300">
                    Lectures:&nbsp;
                  </span>
                  <span className="text-gray-600 dark:text-gray-300">
                    {courseById.lectures.length}
                  </span>
                </div>
              </div>

              <div>
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  All lectures:
                </span>
                <div className="mt-6 flex flex-col gap-2">
                  {courseById.lectures.length &&
                    courseById.lectures.map((item) => (
                      <div className="flex justify-between bg-white p-4 rounded-md">
                        <div>
                          <p className="font-semibold">
                            Instructor:{" "}
                            <span className=" font-normal text-sm">
                              {item.name}
                            </span>
                          </p>{" "}
                          <p className="font-semibold text-sm">
                            Date:{" "}
                            <span className=" font-normal text-sm">
                              {item.date}
                            </span>
                          </p>
                        </div>
                        <div className="rounded-xl ">
                          <img
                            src={courseById.imageUrl}
                            width={80}
                            height={80}
                            className="rounded-md"
                          />
                        </div>
                      </div>
                    ))}
                </div>
                {!courseById.lectures.length && (
                  <>
                    <div className="mt-10">
                      <p>currently no lectures available</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
