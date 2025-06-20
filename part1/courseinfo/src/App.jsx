const Header = (props) => {
  return <h1>{props.course}</h1>
};

const Part = ({ part, exercises }) => {
  return (
    <div>
       <li> {part} {exercises}</li>
    </div>
  );
};

const Content = ({parts}) => {
  return (
    <div>
      {parts.map(part=> (
        <Part key={part.id} part={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
};

const Sum = ({parts}) => {
  const exercises = parts.reduce((sum, part) => sum + part.exercises, 0);
  return(
    <div>
      <p>total of {exercises} exercises</p>
    </div>
  )
}

const Courses = ({courses}) => {
  return(
    <div>
      {courses.map(course => (
        <div key={course.id}>
          <Header course={course.name} />
          <Content parts={course.parts} />
          <Sum parts={course.parts} />
        </div>
      ))}
    </div>
  )

}

const App = () => {
  const courses = [{
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id:3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  },
  {
    id: 2,
    name: 'Node.js',
    parts: [
      {
        name: 'Routing',
        exercises: 3,
        id: 1
      },
      {
        name: 'Middlewares',
        exercises: 7,
        id: 2
      }
    ]
  }]

  return <Courses courses={courses}/>
}

export default App