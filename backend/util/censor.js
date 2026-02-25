const badWords = require("../config/badwords");

function censorText(text){

    if(!text) return text;

    let cleanText = text;

    badWords.forEach(word=>{
        const regex = new RegExp(word, "gi");
        cleanText = cleanText.replace(regex, "****");
    });

    return cleanText;
}

module.exports = censorText;