window.addEventListener("load", function(){
    let formulario = document.querySelector("form.login-form");

    formulario.addEventListener('submit', function(e){

        let campoEmail = document.querySelector("#email");
        let campoPassword = document.querySelector("#password");

        if (campoEmail.value == ""){
            campoEmail.setAttribute('placeholder', 'Este campo no puede estar vacio')
            e.preventDefault()
        }

        if (campoPassword.value == "") {
            campoPassword.setAttribute('placeholder', 'Este campo no puede estar vacio')
            e.preventDefault()
        }
    })
})