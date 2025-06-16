// Efectos de la pagina

window.addEventListener("DOMContentLoaded", () => {
    // Animación de aparición de la página
    document.body.style.opacity = "0";
    document.body.style.transition = "opacity 1s ease-in-out";
    window.addEventListener("load", () => {
        document.body.style.opacity = "1";
    });

    // Obtener todas las secciones con animación
    const sections = document.querySelectorAll(".section-transition");

    // Inicializar opacidad y transformación de las secciones
    sections.forEach((section) => {
        section.style.opacity = "0";
        section.style.transform = "translateY(20px)";
    });

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
    };

    // Aplicar evento de scroll y carga inicial
    document.addEventListener("scroll", handleScroll);
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
    document.addEventListener("scroll", navbarShrink);
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

    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Evita el envío automático si hay errores

        let isValid = true;

        // Validar nombre (no debe estar vacío)
        const name = document.getElementById("name");
        if (name.value.trim() === "") {
            name.classList.add("is-invalid");
            isValid = false;
        } else {
            name.classList.remove("is-invalid");
        }

        // Validar correo (debe ser un email válido)
        const email = document.getElementById("email");
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Patrón básico de email
        if (!emailPattern.test(email.value.trim())) {
            email.classList.add("is-invalid");
            isValid = false;
        } else {
            email.classList.remove("is-invalid");
        }

        // Validar teléfono (solo debe contener números)
        const phone = document.getElementById("phone");
        const phonePattern = /^[0-9]+$/; // Expresión regular: solo números
        if (!phonePattern.test(phone.value.trim())) {
            phone.classList.add("is-invalid");
            isValid = false;
        } else {
            phone.classList.remove("is-invalid");
        }

        // Validar mensaje (no debe estar vacío)
        const message = document.getElementById("message");
        if (message.value.trim() === "") {
            message.classList.add("is-invalid");
            isValid = false;
        } else {
            message.classList.remove("is-invalid");
        }

        // Si todo está correcto, muestra un mensaje y reinicia el formulario
        if (isValid) {
            alert("Formulario enviado correctamente."); // Puedes reemplazar esto con una llamada AJAX
            form.reset(); // Limpia los campos después del envío
        }
    });
});
