import ErrorResponse from "./ErrorResponse"

function UserInformation(props) {
    let error = props.error; 
    console.log(error)

    return (
        <div className='user-information'>
          <div className='user-information__topic'>
            <p className='user-information__property'>IP ADDRESS</p>
            {error ? <ErrorResponse type="user information"/> : <p className='user-information__value'>{!props.response ? props.status : props.response.ip} </p>}
            <div className='user-information__decoration'></div>
          </div>
          <div className='user-information__topic'>
            <p className='user-information__property'>LOCATION</p>
            {error ? <ErrorResponse type="user information"/> : <p className='user-information__value'>{!props.response ? props.status : props.response.location}</p>}
            <div className='user-information__decoration'></div>
          </div>
          <div className='user-information__topic'>
            <p className='user-information__property'>TIMEZONE</p>
            {error ? <ErrorResponse type="user information"/> : <p className='user-information__value'>{!props.response ? props.status : props.response.timezone}</p>}
            <div className='user-information__decoration'></div>
          </div>
          <div className='user-information__topic'>
            <p className='user-information__property'>ISP</p>
            {error ? <ErrorResponse type="user information"/> : <p className='user-information__value'>{!props.response ? props.status : props.response.isp}</p>}
          </div>
      </div>
    )
}

export default UserInformation; 