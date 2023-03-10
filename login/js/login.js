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
    .then((response) => response.json())
    .then((apiData) => {
      // Si se encontró el usuario, mostrar un mensaje de bienvenida
      const token_value = apiData.data[0].Token;
      const token_owner = user.username
      sessionStorage.setItem("token_value", token_value);
      sessionStorage.setItem("token_owner", token_owner);
      window.location.assign("/Users/html/create.html");
    })
    .catch((error) => {
      alert(error)
      // Si ocurrió un error, mostrar un mensaje de error
      //console.error(error);
      window.location.assign("error.html");
    });
});
