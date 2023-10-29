export function formValidate() {
    

    var A = document.querySelectorAll("[type=submit]");
    const e = document.forms;
    if (e.length) {
        
        A.forEach((function(e) {
            return e.addEventListener("click", s)
        }));
        //for (let l = 0; l < e.length; l++) {
        //	t = e[l];
        //	t.addEventListener("submit", s);
        //}

        function s(e) {
            
            e.preventDefault();
            let t = this.closest("form");
            console.log(t);
            //send(t);
            console.log(i(t)),
            0 === i(t) ? send(t) : t.classList.add("error")
        }


        function send(t) {
            console.log(t);
            var formData = new FormData(t),
                n = new XMLHttpRequest,
                o = "/send.php";
            n.open("POST", o, true),
            n.send(formData),
            
            n.onload = function () {
                if(n.responseText == 'ok') {
                    console.log('sucsess'),
                    console.log(n.responseText),
                    t.innerHTML = "<p style='padding:100px 10px;text-align:center'>Заказ успешно отправлен!</p>"
                    //m(e, "error")
                    //l.classList.add("d-none"),
                   //b.classList.remove("d-none")
                }
                else{
                    //m(e, "accepted"),
                    console.log('error'),
                    console.log(n.responseText),
                    t.innerHTML = "<p style='padding:100px 10px;text-align:center'>"+n.responseText+"</p>"
                   
                    //setTimeout((function() {
                    //    window.open(n.responseText, '_top');
                    //}), 2500)
                }
            }

        }

        function i(e) {
            let t = 0;
            const s = e.querySelectorAll(".req");
            if (s.length) {
                for (let e = 0; e < s.length; e++) {
                    const i = s[e];
                    if (r(i), i.classList.contains("contact")) a(i) && o(i) && (n(i), t++);
                    else if (i.classList.contains("select")) i.options[i.selectedIndex].disabled && (n(i), t++);
                    else if (i.dataset.validateMin) {
                        const e = i.dataset.validateMin;
                        if (i.value.length < e) {
                            if (n(i), t++, i.dataset.textError) {
                                const e = i.dataset.textError,
                                    t = i.parentElement.querySelector(".error-element");
                                t && t.remove(), i.insertAdjacentHTML("afterend", `<div class="error-element">${e}</div>`)
                            }
                        } else {
                            const e = i.parentElement.querySelector(".error-element");
                            e && e.remove()
                        }
                    } else "" === i.value && (n(i), t++)
                }
                return t
            }
        }

        function r(e) {
            e.classList.remove("error"), e.parentElement.classList.remove("error")
        }

        function n(e) {
            e.classList.add("error"), e.parentElement.classList.add("error")
        }

        function a(e) {
            return !/^\w+([\.*]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(e.value)
        }

        function o(e) {
            const t = e.value.replace(/\D/g, "");
            return !/^\d{10,15}$/.test(t)
        }
    }


    
}


