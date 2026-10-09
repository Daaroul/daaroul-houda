
/* =====================================================
   DAAROUL HOUDA
   JavaScript du site
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    // =================================================
    // ANIMATION DES SECTIONS AU DEFILEMENT
    // =================================================

    const sections = document.querySelectorAll(".section");

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                    }

                });

            },
            { threshold: 0.15 }
        );

        sections.forEach(function (section) {
            observer.observe(section);
        });

    } else {

        sections.forEach(function (section) {
            section.classList.add("visible");
        });

    }


    // =================================================
    // MENU ACTIF
    // =================================================

    const menuLinks = document.querySelectorAll("nav a");

    menuLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            menuLinks.forEach(function (item) {
                item.classList.remove("active");
            });

            this.classList.add("active");

        });

    });


    // =================================================
    // BOUTON RETOUR EN HAUT
    // =================================================

    const topButton = document.getElementById("topButton");

    if (topButton) {

        window.addEventListener("scroll", function () {

            if (window.scrollY > 400) {
                topButton.classList.add("show");
            } else {
                topButton.classList.remove("show");
            }

        });

        topButton.addEventListener("click", function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    // =================================================
    // ANNEE AUTOMATIQUE DU FOOTER
    // =================================================

    const yearElement = document.getElementById("annee");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    // =================================================
    // FORMULAIRE DE CONTACT
    // Compatible avec les identifiants de ton HTML
    // =================================================

    const contactForm = document.getElementById("contactForm");
    const formMessage = document.getElementById("formMessage");

    if (contactForm) {

        contactForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const nomElement = document.getElementById("nom");
            const emailElement = document.getElementById("email");
            const telephoneElement = document.getElementById("telephone");
            const messageElement = document.getElementById("message");

            if (
                !nomElement ||
                !emailElement ||
                !telephoneElement ||
                !messageElement
            ) {
                if (formMessage) {
                    formMessage.textContent =
                        "Erreur : certains champs du formulaire sont introuvables.";
                    formMessage.style.color = "#dc2626";
                }
                return;
            }

            const nom = nomElement.value.trim();
            const email = emailElement.value.trim();
            const telephone = telephoneElement.value.trim();
            const message = messageElement.value.trim();

            if (!nom || !email || !telephone || !message) {

                if (formMessage) {
                    formMessage.textContent =
                        "Veuillez remplir tous les champs obligatoires.";
                    formMessage.style.color = "#dc2626";
                }

                return;
            }

            if (!emailElement.checkValidity()) {

                if (formMessage) {
                    formMessage.textContent =
                        "Veuillez saisir une adresse e-mail valide.";
                    formMessage.style.color = "#dc2626";
                }

                return;
            }

            /*
             * IMPORTANT :
             * Ce formulaire affiche une confirmation locale.
             * Il n'envoie pas encore le message à l'institut.
             * Un backend ou un service d'envoi sera nécessaire.
             */

            if (formMessage) {
                formMessage.textContent =
                    "Votre formulaire est rempli. L'envoi réel du message nécessite encore une connexion au serveur.";
                formMessage.style.color = "#0b5ed7";
            }

        });

    }


    // =================================================
    // MESSAGE DE BIENVENUE DANS LA CONSOLE
    // =================================================

    console.log(
        "Bienvenue sur le site de l'Institut Islamique DAAROUL HOUDA."
    );

});


/* =====================================================
   DIAPORAMA DE LA GALERIE
===================================================== */

let slideActuelle = 1;

function afficherSlide(numero) {

    const slides = document.querySelectorAll("#galerie .slide");
    const points = document.querySelectorAll("#galerie .point");

    if (slides.length === 0) {
        return;
    }

    if (numero > slides.length) {
        numero = 1;
    }

    if (numero < 1) {
        numero = slides.length;
    }

    slideActuelle = numero;

    slides.forEach(function (slide) {
        slide.classList.remove("active");
    });

    points.forEach(function (point) {
        point.classList.remove("active-point");
    });

    slides[slideActuelle - 1].classList.add("active");

    if (points[slideActuelle - 1]) {
        points[slideActuelle - 1].classList.add("active-point");
    }

}

function changerSlide(direction) {
    afficherSlide(slideActuelle + direction);
}


/* =====================================================
   DIAPORAMA AUTOMATIQUE
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const galerie = document.getElementById("galerie");

    if (!galerie) {
        return;
    }

    const slides = galerie.querySelectorAll(".slide");

    if (slides.length === 0) {
        return;
    }

    afficherSlide(slideActuelle);

    if (slides.length > 1) {

        setInterval(function () {
            afficherSlide(slideActuelle + 1);
        }, 4000);

    }

});
