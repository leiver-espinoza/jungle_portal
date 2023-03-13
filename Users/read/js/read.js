const printData = document.getElementById("printData");

user = {
  param_token_owner: sessionStorage.getItem("token_owner"),
  param_token_value: sessionStorage.getItem("token_value"),
};

let inputId = prompt("ID");
console.log(inputId);

const url =
  "https://api.toolsformyjob.com/users/read?param_token_owner=" +
  user.param_token_owner +
  "&param_token_value=" +
  user.param_token_value +
  "&param_id=" +
  inputId;

fetch(url)
  .then((response) => response.json())
  .then((response) => console.log(response.data))
  .catch((err) => console.log(err));
