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
    enabled: true,
  };
  console.log(user);

  const url =
    "https://api.toolsformyjob.com/users/read_all?param_token_owner=" +
    user.param_token_owner +
    "&param_token_value=" +
    user.param_token_value +
    "&name_first=" +
    user.name_first +
    "&name_last=" +
    user.name_last +
    "&email=" +
    user.email +
    "&username=" +
    user.username +
    "&enabled=" +
    user.enabled;

  fetch(url, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((response) => console.log(response.data))
    .catch((err) => console.log(err));
});
