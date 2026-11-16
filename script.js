document.addEventListener("DOMContentLoaded", () => {
    
    const navbar = document.getElementById("mainNav");
    
    window.addEventListener("scroll", () => {
        if (window.scrollY > 40) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    const themeToggle = document.getElementById("themeToggle");
    const themeIcon = document.getElementById("themeIcon");
    const htmlElement = document.documentElement;

    const savedTheme = localStorage.getItem("portfolio-theme") || "dark";
    setTheme(savedTheme);

    themeToggle.addEventListener("click", () => {
        const currentTheme = htmlElement.getAttribute("data-bs-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        setTheme(newTheme);
    });

    function setTheme(theme) {
        htmlElement.setAttribute("data-bs-theme", theme);
        localStorage.setItem("portfolio-theme", theme);
        
        if (theme === "dark") {
            themeIcon.classList.replace("bi-moon-stars-fill", "bi-sun-fill");
        } else {
            themeIcon.classList.replace("bi-sun-fill", "bi-moon-stars-fill");
        }
    }

    const typewriterElement = document.getElementById("typewriter");
    const phrases = [
        "Desarrollador Web Frontend",
        "Estudiante de Programación",
        "Apasionado por HTML, CSS y JS",
        "Programando junto a Jaime 🌭"
    ];

    let phraseIndex = 0;
    let letterIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typewriterElement.textContent = currentPhrase.substring(0, letterIndex - 1);
            letterIndex--;
        } else {
            typewriterElement.textContent = currentPhrase.substring(0, letterIndex + 1);
            letterIndex++;
        }

        let speed = isDeleting ? 45 : 90;

        if (!isDeleting && letterIndex === currentPhrase.length) {
            speed = 1800;
            isDeleting = true;
        } else if (isDeleting && letterIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            speed = 400;
        }

        setTimeout(typeEffect, speed);
    }

    typeEffect();

    const navLinks = document.querySelectorAll("#mainNav .nav-link");
    const sections = document.querySelectorAll("section[id], div[id]");

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navLinks.forEach(item => item.classList.remove("active"));
            link.classList.add("active");
        });
    });

    window.addEventListener("scroll", () => {
        let currentSection = "";

        sections.forEach(section => {
            const id = section.getAttribute("id");
            if (id === "perfil" || id === "portfolio" || id === "acerca" || id === "contacto") {
                const sectionTop = section.offsetTop - 160;
                const sectionHeight = section.offsetHeight;
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    currentSection = id;
                }
            }
        });

        if (currentSection) {
            navLinks.forEach(link => {
                link.classList.remove("active");
                if (link.getAttribute("href") === `#${currentSection}`) {
                    link.classList.add("active");
                }
            });
        }
    });
});

const carouselElement = document.getElementById("carouselProyectos");
    const barHtml = document.getElementById("bar-html");
    const barCss = document.getElementById("bar-css");
    const barJs = document.getElementById("bar-js");
    const pctHtml = document.getElementById("pct-html");
    const pctCss = document.getElementById("pct-css");
    const pctJs = document.getElementById("pct-js");
    const repoCounter = document.getElementById("repoSlideCounter");
    const totalSlides = document.querySelectorAll("#carouselProyectos .carousel-item").length;

    function updateLanguageBar(slideElement, slideIndex) {
        const htmlPct = slideElement.getAttribute("data-html") || 0;
        const cssPct = slideElement.getAttribute("data-css") || 0;
        const jsPct = slideElement.getAttribute("data-js") || 0;

        barHtml.style.width = `${htmlPct}%`;
        barCss.style.width = `${cssPct}%`;
        barJs.style.width = `${jsPct}%`;

        pctHtml.textContent = `${htmlPct}%`;
        pctCss.textContent = `${cssPct}%`;
        pctJs.textContent = `${jsPct}%`;

        repoCounter.textContent = `Proyecto ${slideIndex + 1} de ${totalSlides}`;
    }

    if (carouselElement) {
        carouselElement.addEventListener("slid.bs.carousel", (event) => {
            updateLanguageBar(event.relatedTarget, event.to);
        });

        const bsCarousel = bootstrap.Carousel.getOrCreateInstance(carouselElement, {
            interval: false,
            ride: false,
            pause: false
        });

        const pauseBtn = document.getElementById("carouselPauseBtn");
        const pauseIcon = document.getElementById("carouselPauseIcon");
        const pauseText = document.getElementById("carouselPauseText");
        let isPaused = false;

        let autoSlideTimer = setInterval(() => {
            if (!isPaused) {
                bsCarousel.next();
            }
        }, 4000);

        pauseBtn.addEventListener("click", () => {
            if (!isPaused) {
                isPaused = true;
                clearInterval(autoSlideTimer);
                pauseIcon.classList.remove("bi-pause-fill");
                pauseIcon.classList.add("bi-play-fill");
                pauseText.textContent = "Reanudar";
            } else {
                isPaused = false;
                autoSlideTimer = setInterval(() => {
                    if (!isPaused) {
                        bsCarousel.next();
                    }
                }, 4000);
                pauseIcon.classList.remove("bi-play-fill");
                pauseIcon.classList.add("bi-pause-fill");
                pauseText.textContent = "Pausar";
            }
        });
    }

    const consoleOutput = document.getElementById("consoleOutput");
    const cmdButtons = document.querySelectorAll(".cmd-chip");
    const clearConsoleBtn = document.getElementById("btnClearConsole");

    const jaimeAscii = `        __
     ,                    ," e\`--o
    ((                   (  | __,'
     \\\\~----------------' \\_;/
    (                      /
     /) ._______________.  )
    (( (               (( (
     \`\`-'               \`\`-'`;

    const consoleCommands = {
        camino: {
            command: "mi_camino()",
            output: `<strong>🚀 Evolución en el curso:</strong><br>
            Empecé creando estructuras estáticas con HTML puro, pasé a diseñar interfaces responsivas con CSS y Bootstrap, y hoy desarrollo lógica interactiva, arreglos y videojuegos web con JavaScript.`
        },
        habilidades: {
            command: "mis_habilidades()",
            output: `<strong>⚡ Stack & Herramientas:</strong><br>
            • Frontend: HTML5, CSS3, Bootstrap 5.3, JavaScript (ES6+)<br>
            • Control de versiones: Git y despliegue en GitHub Pages<br>
            • Flujo moderno: Debugging con DevTools e integración de IA`
        },
        intereses: {
            command: "fuera_del_codigo()",
            output: `<strong>🎯 Más allá de la pantalla:</strong><br>
            Me encanta resolver problemas lógicos, probar nuevas tecnologías, el diseño de interfaces limpias y salir a pasear con mi perro salchicha Jaime.`
        },
        jaime: {
            command: "llamar_a_jaime()",
            output: `<strong>🐾 Jaime (Senior Bug Inspector) se unió a la consola:</strong>
            <pre class="ascii-jaime">${jaimeAscii}</pre>
            <span class="text-accent small"><em>*Mueve la cola y aprueba este portfolio</em></span>`
        }
    };

    if (consoleOutput && cmdButtons.length > 0) {
        cmdButtons.forEach((btn) => {
            btn.addEventListener("click", () => {
                const key = btn.getAttribute("data-cmd");
                const data = consoleCommands[key];

                if (data) {
                    const cmdLine = document.createElement("div");
                    cmdLine.className = "console-line";
                    cmdLine.innerHTML = `<span class="console-prompt">&gt;</span><span class="console-cmd">${data.command}</span>`;

                    const resBox = document.createElement("div");
                    resBox.className = "console-response";
                    resBox.innerHTML = data.output;

                    consoleOutput.appendChild(cmdLine);
                    consoleOutput.appendChild(resBox);

                    consoleOutput.scrollTop = consoleOutput.scrollHeight;
                }
            });
        });

        if (clearConsoleBtn) {
            clearConsoleBtn.addEventListener("click", () => {
                consoleOutput.innerHTML = `
                    <div class="console-line text-muted small">
                        <span>Console was cleared.</span>
                    </div>
                `;
            });
        }
    }

    const btnCopyEmail = document.getElementById("btnCopyEmail");
    const userEmailText = document.getElementById("userEmailText");
    const copyBtnText = document.getElementById("copyBtnText");
    const copyIcon = document.getElementById("copyIcon");

    if (btnCopyEmail && userEmailText) {
        btnCopyEmail.addEventListener("click", () => {
            navigator.clipboard.writeText(userEmailText.textContent.trim()).then(() => {
                copyBtnText.textContent = "¡Copiado!";
                copyIcon.classList.remove("bi-clipboard");
                copyIcon.classList.add("bi-check2");

                setTimeout(() => {
                    copyBtnText.textContent = "Copiar";
                    copyIcon.classList.remove("bi-check2");
                    copyIcon.classList.add("bi-clipboard");
                }, 2000);
            });
        });
    }

    const motivoChips = document.querySelectorAll(".motivo-chip");
    const subjectInput = document.getElementById("contactSubject");

    motivoChips.forEach((chip) => {
        chip.addEventListener("click", () => {
            motivoChips.forEach(c => c.classList.remove("active"));
            chip.classList.add("active");
            if (subjectInput) {
                subjectInput.value = chip.getAttribute("data-motivo");
                validateField(subjectInput, subjectInput.value.trim().length > 0);
            }
        });
    });

    const messageInput = document.getElementById("contactMessage");
    const charCounter = document.getElementById("charCounter");

    if (messageInput && charCounter) {
        messageInput.addEventListener("input", () => {
            const len = messageInput.value.length;
            charCounter.textContent = `${len} / 300`;
            charCounter.classList.toggle("text-warning", len > 240 && len < 300);
            charCounter.classList.toggle("text-danger", len === 300);
        });
    }

    function validateField(input, isValid) {
        if (isValid) {
            input.classList.remove("is-invalid");
            input.classList.add("is-valid");
        } else {
            input.classList.remove("is-valid");
            input.classList.add("is-invalid");
        }
        return isValid;
    }

    const contactForm = document.getElementById("contactForm");
    const nameInput = document.getElementById("contactName");
    const emailInput = document.getElementById("contactEmail");
    const formSuccessBox = document.getElementById("formSuccessBox");
    const successTitle = document.getElementById("successTitle");
    const successBody = document.getElementById("successBody");
    const btnResetForm = document.getElementById("btnResetForm");
    const submitBtnText = document.getElementById("submitBtnText");
    const submitSpinner = document.getElementById("submitSpinner");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (contactForm) {
        nameInput.addEventListener("input", () => validateField(nameInput, nameInput.value.trim().length >= 2));
        emailInput.addEventListener("input", () => validateField(emailInput, emailRegex.test(emailInput.value.trim())));
        subjectInput.addEventListener("input", () => validateField(subjectInput, subjectInput.value.trim().length > 0));
        messageInput.addEventListener("input", () => validateField(messageInput, messageInput.value.trim().length >= 10));

        contactForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const isNameOk = validateField(nameInput, nameInput.value.trim().length >= 2);
            const isEmailOk = validateField(emailInput, emailRegex.test(emailInput.value.trim()));
            const isSubjectOk = validateField(subjectInput, subjectInput.value.trim().length > 0);
            const isMsgOk = validateField(messageInput, messageInput.value.trim().length >= 10);

            if (isNameOk && isEmailOk && isSubjectOk && isMsgOk) {
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                if (submitBtn) submitBtn.disabled = true;
                submitBtnText.textContent = "Enviando... ";
                submitSpinner.classList.remove("d-none");

                try {
                    const formData = new FormData(contactForm);
                    const data = Object.fromEntries(formData.entries());

                    const response = await fetch(contactForm.action, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json"
                        },
                        body: JSON.stringify(data)
                    });

                    if (response.ok) {
                        const userName = nameInput.value.trim();
                        contactForm.classList.add("d-none");
                        formSuccessBox.classList.remove("d-none");

                        successTitle.textContent = `¡Gracias por tu mensaje, ${userName}!`;
                        successBody.textContent = `Recibimos tu consulta sobre "${subjectInput.value.trim()}". Jaime y yo te responderemos pronto.`;
                    } else {
                        alert("Hubo un problema al enviar el mensaje. Intentá de nuevo.");
                    }
                } catch (error) {
                    alert("Error de conexión. Revisá tu internet e intentá de nuevo.");
                } finally {
                    if (submitBtn) submitBtn.disabled = false;
                    submitBtnText.innerHTML = `<i class="bi bi-send-fill me-2"></i>Enviar mensaje`;
                    submitSpinner.classList.add("d-none");
                }
            }
        });

        if (btnResetForm) {
            btnResetForm.addEventListener("click", () => {
                contactForm.reset();
                [nameInput, emailInput, subjectInput, messageInput].forEach(el => {
                    el.classList.remove("is-valid", "is-invalid");
                });
                motivoChips.forEach(c => c.classList.remove("active"));
                charCounter.textContent = "0 / 300";
                charCounter.classList.remove("text-warning", "text-danger");
                formSuccessBox.classList.add("d-none");
                contactForm.classList.remove("d-none");
            });
        }
    }
