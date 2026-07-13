document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('supportForm');
    if (!form) return;

    const modal = document.getElementById('successModal');
    const closeModal = document.getElementById('closeModal');

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Отменяем стандартную отправку

        // Сбор данных
        const fullname = document.getElementById('fullname').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        const agreement = document.getElementById('agreement').checked;

        if (!fullname || !email || !subject || !message || !agreement) {
            alert('Заполните все обязательные поля и примите согласие');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/support', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fullname, email, subject, message })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Ошибка отправки');
            }

            modal.classList.add('active');
            form.reset();

        } catch (error) {
            console.error('Ошибка:', error);
            alert('Не удалось отправить заявку. Попробуйте позже.');
        }
    });

    // Закрытие модалки
    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
});