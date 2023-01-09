import React,{useEffect,useState} from 'react'
import "./style.css"
import WeatherCard from './weathercard';
const Temp = () => {
    const [inputField,setInputField]=useState("Pune");
    const [tempInfo,setTempInfo]=useState({})
    const getWeatherInfo=async()=>{
        try{
            
            let url=`https://api.openweathermap.org/data/2.5/weather?q=${inputField}&units=metric&appid=3eb24aded9ee53328962f52e9330dea5`;
            const res=await fetch(url);
            const data=await res.json();  
           
            const {temp,humidity,pressure}=data.main;
            const {main:weathermood}=data.weather[0];
            const {name}=data;
            const {speed}=data.wind;
            const {country,sunset}=data.sys
            const myNewWeatherInfo={
                temp,
                humidity,
                pressure,
                weathermood,
                name,
                speed,
                country,
                sunset
                
            };
            setTempInfo(myNewWeatherInfo)
        }
        catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        getWeatherInfo();
    },[])
    return (
    <>
        <div className='wrap'>
            <div className='search'>
                <input type="search"  placeholder='search...'
                    autoFocus
                    id="search"
                    className='searchTerm'
                    value={inputField}
                    onChange={(event)=>setInputField(event.target.value)}
                />
                <button type='button' className='searchButton' onClick={getWeatherInfo}>
                    Search
                </button>
                
            </div>
        </div>
        {/* {our temp card} */}
        <WeatherCard tempInfo={tempInfo}/>
    
    </>
  )
}

export default Temp