// Efectos de la página
window.addEventListener("DOMContentLoaded", () => {
    // Animación de aparición de la página
    document.body.style.opacity = "0";
    document.body.style.transition = "opacity 1s ease-in-out";
    window.addEventListener("load", () => {
        document.body.style.opacity = "1";
    });

    // Obtener todas las secciones con animación
    const sections = document.querySelectorAll(".section-transition");
    const instagram = document.getElementById("instagram");
    const footer = document.getElementById("footer");
    const contactSection = document.getElementById("contact");

    // Inicializar opacidad y transformación de las secciones
    sections.forEach((section) => {
        section.style.opacity = "0";
        section.style.transform = "translateY(20px)";
    });

    instagram.style.opacity = "0"; // Ocultar Instagram inicialmente
    instagram.style.transform = "translateY(20px)";

    footer.style.opacity = "0"; // Ocultar footer inicialmente
    footer.style.transform = "translateY(20px)";

    // Función para activar animaciones en el scroll
    const handleScroll = () => {
        sections.forEach((section) => {
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.8) {
                section.style.opacity = "1";
                section.style.transform = "translateY(0)";
                section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
            }
        });

        // Activar Instagram y footer solo cuando "Contacto" esté visible
        const contactRect = contactSection.getBoundingClientRect();
        if (contactRect.top < window.innerHeight * 0.8) {
            instagram.style.opacity = "1";
            instagram.style.transform = "translateY(0)";
            instagram.style.transition = "opacity 0.6s ease, transform 0.6s ease";

            footer.style.opacity = "1";
            footer.style.transform = "translateY(0)";
            footer.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        } else {
            instagram.style.opacity = "0";
            instagram.style.transform = "translateY(20px)";

            footer.style.opacity = "0";
            footer.style.transform = "translateY(20px)";
        }
    };

    // Aplicar evento de scroll y carga inicial
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("load", handleScroll);

    // Navbar shrink function
    const navbarShrink = () => {
        const navbarCollapsible = document.querySelector("#mainNav");
        const logo = document.querySelector(".navbar-brand img");

        if (!navbarCollapsible || !logo) {
            return;
        }

        if (window.scrollY === 0 && window.innerWidth > 768) {
            navbarCollapsible.classList.remove("navbar-shrink");
            logo.src = "assets/Imagotipo-2.png";
        } else {
            navbarCollapsible.classList.add("navbar-shrink");
            logo.src = "assets/Imagotipo-4.png";
        }
    };

    // Inicializar navbar shrink
    navbarShrink();
    window.addEventListener("scroll", navbarShrink);
    window.addEventListener("resize", navbarShrink);

    // Activar Bootstrap Scrollspy en el navbar
    const mainNav = document.querySelector("#mainNav");
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: "#mainNav",
            rootMargin: "0px 0px -40%",
        });
    }

    // Cerrar el navbar responsive cuando un ítem es clickeado
    const navbarToggler = document.querySelector(".navbar-toggler");
    const responsiveNavItems = document.querySelectorAll(
        "#navbarResponsive .nav-link"
    );
    responsiveNavItems.forEach((navItem) => {
        navItem.addEventListener("click", () => {
            if (window.getComputedStyle(navbarToggler).display !== "none") {
                navbarToggler.click();
            }
        });
    });

    // Activar el plugin SimpleLightbox para los ítems del portfolio
    new SimpleLightbox({
        elements: "#portfolio a.portfolio-box",
    });
});

// Formulario
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");

    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // Evita el envío automático si hay errores

        let isValid = true;

        // Validar nombre
        const name = document.getElementById("name");
        if (name.value.trim() === "") {
            name.classList.add("is-invalid");
            isValid = false;
        } else {
            name.classList.remove("is-invalid");
        }

        // Validar correo
        const email = document.getElementById("email");
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email.value.trim())) {
            email.classList.add("is-invalid");
            isValid = false;
        } else {
            email.classList.remove("is-invalid");
        }

        // Validar teléfono
        const phone = document.getElementById("phone");
        const phonePattern = /^[0-9]+$/;
        if (!phonePattern.test(phone.value.trim())) {
            phone.classList.add("is-invalid");
            isValid = false;
        } else {
            phone.classList.remove("is-invalid");
        }

        // Validar mensaje
        const message = document.getElementById("message");
        if (message.value.trim() === "") {
            message.classList.add("is-invalid");
            isValid = false;
        } else {
            message.classList.remove("is-invalid");
        }

        // Enviar formulario al backend
        if (isValid) {
            const data = {
                name: name.value.trim(),
                email: email.value.trim(),
                phone: phone.value.trim(),
                message: message.value.trim()
            };

            try {
                const res = await fetch("/send-email", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data)
                });

                if (res.ok) {
                    alert("Mensaje enviado correctamente. Pronto nos pondremos en contacto.");
                    form.reset();
                } else {
                    alert("Ocurrió un error al enviar el mensaje. Por favor, intentá nuevamente.");
                }
            } catch (err) {
                alert("No se pudo conectar con el servidor. Verificá tu conexión.");
            }
        }
    });
});

