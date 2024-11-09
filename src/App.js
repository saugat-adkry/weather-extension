import React, { useState, useEffect } from 'react';

function App() {
  const initialCount = parseInt(localStorage.getItem('count')) || 0;
  const [count, setCount] = useState(initialCount);

  const handleAdd = () => {
    setCount(count + 1);
  }
  const handleSubtract = () => {
    if (count <= 0) return;
    setCount(count - 1);
  }
  const handleReset = () => {
    setCount(0);
  }

  useEffect(() => {
    localStorage.setItem('count', count);
  }, [count])

  return (
    <>
      <h1 className='text-5xl font-bold text-blue-500 mt-3'>{count}</h1>
      <div>
        <button className='btn bg-red-500 hover:bg-red-700' onClick={handleSubtract}>-</button>
        <button className='ml-2 btn bg-blue-500 hover:bg-blue-700' onClick={handleAdd}>+</button>
      </div>
      <button className='btn bg-gray-500 hover:bg-gray-700' onClick={handleReset}>Reset</button>
    </>
  );
}

export default App;
