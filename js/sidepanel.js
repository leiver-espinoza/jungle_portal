const activeClients = document.getElementById("activeClients");
const chart_cpu_canvas = document.getElementById("chart_cpu").getContext("2d");
const chart_battery_canvas = document.getElementById("chart_battery").getContext("2d");
const chart_disks_canvas = document.getElementById("chart_hard_disk").getContext("2d");
const chart_memory_canvas = document.getElementById("chart_memory").getContext("2d");
const chart_max_points = 30;

let activeClientID = 1;
let loadingValue = '<img oncontextmenu="return false" src="../../assets/icons/loading.ico" height="16" width="16" alt="">'
sessionStorage.setItem("activeClient", activeClientID);
sessionStorage.setItem("enableLoading", false);

const chart_cpu_object = new Chart(chart_cpu_canvas, {
  type: "line",
  data: {
    labels: [], // etiquetas del eje X
    datasets: [
      {
        label: "",
        data: [], // datos del eje Y
        backgroundColor: "rgba(255, 99, 132, 0.2)", // color de fondo
        borderColor: "rgba(255, 99, 132, 1)", // color de borde
        borderWidth: 1, // grosor del borde
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: false, // empezar desde el valor 0 en el eje Y
        suggestedMax: 100, // valor máximo sugerido en el eje Y
      },
    },
  },
});

const chart_battery_object = new Chart(chart_battery_canvas, {
  type: "bar",
  data: {
    labels: [], // etiquetas del eje X
    datasets: [
      {
        label: "",
        data: [], // datos del eje Y
        backgroundColor: "rgba(255, 205, 86, 0.2)", // color de fondo
        borderColor: "rgb(255, 205, 86)", // color de borde
        borderWidth: 1, // grosor del borde
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true, // empezar desde el valor 0 en el eje Y
        suggestedMax: 100, // valor máximo sugerido en el eje Y
      },
    },
  },
});

const chart_disks_object = new Chart(chart_disks_canvas, {
  type: "pie",
  data: {
    labels: ['Utilized Space','Free Space'], // etiquetas del eje X
    datasets: [{
      label: '',
      data: [0,0],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
      ],
      hoverOffset: 4
    }],
  },
});


const chart_memory_object = new Chart(chart_memory_canvas, {
  type: "line",
  data: {
    labels: [], // etiquetas del eje X
    datasets: [
      {
        label: "",
        data: [], // datos del eje Y
        backgroundColor: "rgba(208, 240, 192, 0.2)", // color de fondo
        borderColor: "rgba(208, 240, 192, 1)", // color de borde
        borderWidth: 1, // grosor del borde
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: false, // empezar desde el valor 0 en el eje Y
        suggestedMax: 100, // valor máximo sugerido en el eje Y
      },
    },
  },
});

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
};

async function assignResetValue(myObject) {
  myObject.innerHTML = loadingValue
}

async function resetChart(myObject) {
  myObject.data.datasets[0].data = [];
  myObject.data.labels = []
  myObject.update();
}

function resetValues() {

  assignResetValue(document.getElementById("last_update"));
  assignResetValue(document.getElementById("last_report"));

  assignResetValue(document.getElementById("cpu_count"));
  assignResetValue(document.getElementById("cpu_freq_min"));
  assignResetValue(document.getElementById("cpu_freq_current"));
  assignResetValue(document.getElementById("cpu_freq_max"));
  assignResetValue(document.getElementById("cpu_perc"));
  assignResetValue(document.getElementById("platform_name"));
  assignResetValue(document.getElementById("battery_percent"));
  assignResetValue(document.getElementById("battery_power_plugged"));
  assignResetValue(document.getElementById("boot_time"));
  assignResetValue(document.getElementById("time_since_boot"));

  assignResetValue(document.getElementById("memory_total_mb"));
  assignResetValue(document.getElementById("memory_available_mb"));
  assignResetValue(document.getElementById("memory_used_mb"));
  assignResetValue(document.getElementById("memory_free_mb"));
  assignResetValue(document.getElementById("memory_perc_used"));

  assignResetValue(document.getElementById("disk_read_count"));
  assignResetValue(document.getElementById("disk_read_bytes"));
  assignResetValue(document.getElementById("disk_read_time"));
  assignResetValue(document.getElementById("disk_write_count"));
  assignResetValue(document.getElementById("disk_write_bytes"));
  assignResetValue(document.getElementById("disk_write_time"));
  
  resetChart(chart_cpu_object);
  resetChart(chart_battery_object);
  resetChart(chart_disks_object);
  resetChart(chart_memory_object)

}

function resetTimers() {
  CBOS_time_controller = 0;
  header_time_controller = 0;
  memory_time_controller = 0;
  disks_time_controller = 0;
}

function resetControllers() {
  sessionStorage.setItem("enableLoading",false)
  resetValues();
  resetTimers();
}

function ready2Load() {
  return (sessionStorage.getItem("activeClient") != 0) 
    && sessionStorage.getItem("enableLoading")
    && document.getElementById("activeClients").innerHTML != ""
}

function LoadSidePanel() {
  sessionStorage.setItem("enableLoading",false)
  resetValues()
  getFetchData().then((clientData) => {
    for (const obj in clientData) {
      const objData = clientData[obj];

      const a = document.createElement("a");
      a.href = "#";
      a.className = "clientButton nS";
      a.id = objData.Client_ID;
      if (a.id == sessionStorage.getItem("activeClient")) {
        a.classList.toggle("active")
      }

      a.addEventListener("click", () => {
        resetControllers()
        const currentlyActive = document.querySelector(".clientButton.active");
        if (currentlyActive && currentlyActive !== a) {
          currentlyActive.classList.toggle("active");
        }

        a.classList.toggle("active");
        const activeClient = a.id;
        sessionStorage.setItem("activeClient", activeClient);
        Toastify({
          text: "Selected client information will update soon",
          offset: {
            x: 50, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: 10 // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
        }).showToast();
      });

      switch (objData.Status) {
        case "Critical":
          a.innerHTML = `<div class="clientLink"><span class="clientName">${objData.Friendly_Name}</span><span class="clientHost">${objData.Hostname}<span class="ipAddress">${objData.IP_Address}</span></span><span class="clientStatus error">${objData.Status}</span></div>`;
          break;
        case "Normal operation":
          a.innerHTML = `<div class="clientLink"><span class="clientName">${objData.Friendly_Name}</span><span class="clientHost">${objData.Hostname}<span class="ipAddress">${objData.IP_Address}</span></span><span class="clientStatus pending">${objData.Status}</span></div>`;
          break;
        case "Alert":
          a.innerHTML = `<div class="clientLink"><span class="clientName">${objData.Friendly_Name}</span><span class="clientHost">${objData.Hostname}<span class="ipAddress">${objData.IP_Address}</span></span><span class="clientStatus warn">${objData.Status}</span></div>`;
          break;
        case "Warning":
          a.innerHTML = `<div class="clientLink"><span class="clientName">${objData.Friendly_Name}</span><span class="clientHost">${objData.Hostname}<span class="ipAddress">${objData.IP_Address}</span></span><span class="clientStatus success">${objData.Status}</span></div>`;
          break;
      }

      activeClients.appendChild(a);
    }
    sessionStorage.setItem("enableLoading",true)
  })
};

LoadSidePanel()
