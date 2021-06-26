window.addEventListener("load", function(){
    let formulario = document.querySelector("form.product-form");

    formulario.addEventListener('submit', function(e){


        let campoNombre = document.querySelector("#nombre");
        let campoMarca = document.querySelector("#marca");
        let campoTipo = document.querySelector("#tipo");
        let campoPrecio = document.querySelector("#precio");
        let campoDescuento = document.querySelector("#descuento");
        let campoUnidades = document.querySelector("#unidades");
        let campoDescripcion = document.querySelector("#descripcion");


        if (campoNombre.value == "") {
            campoNombre.setAttribute('placeholder', 'Este campo no puede estar vacio')
            e.preventDefault()
        }
        if (campoPrecio.value == "") {
            campoPrecio.setAttribute('placeholder', 'Este campo no puede estar vacio')
            e.preventDefault()
        }
        if (campoUnidades.value == "") {
            campoUnidades.setAttribute('placeholder', 'Este campo no puede estar vacio')
            e.preventDefault()
        }
        if (campoDescuento.value == "") {
            campoDescuento.setAttribute('placeholder', 'Este campo no puede estar vacio')
            e.preventDefault()
        }
        if (campoDescripcion.value == "") {
            campoDescripcion.setAttribute('placeholder', 'Este campo no puede estar vacio')
            e.preventDefault()
        }
       
    })


})