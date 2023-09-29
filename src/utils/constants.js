// day weather backgrounds
import dayCloud from "../images/weather_conditions/day-cloudy.svg";
import dayRain from "../images/weather_conditions/day-rain.svg";
import dayFog from "../images/weather_conditions/day-fog.svg";
import daySnow from "../images/weather_conditions/day-snow.svg";
import dayStorm from "../images/weather_conditions/day-storm.svg";
import dayClear from "../images/weather_conditions/day-sunny.svg";
import dayMist from "../images/weather_conditions/day-mist.svg";

// night weather backgrounds
import nightCloud from "../images/weather_conditions/night-cloudy.svg";
import nightRain from "../images/weather_conditions/night-rain.svg";
import nightFog from "../images/weather_conditions/night-fog.svg";
import nightSnow from "../images/weather_conditions/night-snow.svg";
import nightStorm from "../images/weather_conditions/night-storm.svg";
import nightClear from "../images/weather_conditions/night-moon.svg";
import nightMist from "../images/weather_conditions/night-mist.svg";

/*const defaultClothingItems = [
  {
    _id: 0,
    name: "Cap",
    weather: "warm",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Cap.png?etag=f3dad389b22909cafa73cff9f9a3d591",
  },
  {
    _id: 1,
    name: "Hoodie",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Hoodie.png?etag=5f52451d0958ccb1016c78a45603a4e8",
  },
  {
    _id: 2,
    name: "Jacket",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Jacket.png?etag=f4bb188deaa25ac84ce2338be2d404ad",
  },
  {
    _id: 3,
    name: "Sneakers",
    weather: "warm",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Sneakers.png?etag=3efeec41c1c78b8afe26859ca7fa7b6f",
  },
  {
    _id: 4,
    name: "T-Shirt",
    weather: "warm",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/T-Shirt.png?etag=44ed1963c44ab19cd2f5011522c5fc09",
  },
  {
    _id: 5,
    name: "Winter coat",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Coat.png?etag=298717ed89d5e40b1954a1831ae0bdd4",
  },
];
*/

const weatherOptions = [
  {
    url: dayCloud,
    type: "Clouds",
    day: true,
  },
  {
    url: dayFog,
    type: "Fog",
    day: true,
  },
  {
    url: dayRain,
    type: "Rain",
    day: true,
  },
  {
    url: daySnow,
    type: "Snow",
    day: true,
  },
  {
    url: dayStorm,
    type: "Thunderstorm",
    day: true,
  },
  {
    url: dayClear,
    type: "Clear",
    day: true,
  },
  {
    url: dayFog,
    type: "Mist",
    day: true,
  },

  {
    url: dayMist,
    type: "Mist",
    day: true,
  },

  {
    url: nightCloud,
    type: "Clouds",
    day: false,
  },
  {
    url: nightFog,
    type: "Fog",
    day: false,
  },
  {
    url: nightClear,
    type: "Clear",
    day: false,
  },
  {
    url: nightRain,
    type: "Rain",
    day: false,
  },
  {
    url: nightSnow,
    type: "Snow",
    day: false,
  },
  {
    url: nightStorm,
    type: "Thunderstorm",
    day: false,
  },
  {
    url: nightFog,
    type: "Mist",
    day: false,
  },
  {
    url: nightMist,
    type: "Mist",
    day: false,
  },
];
export { weatherOptions };
