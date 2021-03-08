import "/app.css";
import samoyed from "images/samoyed.jpg";
import twitter from "icons/twitter.svg";

const style = {
  backgroundImage: `url(${samoyed})`,
  minHeight: "70vh",
  color: "pink",
  textAlign: "center",
  fontSize: "100px",
};

const App = () => {
  return (
    <>
      <div className="container" style={style}>
        <h1>Hello</h1>
        <div className="hero">
          <img src={twitter} alt="twitter logo" />
        </div>
      </div>
    </>
  );
};

export default App;
