let currentCity = "Tokyo";
let units = "metric";

let city = document.querySelector(".city");
let datetime = document.querySelector(".datetime");
let forecast = document.querySelector(".forecast");
let tempreature = document.querySelector(".tempreature");
let icon =  document.querySelector(".icon");
let minmax = document.querySelector(".minmax");
let realfeel = document.querySelector(".realfeel");
let humidity = document.querySelector(".humidity");
let wind = document.querySelector(".wind");
let pressure = document.querySelector(".pressure");

//поиск
document.querySelector(".search").addEventListener('submit', e => {
   let search = document.querySelector(".searchform");
   e.preventDefault();
   currentCity = search.value;
   getWeather();
})

//единицы измерения
document.querySelector(".celsius").addEventListener('click',()=>{
   if(units!=="metric"){
      units = "metric"
      getWeather()
   }
})
document.querySelector(".farenhe").addEventListener('click',()=>{
   if(units!=="imperial"){
      units = "imperial"
      getWeather()
      //очистка формы поиска
      search.value = ""
   }
})


function setWeatherBackground(iconCode) {
   const body = document.querySelector("body");
   let imageUrl;

   // Определение URL изображения в зависимости от кода иконки погоды
   switch (iconCode) {
       case "01d":
           imageUrl = "url(img/sunny.jpg)";
           break;
       case "02d":
       case "03d":
       case "04d":
           imageUrl = "url(img/cloud-black-and-white-sky-cloudy-atmosphere-daytime-weather-cumulus-covered-monochrome-clouds-climate-forward-meteorology-cloudiness-weather-phenomenon-meteorological-phenomenon-1126288.jpg)";
           break;
       case "09d":
       case "10d":
           imageUrl = "url(img/cloud-black-and-white-sky-cloudy-atmosphere-daytime-weather-cumulus-covered-monochrome-clouds-climate-forward-meteorology-cloudiness-weather-phenomenon-meteorological-phenomenon-1126288.jpg)";
           break;
       case "11d":
           imageUrl = "url(img/thunderstorm.jpg)";
           break;
       case "13d":
           imageUrl = "url(img/snow.jpg)";
           break;
       default:
           imageUrl = "url(img/default.jpg)";
           break;
   }

   // Установка нового фонового изображения
   body.style.backgroundImage = imageUrl;
}

// После получения данных о погоде вызывайте эту функцию,
// передавая код иконки погоды в качестве параметра
// Например:
// setWeatherBackground(data.weather[0].icon);




//преобразование времени
function convertTime(timestamp, timezone){
   const convertTimezone = timezone/3600 //перевод секунд в часы
   const date = new Date(timestamp*1000);
   const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      timeZone: `Etc/GMT${convertTimezone >= 0 ? "-":"+"}${Math.abs(convertTimezone)}`,
      hour12: true
   }
   return date.toLocaleString("en-US", options)
}

//преобразование кода страны в полное название
function convertCountryCode(country){
   let regionName = new Intl.DisplayNames(["en"], {type: "region"});
   return regionName.of(country)
}

function getWeather(){
   const API_KEY = '5620f26193c78a37292f58e8a97edb9b';
   fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${API_KEY}&units=${units}`).then(res=>res.json()).then(data=>{
      city.innerHTML = `${data.name}, ${convertCountryCode(data.sys.country)}`
      datetime.innerHTML = convertTime(data.dt, data.timezone);
      forecast.innerHTML = `<p>${data.weather[0].main}`
      tempreature.innerHTML = `${data.main.temp.toFixed()}&#176`
      icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" alt=""/>`
      minmax.innerHTML = `<p>Min: ${data.main.temp_min.toFixed()}&#176</p><p>Max: ${data.main.temp_max.toFixed()}&#176</p>`
      realfeel.innerHTML = `${data.main.feels_like.toFixed()}&#176`
      humidity.innerHTML = `${data.main.humidity}%`
      wind.innerHTML = `${data.wind.speed}${units === "imperial"?"мили/ч":"м/с"} `
      pressure.innerHTML = `${data.main.pressure} мм рт.ст.`

      // После получения данных о погоде вызываем функцию setWeatherBackground
      setWeatherBackground(data.weather[0].icon);
   })
   .catch(error => {
      console.error('Error fetching weather data:', error);
   });
}

document.body.addEventListener('load', getWeather())