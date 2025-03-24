function agregarUsuario() {
    let nombre = document.getElementById("Nombre").value.trim();
    let apellidos = document.getElementById("Apellidos").value.trim();
    let domicilio = document.getElementById("Domicilio").value.trim();
    let edad = document.getElementById("Edad").value.trim();
    let telefono = document.getElementById("Telefono").value.trim();
    let alergias = document.getElementById("Alergias").value.trim();  // Asegúrate de tener este campo

    if (nombre === "" || apellidos === "" || domicilio === "" || edad === "" || telefono === "") {
        alert("Por favor, complete todos los campos.");
        return;
    }

    // Enviar datos al backend
    fetch("http://localhost:8080/registrar", {  // Cambia la URL por la correcta
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
}
