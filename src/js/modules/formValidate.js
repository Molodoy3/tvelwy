export function formValidate() {
    const forms = document.forms;
    if (forms.length) {
        let form = forms[0];
        for (let index = 0; index < forms.length; index++) {
            form = forms[index];
            form.addEventListener('submit', formSend);
        }
        function formSend(e) {
            e.preventDefault();
            let errors = formValidate(form);
            if (errors === 0) {
                /* alert('письмо отправлено');
                form.reset();
                const errorElements = form.querySelectorAll('.error-element');
                if(errorElements.length){
                    errorElements.forEach(item => {
                        item.remove();
                    });
                } */
            } else {
                form.classList.add('error');
            }
        }
        function formValidate(form) {
            let errors = 0;
            const formReq = form.querySelectorAll('.req');

            if (formReq.length) {
                for (let index = 0; index < formReq.length; index++) {
                    const input = formReq[index];
                    formRemoveError(input);
                    if (input.classList.contains('contact')) {
                        if (emailTest(input) && phoneTest(input)) {
                            formAddError(input);
                            errors++;
                        }
                    } else if (input.classList.contains('select')) {
                        if (input.options[input.selectedIndex].disabled) {
                            formAddError(input);
                            errors++;
                        }
                    }
                    else if (input.dataset.validateMin) {
                        const validateMinValue = input.dataset.validateMin;
                        if (input.value.length < validateMinValue) {
                            formAddError(input);
                            errors++;
                            if (input.dataset.textError) {
                                const textError = input.dataset.textError;
                                const errorElementOld = input.parentElement.querySelector('.error-element');
                                if (errorElementOld) {
                                    errorElementOld.remove();
                                }
                                input.insertAdjacentHTML(
                                    'afterend',
                                    `<div class="error-element">${textError}</div>`
                                )
                            }
                        } else {
                            const errorElementOld = input.parentElement.querySelector('.error-element');
                            if (errorElementOld) {
                                errorElementOld.remove();
                            }
                        }
                    } else if (input.value === '') {
                        formAddError(input);
                        errors++;
                    }
                }
                return (errors);
            }

        }
        function formRemoveError(input) {
            input.classList.remove('error');
            input.parentElement.classList.remove('error');
        }
        function formAddError(input) {
            input.classList.add('error');
            input.parentElement.classList.add('error');
        }
        function emailTest(input) {
            return !/^\w+([\.*]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
        }
        function phoneTest(input) {
            // Удаляем все символы, кроме цифр
            const phoneNumber = input.value.replace(/\D/g, '');
            
            // Проверяем, что номер содержит от 10 до 15 цифр
            if (/^\d{10,15}$/.test(phoneNumber)) {
              return false;
            } else {
              return true;
            }
          }
    }
}


