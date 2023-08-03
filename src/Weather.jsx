import { useEffect, useState } from 'react';
import axios from 'axios';
const Weather=(props)=>{

    const[city,setCity]=useState("");
    const[info,setInfo]=useState("");
    const[records,setRecords]=useState([]);
    const[msg,setMsg]=useState({text:" ", class: ''});
    

    useEffect(()=>{

    
      let data=[];
      const arr=[];
      const rcds=[];
      axios.get(`https://6477ff46362560649a2d1caf.mockapi.io/users`)
      .then((response) => {
       
    
        data=response.data;
        console.log("data : ",data);
 
        const email= "jashandeepk1995@gmail.com";
        const infoo=data.filter(row=>row.email===email);
        
        let cities= [];

        for(let k of infoo)
        {
          cities.push(
            {
              id: k.id,
              city: k.city
              
            }
          
            );
        }

     
        for(let v of cities)
        {


        
         arr.push(
             
          axios.get(`https://api.openweathermap.org/data/2.5/weather?appid=2df7971b0f7e000e946ef170c62d16e5&q=${v.city}&units=metric`)
            .then((response) => {
              const city=response.data.name;
            const temp=response.data.main.temp;
            const iconUrl=`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
            const humidity=response.data.main.humidity;
            const feelslike=response.data.main.feels_like;
            const sunrise=response.data.sys.sunrise;
            const sunset=response.data.sys.sunset;
          
            const obj={
              city:city,temp:temp,
              iconUrl:iconUrl,
              humidity:humidity,
              feelslike:feelslike,
              sunrise:sunrise,
              sunset:sunset,
              id:v.id
            
            };

       
           rcds.push(obj);
         
          })
          .catch((error) => {
        
            
            console.log(error);
           
            setMsg({...msg, text:`Entered city ${v.city} does not exist`, class:'redcolor'});
           })
         )


        }

          Promise.all(arr).then(()=>{
            setRecords(rcds);
           
          });

        })

       

    },[info]); 
   
    const showWeather=()=>{

      //First check if the city we entered already exist or no

      let data=[];
      axios.get(`https://6477ff46362560649a2d1caf.mockapi.io/users`)
      .then((response) => {

       
        data=response.data;

        const email= "jashandeepk1995@gmail.com";
        const cityy=city;
        const infoo=data.filter(row=>row.email===email & row.city==cityy);
        console.log("Info" + infoo);
        let cities= [];

        for(let k of infoo)
        {
          cities.push(k.city);
        }
        console.log(cities);
       
    
        if(cities[0]==cityy) 
        {

          // This means the city we entered exists already
        
          setMsg({...msg, text:`${cityy} already exist`, class:'redcolor'});
          cities=[];
        }
        else
        {
          
           //This means the city we enter do not exist so this will insert the data in the mockAPI


           axios.get(`https://api.openweathermap.org/data/2.5/weather?appid=2df7971b0f7e000e946ef170c62d16e5&q=${cityy}&units=metric`)
           .then((response) => {

            let city1=response.data.name;
           
             axios.post('https://6477ff46362560649a2d1caf.mockapi.io/users', {
              name:"Jashandeep Kaur",
              email: "jashandeepk1995@gmail.com",
              city: city1
              })
            .then((response) => { 
                 console.log("data inserted : ",response);   
                setInfo(city);
                setMsg({...msg, text:`${city} has been inserted`, class:'greencolor'});
     
              })
              .catch((error) => {
               console.log(error);
             }); 
            }).catch((error) =>
            {
              console.log(error);
              setMsg({...msg, text:`${city} is not a valid city`, class:'redcolor'});
     
            })
          
          
          }

}).catch((error) => {
    
    console.log(error);
   })
      
  }

    const deleteRecord=(i,id)=>
  {

    console.log("Value of id"+id);
    const rcds=[...records];
    rcds.splice(i,1);
    setRecords(rcds);
    console.log(records);
    console.log(i);

   
   
    axios.delete(`https://6477ff46362560649a2d1caf.mockapi.io/users/${id}`)
    .then((response) => {

       console.log("Data has been Deleted");
       
    })
    .catch((error) => {
      console.log(error);
    });  
  }



    return(
        <div className='weather'>
        <form className='displayform'>
       <label>Enter City:</label> <input type="text" name="city" placeholder ="Enter City Name" value={city} required onChange={(e)=>setCity(e.target.value)}/>  
       
        <input type="button" value="Show" className="show" onClick={showWeather}/>
        <span className= {msg.class}>{msg.text}</span>
        </form>
        {
          records.map((row,i)=>{
            return(
              <div key={i} className="boxwrap">
                <div className="box">
                 <h1>{row.city}</h1>
                 <img src={row.iconUrl} alt={row.city} className="weatherimage" />
                <div className="weatherinfo">   
              
          <p>     Temperature: {row.temp} &deg;C</p> 
           <p>     Feels Like: {row.feelslike} &deg;C </p> 
           <p>      Humidity: {row.humidity}% <br /></p> 
           <p>    Sunrise: {new Date(row.sunrise * 1000).toLocaleTimeString('en-IN')}</p> 
           <p>     Sunset: {new Date(row.sunset * 1000).toLocaleTimeString('en-IN')}</p> 
                <input type="button" value="Delete" className="delete" onClick={()=>deleteRecord(i,row.id)}/>
                </div>       
                </div>
                </div>
            )
          })
        }
        </div>
    );

}
export default Weather;