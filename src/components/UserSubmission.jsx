import arrow from "../assets/icon-arrow.svg"; 
import {useRef} from "react"; 

function UserSubmission(props) {
    const inputRef = useRef(); 

    const formInputValidationHandler = (input) => {
        let inputTrim = input.trim(); 
        let inputParam = ""; 
    
        if (/^[0-9.]+$/.test(input)) {
          inputParam = "ipAddress"; 
        } else if (inputTrim.includes(":") && !inputTrim.includes(".")) {
          inputParam = "ipAddress"; 
        } else if (inputTrim.includes(".") && !inputTrim.includes(":") && !inputTrim.includes("@")) {
          inputParam = "domain"; 
        } else if (inputTrim.includes("@") && inputTrim.includes(".")) {
          inputParam = "email"; 
        } else if (inputTrim.includes(" ")) {
          inputParam = "error"
        }
          else {
          inputParam = "error"
        }
    
        return {inputParam: inputParam, input: inputTrim}
      }
    
      const formAPICallHandler = (e)=> {
        e.preventDefault(); 
        const inputInformation = formInputValidationHandler(inputRef.current.value); 
        console.log(inputInformation.inputParam === "error")

        if (inputInformation.input === props.response.userInput) {
          return; 
        }

        if (inputInformation.inputParam === "error") {
          props.setError(true); 
          props.makeNewAPICall(""); 
          return; 
        }
    
        async function makeAPICall(inputValue, inputType) {
          console.log(inputType); 
          try {
            props.setError(false); 
            const responseAPI = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${props.apiKey}&${inputType}=${inputValue}`); 
            if (!responseAPI.ok) {
              throw new Error("Invalid input")
            }
            const responseData = await responseAPI.json(); 
            let responseObject = {
              userInput: inputValue, 
              ip: responseData.ip, 
              location: `${responseData.location.city}, ${responseData.location.region} ${responseData.location.postalCode}`,
              timezone: `UTC ${responseData.location.timezone}`, 
              isp: responseData.isp, 
              latitude: responseData.location.lat, 
              longitude: responseData.location.lng
            }
            props.makeNewAPICall(responseObject); 
          } catch(error) {
            props.setError(true); 
            props.makeNewAPICall(""); 
          }

        }
    
        makeAPICall(inputInformation.input, inputInformation.inputParam)
      }

    return (
        <form action="" onSubmit={formAPICallHandler}>
            <input ref={inputRef} type="text" placeholder='Search for any IP address or domain'/>
            <button><img src={arrow} alt="" /></button>
        </form>
    )
}

export default UserSubmission; 