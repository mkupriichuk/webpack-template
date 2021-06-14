import './styles/app.scss';
import twitter from 'icons/twitter.svg'
import samoyed from 'images/samoyed.jpg'

const App = () => {
  return (
    <>
    <div className="container">
      <h1>Hello</h1>
      <div className="hero">
        <img src={twitter} alt=""/>
        <img src={samoyed} alt=""/>
      </div>
    </div>
    </>
  )
}

export default App
