import { useState, useEffect } from 'react'
import UserProfile from './components/UserProfile';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const increment = () => setCount(prev => prev + 1);

    useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  return (
    <div className="card">
      <h1>Count: {count}</h1>
      <button onClick={increment}>
        increment
      </button>
      {/* <button onClick={increment} name='increment'>
        count is {count}
      </button> */}

    <UserProfile />
      
    </div>
  )
}

export default App
