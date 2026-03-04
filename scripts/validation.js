document.addEventListener('DOMContentLoaded', function () {

    const form = document.getElementById('feedbackForm');
    if (!form) return;

    form.addEventListener('submit', function (event) {

        event.preventDefault();

        document.querySelectorAll('.is-danger').forEach(el => {
            el.classList.remove('is-danger');
        });

        document.querySelectorAll('.help.is-danger').forEach(el => el.remove());

        let isValid = true;

        const fullname = document.getElementById('fullname');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        const agreement = document.getElementById('agreement');

        const fullnameValue = fullname.value.trim();
        const emailValue = email.value.trim();

        if (fullnameValue === '' || fullnameValue.split(' ').length < 2) {
            showError(fullname, 'Введите имя и фамилию');
            isValid = false;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (emailValue === '') {
            showError(email, 'Введите email');
            isValid = false;
        } else if (!emailPattern.test(emailValue)) {
            showError(email, 'Введите корректный email');
            isValid = false;
        }

        if (!agreement.checked) {
            alert('Необходимо согласие на обработку данных');
            isValid = false;
        }

        if (isValid) {

            const formData = {
                fullname: fullnameValue,
                email: emailValue,
                company: document.getElementById('company').value.trim() || '(не указано)',
                message: message.value.trim() || '(без сообщения)'
            };

            const customEvent = new CustomEvent('formValid', { detail: formData });
            document.dispatchEvent(customEvent);

            const modal = document.getElementById('successModal');
            modal.classList.add('active');

            form.reset();
        }

    });

    function showError(input, message) {
        input.classList.add('is-danger');

        const help = document.createElement('p');
        help.classList.add('help', 'is-danger');
        help.textContent = message;

        input.parentNode.appendChild(help);
    }

    const closeModalBtn = document.getElementById('closeModal');
    const modal = document.getElementById('successModal');

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function () {
            modal.classList.remove('active');
        });
    }

});