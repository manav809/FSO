import {Routes, Route} from 'react-router-dom'
import StateTutorial from './components/useState';
import ReducerTutorial from './components/useReducer'
import EffectTutorial from './components/useEffect'
import RefTutorial from './components/useReducer'
import LayoutEffectTutorial from './components/useLayoutEffect'
import ImperativeHandleTutorial from './components/useImperativeHandle'
import ContextTutorial from './components/useContext'
import MemoTutorial from './components/useMemo'
import CallbackTutorial from './components/useCallback'


import Home from './Home'
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/usestate" element={<StateTutorial /> } />
      <Route path="/usereducer" element={<ReducerTutorial />} />
      <Route path="/useeffect" element={<EffectTutorial />} />
      <Route path="/useref" element={<RefTutorial />} />
      <Route path="/uselayouteffect" element={<LayoutEffectTutorial />} />
      <Route path="/useimperativehandle" element={<ImperativeHandleTutorial />} />
      <Route path="/usecontext" element={<ContextTutorial />} />
      <Route path="/usememo" element={<MemoTutorial />} />
      <Route path="/usecallback" element={<CallbackTutorial />} />
    </Routes>
  )
}

export default App;