import { createContext, useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const AuthContext = createContext()


export function AuthProvider ({children}) {
  
  let navigate = useNavigate();
  let myToken = localStorage.getItem('authTokens')?JSON.parse(localStorage.getItem('authTokens')):null
  let myUser = localStorage.getItem('authTokens')?jwt_decode(localStorage.getItem('authTokens')):null

  const [user, setUser] = useState(()=>myUser)
  const [authToken,setAuthToken] = useState(()=>myToken)
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [load,setLoad] = useState(true)
  const [myPositions, setMyPositions] = useState([])
  const [liveData,setLiveData] = useState([])
  const [assets,setAssets] = useState([])
  const [currAsset,setCurrAsset] = useState("AAPL")
  const [time_f,setTime_f] = useState(1455)
  const [portfolioData,setPortfolioData]= useState([])
  const [period,setPeriod] = useState('1D')

  const updateToken = () => {
   fetch(`http://localhost:8000/api/token/refresh/`, {
       method: "POST",
       headers: {
           "Content-Type": "application/json",
           Accept: "application/json"
       },
       body: JSON.stringify({
           refresh: authToken.refresh
       })
   })
   .then((r) => {
    if (r.ok) {
      console.log(r)
      r.json()
      .then((data) => {
        setAuthToken(data)
        setUser(jwt_decode(data.access))
        localStorage.setItem('authTokens', JSON.stringify(data))
      })
    } else {
      // logoutUser()
      console.log('Not found')
    }
})
  }

  const loginUser = (data) => {
      fetch(`http://localhost:8000/api/token/`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
          },
          body: JSON.stringify(data)
      })
      .then((r) => {
        if (r.ok) {
          console.log(r)
          r.json()
          .then((data) => {
            setAuthToken(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
          })
          .then(()=>navigate('/'))
          .then(()=>setIsLoading(false))
        } else {
          r.json()
          .then(err=>setErrors([...errors,err.detail]))
          .then(()=>setIsLoading(false))
        }
    })

    }

    const logoutUser = () => {
      setAuthToken(null)
      setUser(null)
      localStorage.removeItem('authTokens')
      navigate('/login')
    }

    //get_positions
    useEffect( () => {
      fetch(`http://localhost:8000/api/positions/`)
      .then( res => res.json())
      .then( data => setMyPositions(data))
      .catch( error => console.log(error.message));
    },[])

    //getLive data
    useEffect( () => {
     fetch(`http://localhost:8000/api/bars/${currAsset}/15/${time_f}`)
     .then( res => res.json())
     .then( data => setLiveData(data.data))
     .catch( error => console.log(error.message));
    },[currAsset,time_f])

    //get assets
    useEffect( () => {
    fetch(`http://localhost:8000/api/assets/`)
    .then( res => res.json())
    .then( data => setAssets(data))
    .catch( error => console.log(error.message));
    },[])

    //get portfolio
    useEffect( () => {
      fetch(`http://localhost:8000/api/get-portfolio/${period}`)
      .then( res => res.json())
      .then( data => setPortfolioData(data.data))
      .catch( error => console.log(error.message));
    },[period])

    let contextData = {
      loginUser:loginUser,
      logoutUser:logoutUser,
      errors:errors,
      setErrors:setErrors,
      isLoading:isLoading,
      setIsLoading:setIsLoading,
      user:user,
      myPositions:myPositions,
      liveData:liveData,
      assets:assets,
      setCurrAsset:setCurrAsset,
      currAsset:currAsset,
      setTime_f:setTime_f,
      portfolioData:portfolioData,
      setPeriod:setPeriod
    }

    useEffect( () => {
      console.log('loading')
      let interval = setInterval(() => {
        if(authToken){
          updateToken()
        }
      }, 120000)
      return () => clearInterval(interval)
    },[authToken,load])

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;