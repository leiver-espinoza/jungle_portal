const form = document.getElementById("login-form");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  user = {
    username: username,
    password: password,
  };

  if (!username || !password) {
    alert("Por favor ingresa tu usuario y contraseña");
    return;
  }

  fetch("https://api.toolsformyjob.com/users/login", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      // Verificar el código de respuesta de la API
      if (response.ok) {
        // Si la respuesta es exitosa, extraer los datos de usuario
        return response.json();
      } else {
        // Si la respuesta es un error, lanzar una excepción
        throw new Error("Credenciales inválidas");
      }
    })
    .then((data) => {
      // Si se encontró el usuario, mostrar un mensaje de bienvenida

      const jsonData = JSON.stringify(data);
      sessionStorage.setItem("apiData", jsonData);
      //--------------------------------------------------------------
      /*const token = jsonData;
      const user_owner = user.username;
      console.log("Token: ", token); // ver el json con el token en la consola
      console.log("user_owner: ", user_owner);*/ // ver el token_owner en la consola
      window.location.assign("/Users/html/create.html");
    })
    .catch((error) => {
      // Si ocurrió un error, mostrar un mensaje de error
      //console.error(error);
      window.location.assign("error.html");
    });
});
