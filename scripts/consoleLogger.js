document.addEventListener('DOMContentLoaded', function () {

    document.addEventListener('formValid', function (event) {

        const data = event.detail;

        console.clear();
        console.log('=== НОВАЯ ЗАЯВКА ===');
        console.log('ФИО:', data.fullname);
        console.log('Email:', data.email);
        console.log('Компания:', data.company);
        console.log('Сообщение:', data.message);
        console.log('Время:', new Date().toLocaleString());

    });

});