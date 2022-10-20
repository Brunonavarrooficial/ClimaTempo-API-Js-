const apiKey ='447954334ef4e0c591d2ef05536ccc95';
const apiCountryURL ='https://countryflagsapi.com/png/';

const cityInput = document.querySelector('#city-input');
const searchBtn = document.querySelector('#search');


const cityElement = document.querySelector('#city');
const tempeElement = document.querySelector('#temperature span');
const descElement = document.querySelector('#description');
const weatherIconElement = document.querySelector('#weather-icon');
const countryElement = document.querySelector('#country');
const humidityElement = document.querySelector('#humidity span');
const windElement = document.querySelector('#wind span');

const weatherContainer = document.querySelector('#weather-data');

// funções

const getWeatherData = async(city) => {
    const apiWeatherURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br` //api do .env colocar!!
    const res = await fetch(apiWeatherURL);
    const data = await res.json();

    return data;
}

const showWeatherData = async (city) => {
    const dataShow = await getWeatherData(city);   
    
    cityElement.innerHTML = dataShow.name;
    tempeElement.innerHTML = parseInt(dataShow.main.temp);
    descElement.innerHTML = dataShow.weather[0].description;
    weatherIconElement.setAttribute(
        'src',
        `https://openweathermap.org/img/wn/${dataShow.weather[0].icon}.png`
    );
    countryElement.setAttribute('src', apiCountryURL + dataShow.sys.country);
    humidityElement.innerHTML = `${dataShow.main.humidity}%`;
    windElement.innerHTML = `${dataShow.wind.speed}km/h`;

    weatherContainer.classList.remove('hide');
};

// Eventos
searchBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const city = cityInput.value;

    showWeatherData(city);    
});

cityInput.addEventListener('keyup', (e) => {
    if (e.code === "Enter") {
        const city = e.target.value;

        showWeatherData(city);
    }
});


