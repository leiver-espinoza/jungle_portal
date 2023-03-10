const form = document.getElementById("user-form");

form.addEventListener("submit", async function (event) {
  event.preventDefault();
  const name_first = document.getElementById("name_first").value;
  const name_last = document.getElementById("name_last").value;
  const email = document.getElementById("email").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  user = {
    name_first: name_first,
    name_last: name_last,
    email: email,
    username: username,
    password: password,
  };
  // Validar que los campos no estén vacíos y que las contraseñas coincidan
  if (
    !name_first ||
    !name_last ||
    !email ||
    !username ||
    !password ||
    !confirmPassword ||
    password !== confirmPassword
  ) {
    alert(
      "Por favor, complete todos los campos y asegúrese de que las contraseñas coincidan."
    );
    return;
  }

  fetch("https://api.toolsformyjob.com/users/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Ha ocurrido un error al crear el usuario.");
      }
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
});
