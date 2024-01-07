import { Link } from "react-router-dom";

const course = ["sdfj", "kjdf", "dkdj", "jj", "kd", "d", "kd", "ksj", "kd"];

const Course = () => {
  return (
    <>
      <div className="mt-4 ml-10"></div>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-4 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Courses</h2>

          <button className="focus:outline-none text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 ml-2">
            Add course
          </button>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {course.map((course, index) => (
              <Link
                key={course.id}
                to={`/course/1`}
                className="group transform h-50  w-50 transition duration-500 hover:scale-105 rounded-lg px-2 py-2 "
              >
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                  <img
                    src={
                      "https://res.cloudinary.com/dxl9atufr/image/upload/v1701256184/zu6r2rastlbnrcxuol3s.jpg"
                    }
                    alt={"chat-gpt"}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="mt-1 text-sm font-bold text-gray-900 ">
                      Chat gpt course &nbsp;&nbsp;&nbsp; (beginner)
                    </p>
                    <p className="mt-1 text-xs font-medium text-gray-900 ">
                      This course is created by top open Ai employees
                    </p>

                    <h3 className="mt-4 text-sm text-gray-700 flex items-center font-semibold">
                      Lectures:
                      <span>&nbsp;2</span>
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Course;
