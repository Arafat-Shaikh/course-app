import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import coursesAtom from "../atoms/courseAtom";
import Lectures from "./Lectures";

const Course = () => {
  const [courses, setCourses] = useRecoilState(coursesAtom);
  const [imgPreview, setImgPreview] = useState(null);
  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    level: "",
    description: "",
  });
  async function handleCourseSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch("/api/course/create", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...inputs, imageUrl: imgPreview }),
      });

      const data = await res.json();

      if (data.error) {
        console.log(data.error);
      } else {
        const updatedCourses = [...courses, data];
        setCourses(updatedCourses);
        setIsAddingCourse(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleImgChange(e) {
    const file = e.target.files[0];

    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      alert("Not an image");
    } else {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  useEffect(() => {
    async function getCourses() {
      const res = await fetch("/api/course");
      const data = await res.json();
      if (data.error) {
        alert(data.error);
      } else {
        console.log(data);
        setCourses(data);
      }
    }

    getCourses();
  }, []);

  console.log(courses);

  return (
    <>
      <div className="mt-4 ml-10"></div>

      {!isAddingCourse && courses && (
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-4 lg:max-w-7xl lg:px-8">
            <h2 className="sr-only">Courses</h2>

            <button
              onClick={() => setIsAddingCourse(true)}
              className="focus:outline-none text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 ml-2"
            >
              Add course
            </button>
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {courses.map((course, index) => (
                <Link
                  key={course._id}
                  to={`/course/1`}
                  className="group transform h-50  w-50 transition duration-500 hover:scale-105 rounded-lg px-2 py-2 "
                >
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                    <img
                      src={course.imageUrl}
                      alt={"chat-gpt"}
                      className="h-full w-full object-cover object-center group-hover:opacity-75"
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="mt-1 text-sm font-bold text-gray-900 ">
                        {course.name} &nbsp;&nbsp;&nbsp; {course.level}
                      </p>
                      <p className="mt-1 text-xs font-medium text-gray-900 ">
                        {course.description}
                      </p>

                      <h3 className="mt-4 text-sm text-gray-700 flex items-center font-semibold">
                        Lectures:
                        <span>&nbsp;{course.lectures.length}</span>
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {isAddingCourse && (
        <div className="flex justify-center">
          <div className="md:px-20 px-4 sm:px-6 w-full sm:w-3/4 lg:w-2/4">
            <form onSubmit={handleCourseSubmit} noValidate>
              <div className="mb-4">
                <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                  Course Details
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Add Latest course
                </p>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  id="name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  onChange={(e) =>
                    setInputs({ ...inputs, name: e.target.value })
                  }
                />

                <label
                  htmlFor="name"
                  className=" peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Name
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  onChange={(e) =>
                    setInputs({ ...inputs, level: e.target.value })
                  }
                />
                <label
                  htmlFor="email"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Course-level
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  onChange={(e) =>
                    setInputs({ ...inputs, description: e.target.value })
                  }
                />
                <label
                  htmlFor="street"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Description
                </label>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    htmlFor="file_input"
                  >
                    Upload file
                  </label>
                  <input
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    id="file_input"
                    type="file"
                    onChange={handleImgChange}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mr-4 text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Submit
              </button>
              <button
                onClick={() => setIsAddingCourse(false)}
                className="mt-2 text-gray-900 bg-gray-300 hover:bg-gray-400  focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 "
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Course;
