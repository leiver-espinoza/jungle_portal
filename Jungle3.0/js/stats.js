// Obtiene la referencia al elemento con la clase "statNumber"
const configuredClient = document.getElementById("cfg-cli");
const activeClient = document.getElementById("act-cli");
const windowsClient = document.getElementById("win-cli");
const linuxClient = document.getElementById("lin-cli");
const inactiveClient = document.getElementById("inac-cli");
const alertClient = document.getElementById("alert-cli");
// Asigna un valor al elemento

stats = {
  token_owner: sessionStorage.getItem("token_owner"),
  token_value: sessionStorage.getItem("token_value"),
};

const url =
  "https://api.toolsformyjob.com/dashboard/header?param_token_owner=" +
  stats.token_owner +
  "&param_token_value=" +
  stats.token_value;
console.log(url);
fetch(url, {
  method: "GET",
})
  .then((response) => response.json())
  .then((data) => {
    // Asigna los valores de la respuesta a cada elemento HTML
    configuredClient.innerHTML = data.data[0].value;
    activeClient.innerHTML = data.data[1].value;
    windowsClient.innerHTML = data.data[2].value;
    linuxClient.innerHTML = data.data[3].value;
    inactiveClient.innerHTML = data.data[4].value;
    alertClient.innerHTML = data.data[5].value;
  })
  .catch((err) => console.log(err));
