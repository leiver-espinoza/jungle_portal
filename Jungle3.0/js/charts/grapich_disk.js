const diskChart = document.getElementById("disk-chart").getContext("2d");

stats = {
  token_owner: sessionStorage.getItem("token_owner"),
  token_value: sessionStorage.getItem("token_value"),
  param_client_id: sessionStorage.getItem("activeClient"),
  param_indicator_key: "memory_used_mb",
  param_records: "1",
};

const urlMainDisk =
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
const mainDiskFetch = () => {
  fetch(urlMainDisk, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      chartDisk.data.datasets[0].data.push();
    })
    .catch((err) => console.log(err));
};
setInterval(mainDiskFetch, 2900);

// Crear el gráfico
const chartDisk = new Chart(diskChart, {
  type: "pie",
  data: {
    labels: ['Free', 'Used'], // etiquetas del eje X
    datasets: [{
      label: 'Main Disk',
      data: [300, 50],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
      ],
      hoverOffset: 4
    }],
  },
});

// Configurar el número máximo de valores que se mostrarán en el gráfico
const MAX_VALUES_DISK = 10;

// Simular la medición de CPU
setInterval(function () {
  // Si se han agregado más valores de los que se quieren mostrar,
  // eliminar los valores más antiguos
  if (chartDisk.data.labels.length > MAX_VALUES_DISK) {
    chartDisk.data.labels.shift();
    chartDisk.data.datasets[0].data.shift();
  }

  // Actualizar el gráfico
  chartDisk.update();
}, 3000);
