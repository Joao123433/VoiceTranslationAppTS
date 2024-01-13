const synth = speechSynthesis;
const selectVoices: HTMLSelectElement = document.querySelector("#select")
const inputRange: HTMLInputElement = document.querySelector("#volume")
const spanVolume: HTMLSpanElement = document.querySelector("#span-volume")
const languages: HTMLSelectElement = document.querySelector("#idiomas")

interface Translate {
  responseData: {
    translatedText: string
  }
}

let msg: SpeechSynthesisUtterance = new SpeechSynthesisUtterance()

async function fetchLanguage(text: string, translateFrom: string, translateTo: string) {
  const response = await fetch(`https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`)
  const result = await response.json()

  if(result.responseStatus === 200) {
    return result
  }

  return Promise.reject("Erro inesperado")
}

function init() {
  attVolume()
  setTimeout(() => setVoices(), 500)
}

function setVoices() {
  const voices = synth.getVoices()
  voices.forEach((voice) => {
    const option = createOptions(voice)
    selectVoices.append(option)
  })
}

function createOptions(text: { name: string; lang: string; }) {
  const option = document.createElement("option")
  option.textContent = `${text.name}-${text.lang}`
  option.setAttribute("data-lang", text.lang)
  option.value = text.name
  return option
}

function getText(ev: { preventDefault: () => void; }) {
  ev.preventDefault()

  const text: HTMLTextAreaElement = document.querySelector("#text")
  if(text.value !== "") {
    setup(text.value)
    return
  }

  alert("Insira algo para converter")
}

async function setup(text: string) {
  try {
    const translateTo = document.querySelector<HTMLSelectElement>("#select").selectedOptions[0].getAttribute("data-lang")
    const translatefrom = document.querySelector<HTMLSelectElement>("#idiomas").value

    const response: Translate = await fetchLanguage(text, translatefrom, translateTo)
    speek(response.responseData.translatedText)
  } catch(error) {
    alert(error)
  }
}

function speek(text: string) {
  msg.text = text
  if(!msg.voice || msg.voice) {
    msg.voice = speechSynthesis.getVoices().filter((voice) => { return voice.name == document.querySelector<HTMLSelectElement>("#select").value})[0]
  }

  synth.speak(msg)
}

function attVolume() {
  spanVolume.textContent = inputRange.value
  msg.volume = Number(inputRange.value) / 100
}

document.addEventListener("DOMContentLoaded", init) 
document.querySelector("form").addEventListener("submit", getText)
inputRange.addEventListener("input", attVolume)