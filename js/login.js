console.warn = () => {};

const loginForm = document.getElementById('loginForm');
const inputs = document.querySelectorAll('#loginForm input');

const regularExpression = {
  username: /^[a-zA-Z0-9\_\-]{4,16}$/, // Only allow letters, numbers, underscores and dashes
  password: /^.{4,20}$/, // 4 to 13 digits
}

const validForm = (e) => {
  switch (e.target.name) {
    case 'username':
      validInput(regularExpression.username, e.target, 'username', 'Please enter a valid username.');
      break;
    case 'password':
      validInput(regularExpression.password, e.target, 'password', 'Invalid password.');
      break;
  }
}

const validInput = (expression, input, target, hasError) => {
  if (expression.test(input.value)) {
    document.getElementById(target).classList.remove('error');
    document.getElementById(target).classList.add('valid');
    document.querySelector(`#component_${target} .formError`).classList.remove('active');
  } else {
    document.getElementById(target).classList.add('error');
    document.querySelector(`#component_${target} .formError`).classList.add('active');
    document.querySelector(`#component_${target} .formError`).innerHTML = `<img src="../assets/icons/form-error.svg" class="errorIcon"> ${hasError}`;
  }
}

inputs.forEach((input) => {
  input.addEventListener('keyup', validForm)
})

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  user = {
    username: username,
    password: password,
  };

  if (!username || !password) {
    Swal.fire({
      title: 'Missing data!',
      icon: 'error',
      html: 'Please enter your username and password',
      timer: 3000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
      },
    })
    return;
  }

  try {
    fetch("https://api.toolsformyjob.com/users/login", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else if (response.status === 403) {
        return response.json()
      }
    })
    .then(data => {
      if (data.detail) {
        Swal.fire({
          title: 'Error!',
          icon: 'error',
          html: data.detail,
          timer: 3000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading()
          }
        })
      } else {
        const token_value = data.data[0].Token;
        const token_owner = user.username;
        sessionStorage.setItem("token_value", token_value);
        sessionStorage.setItem("token_owner", token_owner);
        window.location.assign("./dashboard/dashboard.html");
      }
    })
    .catch(e);  }
  catch(e) {}

})