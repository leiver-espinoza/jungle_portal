const batteryChart = document.getElementById("battery-chart").getContext("2d");

statsBattery = {
  token_owner: sessionStorage.getItem("token_owner"),
  token_value: sessionStorage.getItem("token_value"),
  param_client_id: sessionStorage.getItem("activeClient"),
  param_indicator_key: "battery_percent",
  param_records: "1",
};

const urlBattery =
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
const batteryFetch = () => {
  fetch(urlBattery, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      chartBattery.data.datasets[0].data.push(data.data[0].Value);
    })
    .catch((err) => console.log(err));
};
setInterval(batteryFetch, 2900);

const data = {
  labels: ["Battery"],
  datasets: [
    {
      label: "Battery",
      data: [65, 100],
      backgroundColor: ["rgba(117, 255, 99, 0.2)"],
      borderColor: ["rgb(117, 255, 99)"],
      borderWidth: 1,
    },
  ],
};

const chartBattery = new Chart(batteryChart, {
  type: "bar",
  data: data,
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});
