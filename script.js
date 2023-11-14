const url = 'http://localhost:7879'

//Leer Texto
function readText() {
    const inputText=document.getElementById("input-text").value;
    fetch(url+'/read/'+inputText)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al leer el texto")
            }
            return response.text();
        })
        .then(result => displayResultRead(result))
        .catch(error => console.error("Error al leer el texto", error))
}

function displayResultRead(result) {
    const resultContainer = document.getElementById("resultContainer");
    const resultDiv=document.getElementById("results");

    resultDiv.innerHTML="";

    if(result){
        console.log(result)
        resultDiv.innerHTML+='<p>Texto:<p>';
        resultDiv.innerHTML+=`<p>${result.replace(/"/g, "")}<p>`;
    } else {
        resultDiv.innerHTML += '<p>No se encontro texto</p>';
    }

    resultContainer.style.display = 'block';
}

//Contar palabras
function countWords(){
    const inputText=document.getElementById("input-text").value;
    fetch(url+'/wordCount/'+inputText)
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

//Normalizar
document.getElementById('btn-normalize').addEventListener('click', normalize)
function normalize() {
    console.log("Normalize")
    const inputText=document.getElementById("input-text").value;
    fetch(url+'/normalize/'+inputText)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al normalizar el texto")
            }
            return response.text()
        })
        .then(result => displayResultRead(result))
        .catch(error => console.error("Error al normalizar el texto", error))
}
