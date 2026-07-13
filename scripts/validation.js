document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('feedbackForm');

    if (!form) return;

    const modal = document.getElementById('successModal');

    const closeModal = document.getElementById('closeModal');

    form.addEventListener('submit', async (event) => {

        event.preventDefault();

        const fullname = document
            .getElementById('fullname')
            .value
            .trim();

        const email = document
            .getElementById('email')
            .value
            .trim();

        const company = document
            .getElementById('company')
            .value
            .trim();

        const message = document
            .getElementById('message')
            .value
            .trim();

        const agreement = document
            .getElementById('agreement')
            .checked;

        if (
            !fullname ||
            !email ||
            !message ||
            !agreement
        ) {

            alert('Заполните все обязательные поля');

            return;
        }

        try {

            const response = await fetch(
                'http://localhost:3000/api/contact',
                {
                    method: 'POST',

                    headers: {
                        'Content-Type': 'application/json'
                    },

                    body: JSON.stringify({
                        fullname,
                        email,
                        company,
                        message
                    })
                }
            );

            if (!response.ok) {
                throw new Error();
            }

            modal.classList.add('active');

            form.reset();

        } catch {

            alert('Ошибка отправки заявки');

        }

    });

    closeModal.addEventListener('click', () => {

        modal.classList.remove('active');

    });

});