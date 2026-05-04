const lista = document.getElementById("listaAulas");

for(let i=1;i<=20;i++){

const aula = aulas.find(a=>a.id===i) || {
id:i,
titulo:"Aula "+i,
liberada:false
};

const card = document.createElement("div");
card.className="card";

const padlockSvg = `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256"><path d="M208,80H176V56a48,48,0,0,0-96,0V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80ZM96,56a32,32,0,0,1,64,0V80H96ZM208,208H48V96H208V208Zm-80-56a12,12,0,1,1-12-12A12,12,0,0,1,128,152Z"></path></svg>`;

if(aula.liberada){
    const thumb = aula.thumb || `https://placehold.co/600x400/1a1a1a/FFFFFF/png?text=${aula.titulo}`;
    card.innerHTML = `
        <img src="${thumb}" alt="${aula.titulo}">
        <h3>${aula.titulo}</h3>
        <p>Entrar na Aula</p>
    `;
} else {
    card.innerHTML = `
        <div class="locked-thumb">
            ${padlockSvg}
        </div>
        <h3>${aula.titulo}</h3>
        <p>Aula Bloqueada</p>
    `;
}

card.onclick = ()=>{

if(aula.liberada){
window.location.href=`aula.html?id=${aula.id}`;
}else{
alert("Esta aula será liberada em breve.");
}

};

lista.appendChild(card);

}