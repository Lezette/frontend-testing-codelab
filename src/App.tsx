import { useState, useEffect } from 'react'

function App() {
  const [count, setCount] = useState(0)

    useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  return (
    <div className="card">
      <button onClick={() => setCount(count + 1)}>
        count is {count}
      </button>

      
    </div>
  )
}

export default App
