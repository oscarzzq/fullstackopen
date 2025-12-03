const Course = ({ course }) => {
  return (
    <>
      <Header name={course.name}/>
      <Content parts={course.parts}/>
      <Total course={course}/>
    </>
  )
}

const Header = ({ name }) => {
  return (
    <div>
      <h1>{name}</h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>{props.content.name} {props.content.exercises}</p>
    </div>
  )
}

const Content = ({ parts }) => {
  return (
    <>
      {parts.map(part => <Part key={part.id} content={part}/>)}
    </>
  )
}

const Total = ({ course }) => {
  const exercises = course.parts.map(part => part.exercises)

  return (
    <>
      <b>total of {exercises.reduce((a, c) => a + c)} exercises</b>
    </>
  )
}

export default Course