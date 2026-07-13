(function() {
        const allProjects = [
            { src: 'assets/Portfolio/CorpSites.avif', alt: 'Корпоративный сайт' },
            { src: 'assets/Portfolio/InternetShop.png', alt: 'Интернет-магазин' },
            { src: 'assets/Portfolio/CRM.png', alt: 'CRM-система' },
            { src: 'assets/Portfolio/Mobile1.png', alt: 'Корпоративное мобильное приложение' },
            { src: 'assets/Portfolio/Mobile2.png', alt: 'Сервис доставки' },
            { src: 'assets/Portfolio/Mobile3.png', alt: 'Маркетплейс' },
            { src: 'assets/Portfolio/Desktop1.jpg', alt: 'CRM для малого бизнеса' },
            { src: 'assets/Portfolio/Desktop2.png', alt: 'Система учёта' },
            { src: 'assets/Portfolio/Desktop3.webp', alt: 'Корпоративные инструменты' }
        ];

        const modal = document.getElementById('galleryModal');
        const galleryImg = document.getElementById('galleryImage');
        const counter = document.getElementById('slideCounter');
        const closeBtn = document.getElementById('closeGallery');
        const prevBtn = document.getElementById('prevSlide');
        const nextBtn = document.getElementById('nextSlide');

        let currentIndex = 0;

        function openGallery() {
            currentIndex = 0; // всегда начинаем с первой картинки
            updateSlide();
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeGallery() {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }

        function updateSlide() {
            const project = allProjects[currentIndex];
            galleryImg.src = project.src;
            galleryImg.alt = project.alt;
            counter.textContent = (currentIndex + 1) + ' / ' + allProjects.length;
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % allProjects.length;
            updateSlide();
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + allProjects.length) % allProjects.length;
            updateSlide();
        }


        document.querySelectorAll('.portfolio-card').forEach(card => {
            card.addEventListener('click', openGallery);
        });


        closeBtn.addEventListener('click', closeGallery);
        modal.addEventListener('click', function(e) {
            if (e.target === modal) closeGallery();
        });


        prevBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            prevSlide();
        });
        nextBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            nextSlide();
        });


        document.addEventListener('keydown', function(e) {
            if (!modal.classList.contains('active')) return;
            if (e.key === 'Escape') closeGallery();
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'ArrowRight') nextSlide();
        });
    })();