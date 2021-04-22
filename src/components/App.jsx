import "/app.css";
import twitter from "icons/twitter.svg";


const App = () => {
  return (
    <>
      <div className="container">
        <h1>Hello</h1>
        <div className="hero">
          <img src={twitter} alt="twitter logo" />
        </div>
      </div>
    </>
  );
};

export default App;
