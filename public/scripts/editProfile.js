window.addEventListener("load", function(){
    let formulario = document.querySelector(".edit-form");

    formulario.addEventListener('submit', function(e){


        let campoNombre = document.querySelector("#nombre");
        let campoApellido = document.querySelector("#apellido");
        let campoEmail = document.querySelector("#email");
        let campoPassword = document.querySelector("#password");
        let campoRepassword = document.querySelector("#repassword");


        if (campoNombre.value == "") {
            campoNombre.setAttribute('placeholder', 'Este campo no puede estar vacio')
            e.preventDefault()
        }
        if (campoApellido.value == "") {
            campoApellido.setAttribute('placeholder', 'Este campo no puede estar vacio')
            e.preventDefault()
        }
        if (campoEmail.value == "") {
            campoEmail.setAttribute('placeholder', 'Este campo no puede estar vacio')
            e.preventDefault()
        }
        if (campoPassword.value.length < 8 && campoPassword.value.length > 0) {
            campoPassword.value = ''
            campoPassword.setAttribute('placeholder', 'Mínimo de 8 caracteres')
            e.preventDefault()
        }
        if (campoPassword.value !== campoRepassword.value){
            campoRepassword.setAttribute('placeholder', 'Confirmación de contraseña erronea')
            e.preventDefault()
        }
    })


})