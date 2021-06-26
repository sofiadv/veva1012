window.addEventListener("load", function() {
    let deleteButton = document.querySelector('#deleteButton')

    deleteButton.addEventListener("click", function(e){
        let confirmar = confirm("¿Está seguro/a que quiere eliminar?")
        if (!confirmar){
            e.preventDefault()
        }
    })
})