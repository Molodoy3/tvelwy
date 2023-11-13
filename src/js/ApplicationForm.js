"use strict";

window.addEventListener("load", () => {
    const ApplicationForm = document.forms.ApplicationForm;
    if (ApplicationForm) {


        ApplicationForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const dataApplicationForm = new FormData(ApplicationForm);
            const resultValidateForm = validatePostForm(dataApplicationForm);


            if (resultValidateForm) {
                //Валидация прошла:
                /*const n = new XMLHttpRequest,
                o = "/send.php";
                n.open("POST", o, true),
                    n.send(dataApplicationForm),

                    n.onload = function () {
                        if (n.responseText == 'ok') {
                            console.log('sucsess'),
                                console.log(n.responseText),
                                ApplicationForm.innerHTML = "<p style='padding:10px 10px;text-align:center'>Заявка успешно отправлена!</p>";
                        }
                        else {
                            console.log('error'),
                                console.log(n.responseText),
                                ApplicationForm.innerHTML = "<p style='padding:10px 10px;text-align:center'>" + n.responseText + "</p>"
                        }
                    }*/
                    ApplicationForm.innerHTML = "<p style='padding:10px 10px;text-align:center'>Заявка успешно отправлена!</p>";

            }
        });
    }

    function validatePostForm(dataAddPostForm) {
        const name = dataAddPostForm.get("name");
        const phone = dataAddPostForm.get("phone").replace(/\D/g, "");
        let errors = 0;

        if (name.length < 2 || name.length > 100) {
            ApplicationForm.querySelector(`[name="name"]`).classList.add("error");
            errors++;
        } else {
            ApplicationForm.querySelector(`[name="name"]`).classList.remove("error");
        }


        if (!/^\d{10,15}$/.test(phone)) {
            ApplicationForm.querySelector(`[name="phone"]`).classList.add("error");
            errors++;
        } else {
            ApplicationForm.querySelector(`[name="phone"]`).classList.remove("error");
        }

        if (errors > 0) return false;

        return true;
    }
});