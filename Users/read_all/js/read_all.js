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

  fetch("https://api.toolsformyjob.com/users/read_all", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      //console.log(response.data);
      printData.innerHTML = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
});
