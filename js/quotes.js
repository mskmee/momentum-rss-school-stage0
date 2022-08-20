import { language } from "./language_block.js";

const quoteBlock = document.querySelector('.quote'),
      changeQuote = document.querySelector('.change-quote'),
      quoteAuthorBlock = document.querySelector('.author');
    
export let quoteId = 0;

export async function getQuote(lang){
    const quotes = 'assets/quotes_with_lang.json';
    const result = await fetch(quotes);
    const data = result.json(); 
    data.then(function(i){
        const randomNum = Math.floor(Math.random() * i[language].length);
        const quote = i[language][randomNum];
        quoteBlock.textContent = quote['text'];
        quoteAuthorBlock.textContent = quote['author'];
        quoteId = randomNum;
    })
}

export async function translateQuote(id, lang){
    const quotes = 'assets/quotes_with_lang.json';
    const result = await fetch(quotes);
    const data = result.json(); 
    data.then(function(i){
        const quote = i[language][quoteId];
        quoteBlock.textContent = quote['text'];
        quoteAuthorBlock.textContent = quote['author'];
    })
}

window.addEventListener('load', getQuote);
changeQuote.addEventListener('click', getQuote)
