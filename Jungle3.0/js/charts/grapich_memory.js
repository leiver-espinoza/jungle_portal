// Chart container
const memoryChart = document.getElementById("memory-chart").getContext("2d");

stats = {
  token_owner: sessionStorage.getItem("token_owner"),
  token_value: sessionStorage.getItem("token_value"),
  param_client_id: sessionStorage.getItem("activeClient"),
  param_indicator_key: "memory_used_mb",
  param_records: "1",
};

const urlMemory =
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
const memoryFetch = () => {
  fetch(urlMemory, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      chartMemory.data.datasets[0].data.push(data.data[0].Value);
    })
    .catch((err) => console.log(err));
};
setInterval(memoryFetch, 2900);

// Chart Memory
const chartMemory = new Chart(memoryChart, {
  type: "line",
  data: {
    labels: [], // etiquetas del eje X
    datasets: [
      {
        label: "MEMORY Usage",
        data: [], // datos del eje Y
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgb(75, 192, 192)",
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
const MAX_VALUES_MEMORY = 10;

// Simular la medición de CPU
setInterval(function () {
  const time = new Date().toLocaleTimeString(); // obtener la hora actual

  chartMemory.data.labels.push(time); // agregar la hora al eje X

  // Si se han agregado más valores de los que se quieren mostrar,
  // eliminar los valores más antiguos
  if (chartMemory.data.labels.length > MAX_VALUES_MEMORY) {
    chartMemory.data.labels.shift();
    chartMemory.data.datasets[0].data.shift();
  }

  chartMemory.update(); // actualizar el gráfico
}, 3000); // actualizar cada segundo
