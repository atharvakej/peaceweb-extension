import "./App.css";

function App() {
  const handleClick = () => {
    console.log("click");
  };
  return (
    <>
      <h1>Peace Web</h1>
      <div className="card">
        <button onClick={handleClick}>Click</button>
      </div>
    </>
  );
}

export default App;
