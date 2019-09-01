
const appKey = "key";// key for weather bit API
const weekDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Juin", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]
let sendButton = document.getElementById("sendButton");
let cityInput = document.getElementById("cityInput");

// Today Weather widget

let day = document.getElementById("day");
let month = document.getElementById("month");
let temperature = document.getElementById("temperature");
let humidity = document.getElementById("humidity");
let wind = document.getElementById("wind");
let city = document.getElementById("city");
let compass = document.getElementById("compass");
let weatherImage = document.getElementById("weatherImage");

// Other days Weather widgets
let otherDay;
let maxTemperature;
let minTemperature;
let otherDayWeatherImage;

sendButton.addEventListener('click', () => {
    getWeatherDetails(cityInput.value);
    
});

function getWeatherDetails(city) {
    let apiLink = "https://api.weatherbit.io/v2.0/forecast/daily?&city="+ city + "&days=7&key=" + appKey;
    $.getJSON(apiLink).done(json => refreshWidget(json));
}

function refreshWidget(json) {

    let date = new Date(json.data[0].valid_date);
    day.innerHTML = weekDay[date.getDay()];
    month.innerHTML = date.getDate() + " " + months[date.getMonth()];

    // setting today weather condition widget
    city.innerHTML = json.city_name + ', ' + json.country_code;
    temperature.innerHTML = json.data[0].temp;
    humidity.innerHTML = json.data[0].rh;
    wind.innerHTML = Math.round(parseFloat(json.data[0].wind_spd) * 3.6);
    compass.innerHTML = json.data[0].wind_cdir_full;
    weatherImage.src = getWeatherImage(json.data[0].weather.icon);
    
    // setting other days weather condition widgets
    let dateNumber;
    let dayIndex = 0;
    for(let i=1; i<json.data.length; i++) {
        dateNumber = i + 1;
        dayIndex = date.getDay() + i;
       
        otherDay = document.getElementById("day" + dateNumber);
        if(dayIndex >= 7 ) {
            otherDay.innerHTML = weekDay[dayIndex - 7 ];
        } else {
            otherDay.innerHTML = weekDay[dayIndex];
        }
       
        maxTemperature = document.getElementById("day" + dateNumber + "MaxTemp");
        maxTemperature.innerHTML = json.data[i].max_temp
        
        minTemperature = document.getElementById("day" + dateNumber + "MinTemp");
        minTemperature.innerHTML = json.data[i].min_temp
        
        otherDayWeatherImage = document.getElementById("day" + dateNumber + "WeatherImage");
        otherDayWeatherImage.src = getWeatherImage(json.data[i].weather.icon);;
    }

}

function getWeatherImage(icon) {
    let imageSource = "assets/images/icons/" + icon + ".png";
    return imageSource;
}

function init() {
    // Get default location to init widget
    getWeatherDetails("Tunis,tn");
}

init();

