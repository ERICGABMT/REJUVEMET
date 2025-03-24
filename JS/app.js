function agregarUsuario() {
    let nombre = document.getElementById("Nombre").value.trim();
    let apellidos = document.getElementById("Apellidos").value.trim();
    let domicilio = document.getElementById("Domicilio").value.trim();
    let edad = document.getElementById("Edad").value.trim();
    let telefono = document.getElementById("Telefono").value.trim();
    let contraseña = document.getElementById("contraseña").value.trim();  
    let alergias = document.getElementById("Alergias").value.trim();  

    if (nombre === "" || apellidos === "" || domicilio === "" || edad === "" || telefono === "" || contraseña === "") {
        alert("Por favor, complete todos los campos.");
        return;
    }
      // Debug: Mostrar datos antes de enviarlos
      console.log("Enviando datos:", { nombre, apellidos, domicilio, edad, telefono, contraseña, alergias });

      fetch("http://localhost:3000/registrar", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nombre, apellidos, domicilio, edad, telefono, contraseña, alergias })
      })
      .then(response => {
          console.log("Respuesta del servidor:", response);
          return response.json();
      })
      .then(data => {
          console.log("Datos recibidos:", data);
          alert(`Bienvenido: ${nombre}, tu cuenta se registró correctamente.`);
          setTimeout(() => {
              window.location.href = "index.html"; 
          }, 1000);
      })
      .catch(error => {
          console.error("Error en fetch:", error);
          alert("Hubo un problema con el registro, intenta de nuevo.");
      });
    }//Fin de agregar usuario-----------------------------------------------------------------------------------------------------

    function iniciarSesion() {
        let contraseña = document.getElementById("contraseña").value.trim();
    
        if (!contraseña) {
            alert("Por favor, ingrese su contraseña.");
            return;
        }
    
        fetch("http://localhost:3000/iniciar_sesion", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contraseña })
        })
        .then(response => response.json())
        .then(data => {
            console.log("Respuesta del servidor:", data);
    
            if (data.success) {
                if (contraseña === "admin123") { // Si es admin redirigir a otra página
                    alert("Inicio de sesión exitoso como administrador.");
                    window.location.href = "index_pantalla_DR.html"; // Redirigir a la página de admin
                } else {
                    alert("Inicio de sesión exitoso.");
                    window.location.href = "index_pantalla_cliente.html"; // Redirigir si es usuario normal
                }
            } else {
                alert("Contraseña incorrecta. Intente de nuevo.");
            }
        })
        .catch(error => {
            console.error("Error en fetch:", error);
            alert("Hubo un problema al conectar con el servidor.");
        });
    }
    
