// El ID en este codigo esta quemado, recordar usar el de la session storage ❤️

// Obtiene la cantidad de CPUS segun ID
const cpuCount = document.getElementById("cpu-count");
const cpuMinFreq = document.getElementById("min-freq");
const cpuCurrFreq = document.getElementById("curr-freq");
const cpuMaxFreq = document.getElementById("max-freq");
const cpuOS = document.getElementById("OS");
const cpuBatteryPorcent = document.getElementById("battery-porcent");
const cpuBatteryConnection = document.getElementById("battery-conection");

statsCpuCount = {
  token_owner: sessionStorage.getItem("token_owner"),
  token_value: sessionStorage.getItem("token_value"),
  param_client_id: sessionStorage.getItem("activeClient"),
  param_indicator_key: "cpu_count",
  param_records: "1",
};

const urlCpuCount =
  "https://api.toolsformyjob.com/dashboard/DashboardDetails?param_token_owner=" +
  statsCpuCount.token_owner +
  "&param_token_value=" +
  statsCpuCount.token_value +
  "&param_client_id=" +
  statsCpuCount.param_client_id +
  "&param_indicator_key=" +
  statsCpuCount.param_indicator_key +
  "&param_records=" +
  statsCpuCount.param_records;

console.log(urlCpuCount);
fetch(urlCpuCount, {
  method: "GET",
})
  .then((response) => response.json())
  .then((data) => {
    cpuCount.innerHTML = data.data[0].Value;
  })
  .catch((err) => console.log(err));
//-----------------------------------------------------------------------------------------
// Obtiene min. frequency segun ID
statsCpuMinFrequency = {
  token_owner: sessionStorage.getItem("token_owner"),
  token_value: sessionStorage.getItem("token_value"),
  param_client_id: sessionStorage.getItem("activeClient"),
  param_indicator_key: "cpu_freq_min",
  param_records: "1",
};

const urlCpuMinFrequency =
  "https://api.toolsformyjob.com/dashboard/DashboardDetails?param_token_owner=" +
  statsCpuMinFrequency.token_owner +
  "&param_token_value=" +
  statsCpuMinFrequency.token_value +
  "&param_client_id=" +
  statsCpuMinFrequency.param_client_id +
  "&param_indicator_key=" +
  statsCpuMinFrequency.param_indicator_key +
  "&param_records=" +
  statsCpuMinFrequency.param_records;

console.log(urlCpuMinFrequency);
fetch(urlCpuMinFrequency, {
  method: "GET",
})
  .then((response) => response.json())
  .then((data) => {
    cpuMinFreq.innerHTML = data.data[0].Value;
  })
  .catch((err) => console.log(err));

//-----------------------------------------------------------------------------------------
// Obtiene current. frequency segun ID
statsCpuCurrentFrequency = {
  token_owner: sessionStorage.getItem("token_owner"),
  token_value: sessionStorage.getItem("token_value"),
  param_client_id: sessionStorage.getItem("activeClient"),
  param_indicator_key: "cpu_freq_current",
  param_records: "1",
};
const urlCpuCurrentFrequency =
  "https://api.toolsformyjob.com/dashboard/DashboardDetails?param_token_owner=" +
  statsCpuCurrentFrequency.token_owner +
  "&param_token_value=" +
  statsCpuCurrentFrequency.token_value +
  "&param_client_id=" +
  statsCpuCurrentFrequency.param_client_id +
  "&param_indicator_key=" +
  statsCpuCurrentFrequency.param_indicator_key +
  "&param_records=" +
  statsCpuCurrentFrequency.param_records;

console.log(urlCpuCurrentFrequency);
fetch(urlCpuCurrentFrequency, {
  method: "GET",
})
  .then((response) => response.json())
  .then((data) => {
    cpuCurrFreq.innerHTML = data.data[0].Value;
  })
  .catch((err) => console.log(err));

//-----------------------------------------------------------------------------------------
// Obtiene max. frequency segun ID
statsCpuMaxFrequency = {
  token_owner: sessionStorage.getItem("token_owner"),
  token_value: sessionStorage.getItem("token_value"),
  param_client_id: sessionStorage.getItem("activeClient"),
  param_indicator_key: "cpu_freq_max",
  param_records: "1",
};
const urlCpuMaxFrequency =
  "https://api.toolsformyjob.com/dashboard/DashboardDetails?param_token_owner=" +
  statsCpuMaxFrequency.token_owner +
  "&param_token_value=" +
  statsCpuMaxFrequency.token_value +
  "&param_client_id=" +
  statsCpuMaxFrequency.param_client_id +
  "&param_indicator_key=" +
  statsCpuMaxFrequency.param_indicator_key +
  "&param_records=" +
  statsCpuMaxFrequency.param_records;

console.log(urlCpuMaxFrequency);
fetch(urlCpuMaxFrequency, {
  method: "GET",
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data.data[0].Value);
    cpuMaxFreq.innerHTML = data.data[0].Value;
  })
  .catch((err) => console.log(err));
//------------------------------------------------------------

// os battery\
statsCpuOs = {
  token_owner: sessionStorage.getItem("token_owner"),
  token_value: sessionStorage.getItem("token_value"),
  param_client_id: sessionStorage.getItem("activeClient"),
  param_indicator_key: "platform_name",
  param_records: "1",
};

const urlCpuOs =
  "https://api.toolsformyjob.com/dashboard/DashboardDetails?param_token_owner=" +
  statsCpuOs.token_owner +
  "&param_token_value=" +
  statsCpuOs.token_value +
  "&param_client_id=" +
  statsCpuOs.param_client_id +
  "&param_indicator_key=" +
  statsCpuOs.param_indicator_key +
  "&param_records=" +
  statsCpuOs.param_records;

console.log(urlCpuOs);
fetch(urlCpuOs, {
  method: "GET",
})
  .then((response) => response.json())
  .then((data) => {
    cpuOS.innerHTML = data.data[0].Value;
  })
  .catch((err) => console.log(err));

//-------------------------------------------------------------------------
// battery porcent

statsBatteryCpu = {
  token_owner: sessionStorage.getItem("token_owner"),
  token_value: sessionStorage.getItem("token_value"),
  param_client_id: sessionStorage.getItem("activeClient"),
  param_indicator_key: "battery_percent",
  param_records: "1",
};

const urlBatteryCpu =
  "https://api.toolsformyjob.com/dashboard/DashboardCBOS?param_token_owner=" +
  statsBatteryCpu.token_owner +
  "&param_token_value=" +
  statsBatteryCpu.token_value +
  "&param_client_id=" +
  statsBatteryCpu.param_client_id;

console.log(urlBatteryCpu);
fetch(urlBatteryCpu, {
  method: "GET",
})
  .then((response) => response.json())
  .then((data) => {
    cpuBatteryPorcent.innerHTML = data.data[0].Value;
  })
  .catch((err) => console.log(err));

//-------------------------------------------------------------------------
// battery conection

statsBatteryConection = {
  token_owner: sessionStorage.getItem("token_owner"),
  token_value: sessionStorage.getItem("token_value"),
  param_client_id: sessionStorage.getItem("activeClient"),
  param_indicator_key: "cpu_count",
  param_records: "1",
};

const urlBatteryConection =
  "https://api.toolsformyjob.com/dashboard/DashboardCBOS?param_token_owner=" +
  statsBatteryConection.token_owner +
  "&param_token_value=" +
  statsBatteryConection.token_value +
  "&param_client_id=" +
  statsBatteryConection.param_client_id;

console.log(urlBatteryConection);
fetch(urlBatteryConection, {
  method: "GET",
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data.data[0]);
    cpuBatteryConnection.innerHTML = data.data[0].Value;
  })
  .catch((err) => console.log(err));
