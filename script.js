// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.12.0/firebase-analytics.js";
import { getFirestore, collection, addDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/9.12.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqTkPtfaF69PlUMdEL3UBsk-h39JvLbts",
  authDomain: "hambur-galactica.firebaseapp.com",
  projectId: "hambur-galactica",
  storageBucket: "hambur-galactica.appspot.com",
  messagingSenderId: "61733671458",
  appId: "1:61733671458:web:6505e45146bd5975c0707b",
  measurementId: "G-ZGX6Y9WLNK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

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
                // Define el número de WhatsApp y el mensaje
                const numeroWhatsApp = '+51934498803';
                const mensaje = `¡Gracias por ordenar la ${hamburguesa.nombre}! \nPrecio: S/. ${hamburguesa.precio} \nCantidad: ${cantidadSeleccionada}`; // Cambia 'cantidadSeleccionada' por la variable que almacena la cantidad seleccionada

                // Crea la URL para redirigir a WhatsApp
                const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;

                // Redirige a WhatsApp
                window.open(urlWhatsApp, '_blank');

                // Opcional: Puedes eliminar el menú después de la orden
                menuDetalle.remove();
            });

        }
    });

    // Manejar envío de formulario de contacto
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nombre = contactForm.nombre.value;
        const email = contactForm.email.value;
        const mensaje = contactForm.mensaje.value;

        emailjs.send("service_id", "template_id", {
            from_name: nombre,
            from_email: email,
            message: mensaje
        }).then(
            function(response) {
                console.log("SUCCESS", response);
                alert("Mensaje enviado con éxito!");
                contactForm.reset();
            },
            function(error) {
                console.log("FAILED", error);
                alert("Error al enviar el mensaje. Por favor, intenta de nuevo.");
            }
        );
    });

    // Manejar envío de testimonios y mostrarlos en tiempo real
    const testimonioForm = document.getElementById('testimonioForm');
    testimonioForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nombre = testimonioForm.nombre.value;
        const testimonio = testimonioForm.testimonio.value;

        try {
            await addDoc(collection(db, "testimonios"), {
                nombre: nombre,
                testimonio: testimonio,
                fecha: new Date()
            });
            testimonioForm.reset();
            alert("¡Gracias por tu testimonio!");
        } catch (error) {
            console.error("Error al añadir testimonio: ", error);
            alert("Error al enviar el testimonio. Por favor, intenta de nuevo.");
        }
    });

    // Escuchar cambios en tiempo real en los testimonios
    onSnapshot(collection(db, "testimonios"), (snapshot) => {
        testimoniosContainer.innerHTML = '';
        snapshot.forEach((doc) => {
            const testimonioData = doc.data();
            const testimonioItem = document.createElement('div');
            testimonioItem.classList.add('testimonio-item');
            testimonioItem.innerHTML = `
                <p>"${testimonioData.testimonio}"</p>
                <span>- ${testimonioData.nombre}</span>
            `;
            testimoniosContainer.appendChild(testimonioItem);
        });
    });
});