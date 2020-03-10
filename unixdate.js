var result = document.getElementById("unix-date");
var latitude = 27.810572;
var longitude = 74.434604;
document.getElementById('lat').innerHTML = latitude;
document.getElementById('lon').innerHTML = longitude;



function unixDate(e) {
  var d = new Date(e.target.value);
  d.setHours(d.getHours() - 5);
  d.setMinutes(d.getMinutes() - 30);
  var c = d.getTime() / 1000;
  result.innerHTML = c;
};

function normalDate(uDate){
  dateObj = new Date((uDate + 19800) * 1000);
  time = dateObj.toUTCString();
  return time
};

function showData(wData){
  var newDiv = document.createElement("div");
  var nDate = normalDate(wData.time).slice(0,-3);
  var tC = (wData.temperature - 32) * (5/9)
  var temp = tC.toFixed(2);
  var appTemp = (wData.apparentTemperature - 32) * (5/9);
  var feelsLike = appTemp.toFixed(2);
  var cC = wData.cloudCover * 100;
  var cloudCover = cC.toFixed(2);
  var humidity = wData.humidity * 100;
  var hum = humidity.toFixed(2);
  newDiv.setAttribute('class','weatherElement');
  newDiv.innerHTML = `Time: ${nDate}<br>
  Summary: ${wData.summary}<br>
  Details: ${wData.icon}<br>
  Temperature: ${temp} &#8451<br>
  Feels Like: ${feelsLike} &#8451<br>
  Humidity: ${hum} %<br>
  Pressure: ${wData.pressure} mbar<br>
  Wind Speed: ${wData.windSpeed} mph<br>
  Cloud Cover: ${cloudCover} %<br>`;
  document.getElementById('weatherData').appendChild(newDiv);
};

// Weather data and its analysis via JSONP
function parseData(data){
  // console.log(data.hourly.data);
  for (var i=0; i<data.hourly.data.length; i++){
    console.log(data.hourly.data[i]);
    showData(data.hourly.data[i]);
  };
};

function getWeatherData(){
  var script = document.createElement('script');
  script.src = `https://api.darksky.net/forecast/${apiKey}/${latitude},${longitude},${result.innerHTML}?callback=parseData`
  document.getElementsByTagName('head')[0].appendChild(script);
};
