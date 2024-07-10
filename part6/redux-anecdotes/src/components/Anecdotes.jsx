import { useDispatch, useSelector } from "react-redux";
import { voteFor } from "../reducers/actions";

const Anecdotes = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(({anecdotes, filter}) => {
    if (filter === "") {
      console.log(anecdotes)
      return anecdotes;
    } else {
      return anecdotes.filter((anecdote) =>
        anecdote.content.includes(filter)
      );
    }
  });

  const vote = (id) => {
    dispatch(voteFor(id));
  };

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default Anecdotes;
