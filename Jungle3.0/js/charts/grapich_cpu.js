// Chart container
const cpuChart = document.getElementById("cpu-chart").getContext("2d");

stats = {
  token_owner: sessionStorage.getItem("token_owner"),
  token_value: sessionStorage.getItem("token_value"),
  param_client_id: sessionStorage.getItem("activeClient"),
  param_indicator_key: "cpu_freq_current",
  param_records: "1",
};

const urlCPU =
  "https://api.toolsformyjob.com/dashboard/DashboardDetails?param_token_owner=" +
  stats.token_owner +
  "&param_token_value=" +
  stats.token_value +
  "&param_client_id=" +
  stats.param_client_id +
  "&param_indicator_key=" +
  stats.param_indicator_key +
  "&param_records=" +
  stats.param_records;

// Hace fetch cada 5 segundos
const cpuFetch = () => {
  fetch(urlCPU, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      chartCpu.data.datasets[0].data.push(data.data[0].Value);
    })
    .catch((err) => console.log(err));
};
setInterval(cpuFetch, 2900);

// Crear el gráfico
const chartCpu = new Chart(cpuChart, {
  type: "line",
  data: {
    labels: [], // etiquetas del eje X
    datasets: [
      {
        label: "CPU Usage",
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
        beginAtZero: true, // empezar desde el valor 0 en el eje Y
        suggestedMax: 100, // valor máximo sugerido en el eje Y
      },
    },
  },
});

// Configurar el número máximo de valores que se mostrarán en el gráfico
const MAX_VALUES_CPU = 10;

// Simular la medición de CPU
setInterval(function () {
  // valor aleatorio entre 0 y 100
  const time = new Date().toLocaleTimeString(); // obtener la hora actual

  chartCpu.data.labels.push(time); // agregar la hora al eje X

  if (chartCpu.data.labels.length > MAX_VALUES_CPU) {
    chartCpu.data.labels.shift();
    chartCpu.data.datasets[0].data.shift();
  }

  chartCpu.update();
}, 3000);
