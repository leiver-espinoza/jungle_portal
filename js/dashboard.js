const logoutButton = document.getElementById('logout-button');

async function processLogout() {
    request_params = {
        token_owner: sessionStorage.getItem("token_owner"),
        token_value: sessionStorage.getItem("token_value"),
    }

    try {
        const response = await fetch("https://api.toolsformyjob.com/users/logout?", {
            method: "POST",
            body: JSON.stringify(request_params),
            headers: {
              "Content-Type": "application/json",
            },
        })
        const data = await response.json()
        if (data.hasOwnProperty('data')) {
            sessionStorage.removeItem("token_value");
            sessionStorage.removeItem("token_owner");
            Swal.fire({
                title: 'Logged out!',
                icon: 'success',
                html: 'You have successfully logged out from Jungle',
                timer: 10000,
                timerProgressBar: true,
                didOpen: () => {
                  Swal.showLoading()
                },
                willClose: () => {
                    window.location.assign("/");
                  }
              })
        }
    } catch (err) {
        Swal.fire({
            title: 'Error!',
            icon: 'error',
            html: 'An error occured while trying to logout the user.',
            timer: 5000,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading()
            }
          })
}
}

logoutButton.addEventListener('click', () => {
    Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to log out from Jungle ?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.isConfirmed) {
            processLogout()
        }
      })
  })
