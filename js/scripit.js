// API
const apiKey = '447954334ef4e0c591d2ef05536ccc95';
const apiCountryURL = 'https://countryflagsapi.com/png/';
const apiUnsplash = "https://source.unsplash.com/1600x900/?";

// Selector Dom HTML
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

const errorMessageContainer = document.querySelector("#error-message");
const loader = document.querySelector("#loader");

const suggestionContainer = document.querySelector("#suggestions");
const suggestionButtons = document.querySelectorAll("#suggestions button");

// funções backend estatico

const toggleLoader = () => {
    loader.classList.toggle("hide");
};

const getWeatherData = async (city) => {
    toggleLoader();

    const apiWeatherURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL, {
        headers: {
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'strict-origin-when-cross-origin', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        }
    });
    const data = await res.json();

    toggleLoader();

    return data;
}

// Tratamento de erro
const showErrorMessage = () => {
    errorMessageContainer.classList.remove("hide");
};

const hideInformation = () => {
    errorMessageContainer.classList.add("hide");
    weatherContainer.classList.add("hide");

    suggestionContainer.classList.add("hide");
};

const showWeatherData = async (city) => {
    hideInformation();

    const dataShow = await getWeatherData(city);

    if (dataShow.cod === "404") {
        showErrorMessage();
        return;
    }

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

    // Change bg image
    document.body.style.backgroundImage = `url("${apiUnsplash + city}")`;


    weatherContainer.classList.remove('hide');
};

// Eventos e input
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

// Sugestões
suggestionButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        const city = btn.getAttribute("id");

        showWeatherData(city);
    });
});


