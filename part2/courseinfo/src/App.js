import Course from "./components/Course"
import courses from "./modules/courses"

const App = () => {
  return (
    <div>
      <Course courses={courses} />
    </div>
  )
}

export default App