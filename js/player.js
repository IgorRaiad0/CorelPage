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

// Monta a URL protegendo a estrutura base
document.getElementById("slideFrame").src = CONFIG.SLIDE_BASE_URL + aula.slide + CONFIG.SLIDE_SETTINGS;

const downloadContainer = document.getElementById("downloadContainer");
if (aula.temArquivos) {
    downloadContainer.innerHTML = `
        <a href="${aula.arquivos}" class="download-btn" target="_blank">
            Baixar arquivos da aula
        </a>
    `;
}