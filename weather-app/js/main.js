const API_KEY = '466cfd8effb663ee172796a739231193'
const api_root_url = 'http://api.openweathermap.org/data/2.5/weather?zip='


const city = document.querySelector(".city")
const zip = document.querySelector(".zip")
const weather = document.querySelector(".weather")
const humidity = document.querySelector(".humidity")
const temp = document.querySelector(".temp")
const tempUnit = document.querySelector(".temp-unit")
const icon = document.querySelector(".icon")


function KtoC(Kelvin) {
  return Math.round(Kelvin - 273.75)
}
function CtoF(Celcius) {
  return Math.round(Celcius*9/5 + 32)
}

function FtoC(Fahrenheit) {
  return Math.round((Fahrenheit-32) *5/9)
}

const groups = {
  'Thunderstorm': 'img/thunderstorm.png',
  'Drizzle': 'img/rain.png',
  'Rain': 'img/rain.png',
  'Snow': 'img/snow.png',
  'Clear': 'img/sun.png',
  'Clouds': 'img/cloudy.png'
}

function getWeather(zipCode){
  $.ajax({
    url: api_root_url + zipCode + ',us&appid=' + API_KEY,
    success: function(response){
      console.log(response);
      city.textContent = response.name
      weather.textContent = response.weather[0].description
      temp.textContent = KtoC(response.main.temp)
      tempUnit.textContent = 'C'
      humidity.textContent = response.main.humidity
      icon.setAttribute('src',groups[response.weather[0].main])
      zip.selected()
    }
  })
}
getWeather('33177')


zip.addEventListener('keypress', function(event){
 if(event.keyCode === 13){
   getWeather(event.target.value)
 }
})
tempUnit.addEventListener('click',function () {
  if (tempUnit.textContent === 'C') {
    temp.textContent = CtoF(temp.textContent)
    tempUnit.textContent = 'F'
  } else {
    temp.textContent = FtoC(temp.textContent)
    tempUnit.textContent = 'C'
  }
})
