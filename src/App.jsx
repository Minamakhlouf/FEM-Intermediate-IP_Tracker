import './App.css'; 
import { useState, useEffect} from "react"; 
import Map from './components/Map';
import UserSubmission from './components/UserSubmission';
import UserInformation from "./components/UserInformation"; 


function App() {
  const [response, setResponse] = useState(""); 
  const [error, setError] = useState(false); 

  let status; 

  if (!response) {
    status = "Loading"
  } else {
    status = "Received"
  }

  const apiKey = import.meta.env.VITE_IPIFY_API_KEY; 
  console.log(import.meta.env.VITE_IPIFY_API_KEY)

  useEffect(() => {
    async function getInitialIPAddress() {
      try {
        let ip = await fetch("https://api64.ipify.org?format=json"); 
        if (!ip.ok) {
          throw new Error("IP Address could not be fetched")
        }
        let ipResponse = await ip.json();
        return ipResponse.ip; 
      } catch (error) {
        setError(true); 
      }
  }

    async function firstAPICall() {
      try {
        const ipAddress = await getInitialIPAddress(); 
        const response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ipAddress}`); 
        console.log(response)
        if (!response.ok) {
          throw new Error("Could not get data from server")
        }
        const responseData = await response.json(); 
        let responseObject = {
          userInput: "", 
          ip: responseData.ip, 
          location: `${responseData.location.city}, ${responseData.location.region} ${responseData.location.postalCode}`,
          timezone: `UTC ${responseData.location.timezone}`, 
          isp: responseData.isp, 
          latitude: responseData.location.lat, 
          longitude: responseData.location.lng
        }
        setResponse(responseObject); 
      } catch (error) {
        console.error("Error finding data", error)
      }
    }

    firstAPICall(); 
  }, []); 


  
  return (
    <>
      <header>
        <h1>IP Address Tracker</h1>
        <UserSubmission response={response} makeNewAPICall={setResponse} apiKey={apiKey} setError={setError}/>
        <UserInformation response={response} status={status} error={error}/>
      </header>
      <Map response={response} error={error}/>
    </>
  )
}

export default App
