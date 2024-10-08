document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    const sections = document.querySelectorAll('section');
    const menuContainer = document.querySelector('.menu-container');
    const galeriaContainer = document.querySelector('.galeria-container');
    const eventosContainer = document.querySelector('.eventos-container');
    const testimoniosContainer = document.querySelector('.testimonios-container');

    // Inicializar EmailJS
    emailjs.init("jD1Hs7P5wwDsHzM2m");

    // Navegación
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');

        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        burger.classList.toggle('toggle');
    });

    // Scroll suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Animación de entrada para secciones
    const appearOptions = {
        threshold: 0.5,
        rootMargin: "0px 0px -100px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    sections.forEach(section => {
        appearOnScroll.observe(section);
    });

    // Generar menú de hamburguesas
    const hamburguesas = [
        { nombre: "Hamburguesa Clásica", descripcion: "Nuestra deliciosa hamburguesa clásica con carne jugosa y vegetales frescos.", precio: "S/. 15.90" },
        { nombre: "Hamburguesa con Queso", descripcion: "Una explosión de sabor con nuestro queso especial derretido.", precio: "S/. 17.90" },
        { nombre: "Hamburguesa Vegana", descripcion: "Opción saludable y deliciosa para los amantes de las verduras.", precio: "S/. 16.90" },
        { nombre: "Hamburguesa BBQ", descripcion: "Deliciosa hamburguesa con salsa BBQ casera y aros de cebolla crujientes.", precio: "S/. 18.90" },
        { nombre: "Hamburguesa Doble", descripcion: "Para los más hambrientos, con doble carne y doble queso.", precio: "S/. 22.90" },
        { nombre: "Hamburguesa de Pollo", descripcion: "Jugosa hamburguesa de pollo con aderezo especial.", precio: "S/. 16.90" },
        { nombre: "Hamburguesa Picante", descripcion: "Para los amantes del picante, con jalapeños y salsa especial.", precio: "S/. 17.90" },
        { nombre: "Hamburguesa Hawaiana", descripcion: "Con piña a la parrilla y salsa teriyaki.", precio: "S/. 18.90" },
        { nombre: "Hamburguesa Mediterránea", descripcion: "Con queso feta, aceitunas y aderezo de yogur.", precio: "S/. 19.90" },
        { nombre: "Hamburguesa de Pescado", descripcion: "Filete de pescado empanizado con salsa tártara casera.", precio: "S/. 17.90" },
        { nombre: "Hamburguesa de Pavo", descripcion: "Opción más ligera con carne de pavo y vegetales frescos.", precio: "S/. 18.90" },
        { nombre: "Hamburguesa Mexicana", descripcion: "Con guacamole, pico de gallo y jalapeños.", precio: "S/. 19.90" },
        { nombre: "Hamburguesa de Champiñones", descripcion: "Para los amantes de los champiñones, con queso suizo.", precio: "S/. 18.90" },
        { nombre: "Hamburguesa de la Casa", descripcion: "Nuestra especialidad con ingredientes secretos.", precio: "S/. 21.90" },
        { nombre: "Mini Hamburguesas", descripcion: "Trío de mini hamburguesas con diferentes sabores.", precio: "S/. 23.90" }
    ];

    const imagenes = [
        "https://www.carniceriademadrid.es/wp-content/uploads/2022/09/smash-burger-que-es.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpVpFvtjBJz5UDWTLADFMDmz8TH4UGL0itvA&s"
    ];

    hamburguesas.forEach((hamburguesa, index) => {
        const menuItem = document.createElement('div');
        menuItem.classList.add('menu-item');
        menuItem.innerHTML = `
            <div class="menu-item-image">
                <img src="${imagenes[index % 2]}" alt="${hamburguesa.nombre}">
            </div>
            <h3>${hamburguesa.nombre}</h3>
            <p>${hamburguesa.descripcion}</p>
            <span class="precio">${hamburguesa.precio}</span>
            <a href="#" class="ver-mas" data-id="${index}">Ver más</a>
        `;
        menuContainer.appendChild(menuItem);
    });

    // Generar galería
    for (let i = 0; i < 6; i++) {
        const galeriaItem = document.createElement('div');
        galeriaItem.classList.add('galeria-item');
        galeriaItem.innerHTML = `
            <img src="${imagenes[i % 2]}" alt="Imagen de galería ${i + 1}">
        `;
        galeriaContainer.appendChild(galeriaItem);
    }

    // Generar eventos
    const eventos = [
        { nombre: "Noche de Hamburguesas 2x1", fecha: "Todos los martes" },
        { nombre: "Concurso de Comer Hamburguesas", fecha: "15 de julio" },
        { nombre: "Taller de Hamburguesas Gourmet", fecha: "5 de agosto" }
    ];

    eventos.forEach(evento => {
        const eventoItem = document.createElement('div');
        eventoItem.classList.add('evento-item');
        eventoItem.innerHTML = `
            <h3>${evento.nombre}</h3>
            <p>${evento.fecha}</p>
        `;
        eventosContainer.appendChild(eventoItem);
    });

    // Mostrar detalles del menú
    menuContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('ver-mas')) {
            e.preventDefault();
            const id = e.target.getAttribute('data-id');
            const hamburguesa = hamburguesas[id];
            const menuDetalle = document.createElement('div');
            menuDetalle.classList.add('menu-detalle');
            menuDetalle.innerHTML = `
                <span class="cerrar-detalle">&times;</span>
                <div class="menu-detalle-content">
                    <img src="${imagenes[id % 2]}" alt="${hamburguesa.nombre}">
                    <div class="menu-detalle-info">
                        <h2>${hamburguesa.nombre}</h2>
                        <p>${hamburguesa.descripcion}</p>
                        <span class="precio">${hamburguesa.precio}</span>
                        <button class="ordenar-btn">Ordenar ahora</button>
                    </div>
                </div>
            `;
            document.body.appendChild(menuDetalle);
            menuDetalle.classList.add('active');

            // Cerrar detalle
            menuDetalle.querySelector('.cerrar-detalle').addEventListener('click', () => {
                menuDetalle.remove();
            });

            // Botón "Ordenar ahora"
            menuDetalle.querySelector('.ordenar-btn').addEventListener('click', () => {
                const mensaje = `Hola, me gustaría ordenar una ${hamburguesa.nombre}. Precio: ${hamburguesa.precio}\n\nImagen del producto: ${imagenes[id % 2]}`;
                const whatsappLink = `https://wa.me/51934498803?text=${encodeURIComponent(mensaje)}`;
                window.open(whatsappLink, '_blank');
            });
        }
    });

    // Manejar envío del formulario de contacto
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        emailjs.sendForm('service_2lfxcyj', 'template_uy8d2yd', this)
            .then(function() {
                alert('Mensaje enviado con éxito!');
                contactForm.reset();
            }, function(error) {
                alert('Error al enviar el mensaje: ' + error);
            });
    });

    // Cargar testimonios guardados
    const testimonios = JSON.parse(localStorage.getItem('testimonios')) || [
        { nombre: "María", testimonio: "¡Las mejores hamburguesas que he probado!" },
        { nombre: "Juan", testimonio: "El ambiente es increíble, volveré pronto." },
        { nombre: "Ana", testimonio: "Excelente servicio y comida deliciosa." }
    ];

    function mostrarTestimonios() {
        testimoniosContainer.innerHTML = '';
        testimonios.forEach(testimonio => {
            const testimonioItem = document.createElement('div');
            testimonioItem.classList.add('testimonio-item');
            testimonioItem.innerHTML = `
                <h3>${testimonio.nombre}</h3>
                <p>${testimonio.testimonio}</p>
            `;
            testimoniosContainer.appendChild(testimonioItem);
        });
    }

    mostrarTestimonios();

    // Manejar envío de nuevo testimonio
    const testimonioForm = document.getElementById('testimonioForm');
    testimonioForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const nombre = this.querySelector('input[name="nombre"]').value;
        const testimonio = this.querySelector('textarea[name="testimonio"]').value;
        
        testimonios.push({ nombre, testimonio });
        localStorage.setItem('testimonios', JSON.stringify(testimonios));
        
        mostrarTestimonios();
        
        this.reset();
    });
});