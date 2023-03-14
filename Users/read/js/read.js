const form = document.getElementById("user-form");

form.addEventListener("submit", async function (event) {
  event.preventDefault();
  const id = document.getElementById("id").value;

  user = {
    param_token_owner: sessionStorage.getItem("token_owner"),
    param_token_value: sessionStorage.getItem("token_value"),
    param_id: id,
  };
  console.log(user);

  const url =
    "https://api.toolsformyjob.com/users/read?param_token_owner=" +
    user.param_token_owner +
    "&param_token_value=" +
    user.param_token_value +
    "&param_id=" +
    user.param_id;

  fetch(url, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((response) => console.log(response.data))
    .catch((err) => console.log(err));
});
