const synth = speechSynthesis;
const selectVoices = document.querySelector("#select");
const inputRange = document.querySelector("#volume");
const spanVolume = document.querySelector("#span-volume");
const languages = document.querySelector("#idiomas");
let msg = new SpeechSynthesisUtterance();
async function fetchLanguage(text, translateFrom, translateTo) {
    const response = await fetch(`https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`);
    const result = await response.json();
    if (result.responseStatus === 200) {
        return result;
    }
    return Promise.reject("Erro inesperado");
}
function init() {
    attVolume();
    setTimeout(() => setVoices(), 500);
}
function setVoices() {
    const voices = synth.getVoices();
    voices.forEach((voice) => {
        const option = createOptions(voice);
        selectVoices.append(option);
    });
}
function createOptions(text) {
    const option = document.createElement("option");
    option.textContent = `${text.name}-${text.lang}`;
    option.setAttribute("data-lang", text.lang);
    option.value = text.name;
    return option;
}
function getText(ev) {
    ev.preventDefault();
    const text = document.querySelector("#text");
    if (text.value !== "") {
        setup(text.value);
        return;
    }
    alert("Insira algo para converter");
}
async function setup(text) {
    try {
        const translateTo = document.querySelector("#select").selectedOptions[0].getAttribute("data-lang");
        const translatefrom = document.querySelector("#idiomas").value;
        const response = await fetchLanguage(text, translatefrom, translateTo);
        speek(response.responseData.translatedText);
    }
    catch (error) {
        alert(error);
    }
}
function speek(text) {
    msg.text = text;
    if (!msg.voice || msg.voice) {
        msg.voice = speechSynthesis.getVoices().filter((voice) => { return voice.name == document.querySelector("#select").value; })[0];
    }
    synth.speak(msg);
}
function attVolume() {
    spanVolume.textContent = inputRange.value;
    msg.volume = Number(inputRange.value) / 100;
}
document.addEventListener("DOMContentLoaded", init);
document.querySelector("form").addEventListener("submit", getText);
inputRange.addEventListener("input", attVolume);
