const API_URL = "https://zenquotes.io/api/random";
let quote = []

async function RetrieveQuote()
{
    try {
        var response = await fetch(API_URL);
        quote = await response.json();
        console.log("Found: ", quote);
    }
    catch(error) {
        console.error("Oops: ",error)
    }
}



RetrieveQuote();