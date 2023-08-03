import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
const Currentweather=()=>{

  let lat="",long="";
  const[info,setInfo]=useState([]);
  const[msgg,setMsgg]=useState(" ");
    
   

    useEffect(()=>{

    
      const fetchdata=()=>
      {
        
            navigator.geolocation.getCurrentPosition(position=> {
                lat=position.coords.latitude
                long=position.coords.longitude;
                axios.get(`https://api.openweathermap.org/data/2.5/weather?appid=2df7971b0f7e000e946ef170c62d16e5&lat=${lat}&lon=${long}&units=metric`)
                .then(response => {           
                    console.log(response.data);   
                    const city=response.data.name;
                    const temp=response.data.main.temp;
                    const statuss=response.data.weather[0].main;
                    const iconUrl=`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
                    const humidity=response.data.main.humidity;
                    const feelslike=response.data.main.feels_like;
                    const sunrise=response.data.sys.sunrise;
                    const sunset=response.data.sys.sunset;
                    const obj={
                      city:city,
                      temp:temp,
                      iconUrl:iconUrl,
                      statuss:statuss,
                      humidity:humidity,
                      feelslike:feelslike,
                      sunrise:sunrise,
                      sunset:sunset
                    
                    };    
                    const rcds=[...info];
                    rcds.push(obj);
                    setInfo(rcds);   
                })
                .catch(error => {            
                  console.log(error);
                 
                });
              }, function(){
                console.log("jas");
                setMsgg("Location Information is Unavailable");

              });      
        }

           fetchdata();
        },[lat,long])
     
     

    return(
      
        <div>
     
           <span className="allowpermission">{msgg}</span>


{
          info.map((row,i)=>{
            return(
              <div key={i} className="showweather">
               
               <p className="city">  {row.city}</p>
                 <img src={row.iconUrl} alt={row.city} className="iconimage" />
                
               <p className="temp">{row.temp} &deg;C</p>  
                
               <p className="sky">{row.statuss}</p>  
               <div className="flex">
               <div className="flex1"> 
                 <h4>Feels Like: </h4>
                 <p>{row.feelslike} &deg;C</p>
               </div>
               <div className="flex1">  Humidity: {row.humidity}%</div>
               <div className="flex1"> Sunrise: {new Date(row.sunrise * 1000).toLocaleTimeString('en-IN')}</div>
               <div className="flex1">Sunset: {new Date(row.sunset * 1000).toLocaleTimeString('en-IN')}</div>
             
                </div>
                    
                </div>
            )
          })
        }
         
       
        
        
        </div>
    );

}
export default Currentweather;