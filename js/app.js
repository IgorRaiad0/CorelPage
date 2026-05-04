const lista = document.getElementById("listaAulas");
const titulo = document.getElementById("tituloAula");
const frame = document.getElementById("videoFrame");
const slide = document.getElementById("slideBtn");

function carregarAulas(){

lista.innerHTML = "";

aulas.forEach(aula => {

const card = document.createElement("div");
card.className = "card";

card.innerHTML = `
<img src="${aula.thumb}">
<h3>${aula.id}. ${aula.titulo}</h3>
<p>${aula.descricao}</p>
`;

card.onclick = ()=> abrirAula(aula);

lista.appendChild(card);

});

}

function abrirAula(aula){

titulo.innerText = aula.titulo;
frame.src = aula.video;
slide.href = aula.slide;

window.scrollTo({
top:document.querySelector(".playerBox").offsetTop,
behavior:"smooth"
});

}

carregarAulas();