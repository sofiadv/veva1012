
window.addEventListener('load', function(){
    
    let formulario = document.querySelector("form.edit-form");
    let campoEmail = document.querySelector("#email");
    let textoEmail = document.querySelector("#emailtxt")
    console.log(textoEmail);


    campoEmail.addEventListener('blur', async function(e){
        try{
            console.log(e.target.value);
            let confirm = await fetch('/users/email/' + e.target.value)
            let confirm2 = await confirm.json()
            console.log(confirm2);
            textoEmail.innerHTML += ' Ya existente';
            if (confirm2) {
                formulario.addEventListener('submit', function(e){
                    e.preventDefault()
                })
            }     
        }
        catch (error){
            (error)
        }
    })
    campoEmail.addEventListener('click', async function(e){
        textoEmail.innerHTML = 'Email:'
    })
})
