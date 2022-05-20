
import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
// import { Dashboard, WelcomePage } from './components';
import { useDashboard } from './contexts/DashboardContext';
import { Dashboard, WelcomePage } from './pages';

function App() {
  const [image,setImage] = useState(null)
  const {state} = useDashboard()

  const fetchImage = ()=>{
    axios.get(`https://api.unsplash.com/photos/random/?client_id=${process.env.REACT_APP_IMAGE_API_KEY}&&orientation=landscape&&query=landscape`).then((img)=>{
      setImage(img.data.urls.regular)
    })
  }

  useEffect(()=>{
    fetchImage()
  },[])

  return (
    <div style={{backgroundImage:`url(${image})`,backgroundSize:"cover"}} className="App">
      {!state.user?<WelcomePage/>:<Dashboard/>}
    </div>
  );
}

export default App;
