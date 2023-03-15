const form = document.getElementById("user-form");

form.addEventListener("submit", async function (event) {
  event.preventDefault();
  const name_first = document.getElementById("name_first").value;
  const name_last = document.getElementById("name_last").value;
  const email = document.getElementById("email").value;
  const username = document.getElementById("username").value;

  user = {
    token_owner: sessionStorage.getItem("token_owner"),
    token_value: sessionStorage.getItem("token_value"),
    name_first: name_first,
    name_last: name_last,
    email: email,
    username: username,
    enabled: true,  // ESTE VALOR NO PUEDE IR POR DEFAULT AQUI EN EL CODIGO, DEBE REALIZAR LA CONSULTA CON BASE A ALGUN CAMPO (PENDIENTE DE AGREGAR)
  };
  console.log(user);

  const url =
    "https://api.toolsformyjob.com/users/read_all?param_token_owner=" +
    user.token_owner +
    "&param_token_value=" +
    user.token_value +
    "&param_name_first=" +
    user.name_first +
    "&param_name_last=" + // Corregido
    user.name_last +
    "&param_email=" + // Corregido
    user.email +
    "&param_username=" + // Corregido
    user.username +
    "&param_enabled=" + // Corregido
    user.enabled;
  console.log(url)
  fetch(url, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((response) => console.log(response.data))
    .catch((err) => console.log(err));
});
