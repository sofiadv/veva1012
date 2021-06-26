const inpFile = document.getElementById("inpFile");
const previewContainer = document.getElementById("imagePreview")
const previewImage = document.getElementById("previewimg")
const previewText = document.getElementById("previewtxt")

window.addEventListener("load", function(){
    if (previewImage.src){
        previewText.style.display = "none"
        previewImage.style.display = "block" 
    }
    inpFile.addEventListener("change", function(){
        const file = this.files[0];

        if (file){
            const reader = new FileReader();
            
            previewText.style.display = "none"
            previewImage.style.display = "block"
            
            reader.addEventListener("load", function(){
                previewImage.setAttribute("src", this.result);
            })
            reader.readAsDataURL(file)
        }
        else{
            previewText.style.display = null
            previewImage.style.display = null
            previewImage.setAttribute("src", "")
        }
    })
})