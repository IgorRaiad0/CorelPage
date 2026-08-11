(function () {
    const AUTH_KEY = "corel_auth_timestamp";

    function isAuthenticated() {
        const savedTimeStr = localStorage.getItem(AUTH_KEY);
        if (!savedTimeStr) return false;

        const savedTime = Number(savedTimeStr);
        if (isNaN(savedTime)) return false;

        const hoursLimit = (typeof CONFIG !== "undefined" && CONFIG.SESSION_TIMEOUT_HOURS) ? CONFIG.SESSION_TIMEOUT_HOURS : 24;
        const maxAgeMs = hoursLimit * 60 * 60 * 1000;
        const now = Date.now();

        if (now - savedTime < maxAgeMs) {
            return true;
        } else {
            localStorage.removeItem(AUTH_KEY);
            return false;
        }
    }

    function setAuthenticated(status) {
        if (status) {
            localStorage.setItem(AUTH_KEY, Date.now().toString());
        } else {
            localStorage.removeItem(AUTH_KEY);
        }
    }

    function checkAuth() {
        if (isAuthenticated()) {
            setupLogoutButton();
            return;
        }

        document.body.classList.add("auth-locked");
        showLoginModal();
    }

    const eyeOpenSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.48c.35.79,8.82,19.58,27.65,38.41C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.35c18.83-18.83,27.3-37.62,27.65-38.41A8,8,0,0,0,247.31,124.76ZM128,192c-30.76,0-58.54-11.79-78.33-31.57C36.85,147.61,28.21,134.61,24.8,128c3.41-6.61,12.05-19.61,24.87-32.43C69.46,75.79,97.24,64,128,64s58.54,11.79,78.33,31.57C219.15,108.39,227.79,121.39,231.2,128C227.79,134.61,219.15,147.61,206.33,160.43C186.54,180.21,158.76,192,128,192ZM128,88a40,40,0,1,0,40,40A40,40,0,0,0,128,88Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,128,152Z"></path></svg>`;
    const eyeClosedSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M53.92,34.62a8,8,0,1,0-11.84,10.76l172,189.2a8,8,0,0,0,11.84-10.76ZM128,192c-30.76,0-58.54-11.79-78.33-31.57C36.85,147.61,28.21,134.61,24.8,128c3.41-6.61,12.05-19.61,24.87-32.43a131.78,131.78,0,0,1,24.52-19.82,8,8,0,1,0-9.2-13.08A147.92,147.92,0,0,0,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.48c.35.79,8.82,19.58,27.65,38.41C61.43,194.74,93.12,208,128,208a135,135,0,0,0,60-14.15,8,8,0,1,0-7.34-14.23A119,119,0,0,1,128,192ZM247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48a135.25,135.25,0,0,0-46.06,8.12,8,8,0,1,0,5.32,15.09A119.34,119.34,0,0,1,128,64c30.76,0,58.54,11.79,78.33,31.57C219.15,108.39,227.79,121.39,231.2,128c-2.47,4.78-7.79,13.56-16,22.75a8,8,0,1,0,11.83,10.77c9.55-10.5,15.69-20.44,18.59-26.04A8,8,0,0,0,247.31,124.76Z"></path></svg>`;
    const lockSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256"><path d="M208,80H176V56a48,48,0,0,0-96,0V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80ZM96,56a32,32,0,0,1,64,0V80H96ZM208,208H48V96H208V208Zm-80-56a12,12,0,1,1-12-12A12,12,0,0,1,128,152Z"></path></svg>`;

    function showLoginModal() {
        if (document.getElementById("authOverlay")) return;

        const overlay = document.createElement("div");
        overlay.id = "authOverlay";
        overlay.className = "auth-overlay";

        overlay.innerHTML = `
            <div class="auth-card" id="authCard">
                <div class="auth-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M208,80H176V56a48,48,0,0,0-96,0V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80ZM96,56a32,32,0,0,1,64,0V80H96ZM208,208H48V96H208V208Zm-80-56a12,12,0,1,1-12-12A12,12,0,0,1,128,152Z"></path>
                    </svg>
                </div>
                <h2>Acesso Restrito</h2>
                <p>Digite a senha fornecida pelo professor para acessar o Curso de CorelDRAW.</p>
                
                <form id="authForm" onsubmit="return false;">
                    <div class="auth-input-group">
                        <input type="password" id="authPassword" placeholder="Digite sua senha..." autocomplete="current-password" autofocus required>
                        <button type="button" class="auth-toggle-pass" id="authTogglePass" title="Mostrar/Ocultar senha">
                            ${eyeOpenSvg}
                        </button>
                    </div>
                    <p class="auth-error-msg" id="authErrorMsg"></p>
                    <button type="submit" class="auth-btn" id="authSubmitBtn">Entrar no Curso</button>
                </form>
            </div>
        `;

        document.body.appendChild(overlay);

        const form = document.getElementById("authForm");
        const passwordInput = document.getElementById("authPassword");
        const togglePassBtn = document.getElementById("authTogglePass");
        const errorMsg = document.getElementById("authErrorMsg");
        const card = document.getElementById("authCard");

        togglePassBtn.addEventListener("click", function () {
            if (passwordInput.type === "password") {
                passwordInput.type = "text";
                togglePassBtn.innerHTML = eyeClosedSvg;
            } else {
                passwordInput.type = "password";
                togglePassBtn.innerHTML = eyeOpenSvg;
            }
        });

        form.addEventListener("submit", function (e) {
            e.preventDefault();
            const inputVal = passwordInput.value.trim();
            const expectedPassword = typeof CONFIG !== "undefined" && CONFIG.ACCESS_PASSWORD ? CONFIG.ACCESS_PASSWORD : "1234";

            if (inputVal === expectedPassword) {
                setAuthenticated(true);
                document.body.classList.remove("auth-locked");
                overlay.style.opacity = "0";
                overlay.style.transition = "opacity 0.3s ease";
                setTimeout(() => {
                    overlay.remove();
                    setupLogoutButton();
                    if (window.location.pathname.includes("aula.html")) {
                        window.location.reload();
                    }
                }, 300);
            } else {
                errorMsg.innerText = "Senha incorreta! Verifique com seu professor.";
                card.classList.remove("shake");
                void card.offsetWidth;
                card.classList.add("shake");
                passwordInput.value = "";
                passwordInput.focus();
            }
        });
    }

    function setupLogoutButton() {
        const header = document.querySelector("header");
        if (!header || document.getElementById("logoutBtn")) return;

        const logoutBtn = document.createElement("button");
        logoutBtn.id = "logoutBtn";
        logoutBtn.className = "logout-btn";
        logoutBtn.innerHTML = `${lockSvg} Sair`;
        logoutBtn.title = "Encerrar sessão de acesso";
        logoutBtn.title = "Encerrar sessão de acesso";

        logoutBtn.addEventListener("click", function () {
            if (confirm("Deseja realmente sair e bloquear o acesso?")) {
                setAuthenticated(false);
                window.location.reload();
            }
        });

        // Se for na aula.html com back-btn, posicionar ao lado
        const backBtn = document.querySelector(".back-btn");
        if (backBtn && backBtn.parentElement) {
            backBtn.parentElement.insertBefore(logoutBtn, backBtn.nextSibling);
        } else {
            header.appendChild(logoutBtn);
        }
    }

    window.Auth = {
        isAuthenticated: isAuthenticated,
        logout: function () {
            setAuthenticated(false);
            window.location.reload();
        }
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", checkAuth);
    } else {
        checkAuth();
    }
})();
