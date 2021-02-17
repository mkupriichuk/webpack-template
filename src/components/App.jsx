import '../sass/app.sass';
import samoyed from 'images/samoyed.jpg'

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
      Hello
    </div>
    <div className="hero"></div>
    </>
  )
}

export default App
