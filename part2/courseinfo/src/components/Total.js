const Total = ({ parts }) => {
  //example of reduce
  const sum = parts.reduce(
    (accumulator, currentValue) => accumulator + currentValue.exercises,
    0
  );
  return (
    <>
      <p><b>total of {sum} exercises</b></p>
    </>
  );
};
export default Total;
