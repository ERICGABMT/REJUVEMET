//Aplicaciones bsaicas con JS
function agregarUsuario(){
    let nombre = document.getElementById("Nombre").value.trim();
    let apellidos= document.getElementById("Apellidos").value.trim();
    let domicilio = document.getElementById("Domicilio").value.trim();
    let edad= document.getElementById("Domicilio").value.trim();
    let telefono = document.getElementById("Domicilio").value.trim();

    if (nombre === "" || apellidos === "" || domicilio === "" || edad === "" || telefono === "") {
        alert("Por favor, complete todos los campos.");
        return;

    }
     // Enviar datos al backend
     fetch("https://api.clever-cloud.com/v2/github/redeploy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, apellidos, domicilio, edad, telefono, alergias })
    })
    .then(response => response.json())
    .then(data => {
        alert(`Bienvenido: ${nombre}, tu cuenta se registró correctamente.`);
        
        // Redirigir después de 1 segundo
        setTimeout(() => {
            window.location.href = "index_iniciar_sesion.html"; 
        }, 1000);
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Hubo un problema con el registro, intenta de nuevo.");
    });

}//END_agregarUsuario