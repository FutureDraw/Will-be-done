document.addEventListener("DOMContentLoaded", function () {

    /* ===== BURGER MENU ===== */

    const burger = document.querySelector('#burger');
    const nav = document.querySelector('#navMenu');

    if (burger && nav) {
        burger.addEventListener('click', () => {
            burger.classList.toggle('is-active');
            nav.classList.toggle('is-active');
        });
    }


    /* ===== СМЕНА ТЕКСТА В HERO ===== */

    const texts = [
        "цифровые продукты для бизнеса",
        "цифровые продукты для тебя",
        "и там бла бла бла"
    ];

    const changingText = document.getElementById("changing-text");

    if (changingText) {

        let index = 0;

        setInterval(() => {

            changingText.classList.add("fade-out");

            setTimeout(() => {

                index = (index + 1) % texts.length;
                changingText.textContent = texts[index];

                changingText.classList.remove("fade-out");
                changingText.classList.add("fade-in");

                setTimeout(() => {
                    changingText.classList.remove("fade-in");
                }, 600);

            }, 600);

        }, 4000);
    }


    /* ===== FAQ ===== */

    const faqItems = document.querySelectorAll(".faq-item");

    if (faqItems.length > 0) {

        faqItems.forEach(item => {

            const question = item.querySelector(".faq-question");

            if (question) {
                question.addEventListener("click", () => {

                    faqItems.forEach(el => {
                        if (el !== item) {
                            el.classList.remove("active");
                        }
                    });

                    item.classList.toggle("active");
                });
            }
        });
    }


    /* ===== GLITCH 404 ===== */

    const glitch = document.querySelector(".glitch");

    if (glitch) {

        function randomGlitch() {

            glitch.classList.add("active");

            setTimeout(() => {
                glitch.classList.remove("active");
            }, 400);

            const next = Math.random() * 4000 + 5000;
            setTimeout(randomGlitch, next);
        }

        randomGlitch();
    }


    /* ===== STARS 404 ===== */

    const canvas = document.getElementById("stars");

    if (canvas) {

        const ctx = canvas.getContext("2d");

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        resize();
        window.addEventListener("resize", resize);

        const stars = [];

        for (let i = 0; i < 180; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 1.5,
                speed: Math.random() * 0.08 + 0.05
            });
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            stars.forEach(star => {

                star.x += star.speed;

                if (star.x > canvas.width) {
                    star.x = 0;
                    star.y = Math.random() * canvas.height;
                }

                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = "white";
                ctx.fill();
            });

            requestAnimationFrame(draw);
        }

        draw();
    }

});
