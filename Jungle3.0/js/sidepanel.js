const activeClients = document.getElementById('activeClients');
let activeClientID;

stats = {
  token_owner: sessionStorage.getItem("token_owner"),
  token_value: sessionStorage.getItem("token_value"),
};

const sidepanelUrl =
  "https://api.toolsformyjob.com/dashboard/sidepanel?param_token_owner=" +
  stats.token_owner +
  "&param_token_value=" +
  stats.token_value;

// NO TOCAR
const getFetchData = () => {
  return fetch(sidepanelUrl, {
    method: "GET",
  })
  .then((response) => response.json())
  .then((data) => {
    const clientData = data.data;
    return clientData;
  })
  .catch((err) => console.log(err));
}
getFetchData()
///////////////////////////////////


getFetchData().then(clientData => {

  for (const obj in clientData) {
    const objData = clientData[obj];
  
    const a = document.createElement('a');
    a.href = '#';
    a.className = 'clientButton nS';
    a.id = objData.Client_ID;
  
    a.addEventListener("click", () => {
      const currentlyActive = document.querySelector(".clientButton.active");
      if(currentlyActive && currentlyActive!==a) {
        currentlyActive.classList.toggle("active");
      }
  
      a.classList.toggle("active");
      const activeClient = a.id;
      sessionStorage.setItem("activeClient", activeClient);
      location.reload()
    });
  
    switch (objData.Status) {
      case 'Critical':
        a.innerHTML = `<div class="clientLink"><span class="clientName">${objData.Friendly_Name}</span><span class="clientHost">${objData.Hostname}<span class="ipAddress">${objData.IP_Address}</span></span><span class="clientStatus error">${objData.Status}</span></div>`;
        break;
      case 'Normal operation':
        a.innerHTML = `<div class="clientLink"><span class="clientName">${objData.Friendly_Name}</span><span class="clientHost">${objData.Hostname}<span class="ipAddress">${objData.IP_Address}</span></span><span class="clientStatus pending">${objData.Status}</span></div>`;
        break;
      case 'Alert':
        a.innerHTML = `<div class="clientLink"><span class="clientName">${objData.Friendly_Name}</span><span class="clientHost">${objData.Hostname}<span class="ipAddress">${objData.IP_Address}</span></span><span class="clientStatus warn">${objData.Status}</span></div>`;
        break;
      case 'Warning':
        a.innerHTML = `<div class="clientLink"><span class="clientName">${objData.Friendly_Name}</span><span class="clientHost">${objData.Hostname}<span class="ipAddress">${objData.IP_Address}</span></span><span class="clientStatus success">${objData.Status}</span></div>`;
        break;
    }
  
    activeClients.appendChild(a)
  }
})

// console.log(activeClientID)