const inputText=document.getElementById("input-text").value;
const url = 'http://localhost:7879'

function readText() {
    fetch(url+'/read/'+inputText)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al leer el texto")
            }
            return response.json();
        })
        .then(result => displayResultRead(result))
        .catch(error => console.error("Error al leer el texto", error))
}

function displayResultRead(result) {
    const resultContainer = document.getElementById("resultContainer");
    const resultDiv=document.getElementById("results");

    resultDiv.innerHTML="";

    if(result){
        let text = Object.values(result)
        console.log(text)
        resultDiv.innerHTML+='<p>Texto:<p>';
        resultDiv.innerHTML+='<p>'+ text + '<p>';
    } else {
        resultDiv.innerHTML += '<p>No se encontro texto</p>';
    }

    resultContainer.style.display = 'block';
}

function countWords(){
    fetch('http://localhost:7879/wordCount/'+inputText)
        .then(response =>{
            if(!response.ok){
                throw new Error("Error al contar las palabras");
            }
            return response.json();
        })
        .then(result => displayResult(result))
        .catch(error => console.error("Error al contar las palabras", error));
}

function displayResult(result){
    const resultContainer = document.getElementById("resultContainer");
    const resultDiv=document.getElementById("results");

    resultDiv.innerHTML="";

    if(result && Object.keys(result).length>0){
        resultDiv.innerHTML+='<p>Palabras y Frecuencias:<p>';
        resultDiv.innerHTML+='<ul>';
        for (var word in result) {
            resultDiv.innerHTML += '<li>' + word + ': ' + result[word] + '</li>';
        }
        resultDiv.innerHTML += '</ul>';
    } else {
        resultDiv.innerHTML += '<p>No se encontraron palabras.</p>';
    }

    resultContainer.style.display = 'block';    
}