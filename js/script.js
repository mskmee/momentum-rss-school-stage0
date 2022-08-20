import { showTime } from "./time.js";
import { setLocalStorage } from "./greatings_block.js";
import { getLocalStorage } from "./greatings_block.js";
import { getWeatherUppdateEveryHour } from "./weather.js";
import { getQuote } from "./quotes.js";
import { ShowWeather } from "./weather.js";
import { getBodyBackgroundUrl } from "./background.js";
import { isPlay } from "./player.js";
import { todoMenu } from "./todo.js";
import { message } from "./message.js"

// Starting app

window.addEventListener('load', showTime);
window.addEventListener('load', getLocalStorage);

window.addEventListener('beforeunload', setLocalStorage);

getWeatherUppdateEveryHour();

console.log(message);