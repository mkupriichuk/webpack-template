import '../sass/app.sass';
import samoyed from 'images/samoyed.jpg'
import twitter from 'icons/twitter.svg'

const style = {
  backgroundImage: `url(${samoyed})`,
  minHeight: '70vh',
  color: 'white',
  textAlign: 'center',
  fontSize: '100px'
}

const App = () => {
  return (
    <>
    <div className="container" style={style}>
      <h1 style={{color: 'pink'}}>Hello</h1>
      <div className="hero">
        <img src={twitter} alt=""/>
      </div>
    </div>
    </>
  )
}

export default App
