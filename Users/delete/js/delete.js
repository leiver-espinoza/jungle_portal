const form = document.getElementById("user-form");

form.addEventListener("submit", async function (event) {
  event.preventDefault();
  const id = document.getElementById("id").value;

  user = {
    param_token_owner: sessionStorage.getItem("token_owner"),
    param_token_value: sessionStorage.getItem("token_value"),
    param_id: parseint(id),
  };
  console.log(user);

  const url = "https://api.toolsformyjob.com/users/delete";

  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };

  fetch(url, options)
    .then((response) => response.json())
    .then((response) => console.log(response.data))
    .catch((err) => console.log(err));
});
