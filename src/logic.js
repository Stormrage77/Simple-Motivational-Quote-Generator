const mainContainer = document.getElementById("main-container");
const mainContainerText = document.getElementById("main-container-text");
const mainContainerAuthor = document.getElementById("main-container-author");
const ShareBtn = document.getElementById("Share-Btn");
const GenerateQuoteBtn = document.getElementById("GenerateQuote-Btn");
const loader = document.getElementById("loader");

const API_URL = "https://dummyjson.com/quotes";
const OFFLINE = "offline";
const ONLINE = "online";
let QUOTE_AUTHOR = null;
let QUOTE_TEXT = null;

let quote = [];


function Loading()
{
    loader.hidden = false;
    mainContainer.hidden = true;
}

function Complete()
{
    loader.hidden = true;
    mainContainer.hidden = false;
}

async function RetrieveQuotes()
{
    try {
        Loading();
        var response = await fetch(API_URL);
        quote = await response.json();
        SelectQuote(ONLINE);
    }
    catch(error) {
        console.error("Oops: ", error)
        SelectQuote(OFFLINE);
    }
}


// Select a random quote
function SelectQuote(status) {

        switch (status) {
 
            case "online":
                var random = Math.floor(Math.random() * quote.quotes.length);
                QUOTE_AUTHOR = quote.quotes[random].author;
                QUOTE_TEXT = quote.quotes[random].quote;

                if (!QUOTE_AUTHOR)
                {
                    QUOTE_AUTHOR = "Unknown";
                }

                if (QUOTE_TEXT.length > 50) {
                    mainContainerText.classList.add('main-container-text-long');
                }
                else
                {
                    mainContainerText.classList.remove('main-container-text-long');    
                }

                mainContainerText.textContent = QUOTE_TEXT;
                mainContainerAuthor.textContent = QUOTE_AUTHOR;
                Complete();
                break;
        
            case "offline":
                var random = Math.floor(Math.random() * offlineQuote.length);
                QUOTE_AUTHOR = offlineQuote.quotes[random].author;
                QUOTE_TEXT = offlineQuote.quotes[random].quote;

                if (!QUOTE_AUTHOR)
                {
                        QUOTE_AUTHOR = "Unknown";
                }
                mainContainerText.textContent = QUOTE_TEXT;
                mainContainerAuthor.textContent = QUOTE_AUTHOR;
                Complete();
                break
        
            default:
                break;
        }

}

window.addEventListener("DOMContentLoaded", (ev) => {


    if (!mainContainer || !mainContainerText || !mainContainerAuthor || !ShareBtn || !GenerateQuoteBtn)
    {
        console.error("Verify DOMElements");
        return;
    }

    GenerateQuoteBtn.addEventListener("click", (ev) => {
        ev.preventDefault();
        RetrieveQuotes();
    });
    
    ShareBtn.addEventListener("click", (ev) => {
        ev.preventDefault();
        let encodedQuote = encodeURIComponent(`😊 Hey i just found out this quote: "${QUOTE_TEXT}" by ${QUOTE_AUTHOR} and i hope you like it and brightens your day! ❤️`);
        let whatsappURL = `https://api.whatsapp.com/send?text=${encodedQuote}`;
        window.open(whatsappURL);
    });

});

RetrieveQuotes();