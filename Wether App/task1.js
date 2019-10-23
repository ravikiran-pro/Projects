let appId = 'ae7e7ea32521973f6f2f2ff161f3f38b';
let units = 'imperial';
let searchMethod = 'zip';
function getSearchMethod(searchTerm) {
    if (searchTerm.lenght === 5 && Number.parseInt(searchTerm) + '' === searchTerm)
        searchMethod = 'zip';
    else
        searchMethod = 'q';
}

function searchWeather(searchTerm) {
    getSearchMethod(searchTerm);
    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units`).then(result => {
        return result.json();
    }).then(result => {
        init(result);
    })
}
function init(resultFromServer) {
    switch (resultFromServer.weather[0].main) {
        case 'Clear':
            document.body.style.backgroundImage = 'url("clear.jpg")';

            break;
        case 'Clouds':
            document.body.style.backgroundImage = 'url("cloudy.jpg")';

            break;
        case 'Rain':
        case 'Drizzle':
        case 'Mist':
            document.body.style.backgroundImage = 'url("rain.jpg")';

            break;
        case 'Thunderstrom':
            document.body.style.backgroundImage = 'url("thunder.jpg")';

            break;
        case 'Snow':
            document.body.style.backgroundImage = 'url("snow.jpg")';

            break;
        default:
            document.body.style.backgroundImage = 'url("default.jpg")';

            break;

    }
    let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
    let temperatureElement = document.getElementById('temperature');
    let humidityElement = document.getElementById('windSpeed');
    let cityHeader = document.getElementById('cityHeader');
    let weatherIcon = document.getElementById('documentIconImg');


    weatherIcon.src = 'http://openweathermap.org/img/w/' + resultFromServer.weather[0].icon + '.png';
    let resultDescription = resultFromServer.weather[0].description;
    weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);
    temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp) + '&#176';
    windSpeedElement.innerHTML = 'Wind at ' + Math.floor(resultFromServer.wind.speed) + 'm/s';
    cityHeader.innerHTML = resultFromServer.name;
    humidityElement.innerHTML = 'Humidity levels at ' + resultFromServer.main.humidity + '%';


    console.log(resultFromServer);
    setPositionForWeatherInfo();
}
function setPositionForWeatherInfo(){
    let weatherContainer = document.getElementById('weatherContainer');
    let weatherContainerHeight = weatherContainer.clientHeight;
    let weatherContainerWidth = weatherContainer.clientWidth;

    weatherContainer.style.left =`calc(50% - ${weatherContainerWidth/2}px)`;
    weatherContainer.style.top =`calc(50% - ${weatherContainerWidth/2}px)`;
    weatherContainer.style.visibility='visible';
}
document.getElementById('searchBtn').addEventListener('click', () => {
    let searchTerm = document.getElementById('searchInput').value;
    if (searchTerm)
        searchWeather(searchTerm);
})