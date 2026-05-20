const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id"));

const aula = aulas.find(a => a.id === id);

function converterParaEmbed(url) {
    if (url.includes("youtube.com/watch?v=")) {
        return url.replace("watch?v=", "embed/");
    }
    if (url.includes("youtu.be/")) {
        return url.replace("youtu.be/", "youtube.com/embed/");
    }
    return url;
}

document.getElementById("titulo").innerText = aula.titulo;
document.getElementById("video").src = converterParaEmbed(aula.video);

const slideContainer = document.getElementById("slideContainer");
if (aula.temSlide) {
    slideContainer.innerHTML = `
        <div class="slide-section">
            <div class="slide-header">
                <h2>Slides da Aula</h2>
                <button class="fullscreen-btn" onclick="document.getElementById('slideFrame').requestFullscreen()">&#x26F6; Tela Cheia</button>
            </div>
            <div class="slide-frame">
                <iframe id="slideFrame" src="${CONFIG.SLIDE_BASE_URL + aula.slide + CONFIG.SLIDE_SETTINGS}" allowfullscreen></iframe>
            </div>
        </div>
    `;
}

const downloadContainer = document.getElementById("downloadContainer");
if (aula.temArquivos) {
    downloadContainer.innerHTML = `
        <a href="${aula.arquivos}" class="download-btn" target="_blank">
            Baixar arquivos da aula
        </a>
    `;
}