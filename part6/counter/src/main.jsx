import React from "react";
import ReactDOM from "react-dom/client";
import { createStore } from "redux";

const countReducer = (state = 0, action) => {
  switch (action.type){
    case "INCREMENT":
      return state + 1
    case "DECREMENT":
      return state - 1
    case "ZERO":
      return 0
    default:
      return state
  }
}


const store = createStore(countReducer)


const App = () => {
  return (
    <div>
      <div>
        {store.getState()}
      </div>
      <div>
        <button onClick={e => store.dispatch({type: "INCREMENT"})}>
          plus
        </button>
        <button onClick={e => store.dispatch({type: "DECREMENT"})}>
          minus
        </button>
        <button onClick={e => store.dispatch({type: "ZERO"})}>
          zero
        </button>
      </div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()

store.subscribe(() => {
  renderApp()
  console.log(store.getState())
})