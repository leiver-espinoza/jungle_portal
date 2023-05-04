const AllDetails_refresh_Time = 5000
const AllDetails_repeating_Interval = 10

let AllDetails_time_controller = 0
let moveProgressBar = true
let diskTotal = 0
let diskFree = 0
let diskUsed = 0

function formatAlert(tmpValue, Tx) {
    let tmpFontColor = ""
    let tmpIcon = ""
    switch (Tx) {
        case 'T0':
            break;
        case 'T1':
            tmpFontColor = "hsl(355, 100%, 74%)";
            break;
        case 'T2':
            tmpFontColor = "rgb(255,153,102)";
            break;
        case 'T3':
            tmpFontColor = "rgb(255,204,0)";
            break;
        case 'T4':
            tmpFontColor = "hsl(209, 100%, 74%)";
            break;
        default:
            tmpFontColor = "rgb(255,255,255)";
    }
    return '<span style="color: ' + tmpFontColor + '">' + tmpValue + '</span>'
}

async function get_DashboardDetailsAll(requestedClientID) {
    request_params = {
        param_token_owner: sessionStorage.getItem("token_owner"),
        param_token_value: sessionStorage.getItem("token_value"),
        param_client_id: sessionStorage.getItem("activeClient")
    }

    try {
        const detail_request =
            "https://api.toolsformyjob.com/dashboard/DashboardDetailsAll?"
            + new URLSearchParams(request_params);

        const response = await fetch(detail_request, {
            method: "GET",
        })

        const data = await response.json()

        if ((data.hasOwnProperty('data')) 
                && (requestedClientID == sessionStorage.getItem("activeClient"))) {
            
            data.data.forEach(indicator => {
                try {
                    if (indicator.Indicator_Key == "disk_space_free_mb") {
                        diskFree = indicator.Value
                    } else {
                        if (indicator.Indicator_Key == "disk_space_total_mb"){
                            diskTotal = indicator.Value
                        } else {
                            document.getElementById(indicator.Indicator_Key).innerHTML = 
                            formatAlert(indicator.Value, indicator.Status)
                        }
                    }
                    diskUsed = diskTotal - diskFree
                    chart_disks_object.data.datasets[0].data = []
                    chart_disks_object.data.labels = []
                    chart_disks_object.data.datasets[0].data.push(diskUsed)
                    chart_disks_object.data.labels.push('Utilized Space')
                    chart_disks_object.data.datasets[0].data.push(diskFree)
                    chart_disks_object.data.labels.push('Free Space')
                    chart_disks_object.data.datasets.label = 'Main Disk @ ' + Math.round(diskUsed / diskTotal * 100) + '%'
                    chart_disks_object.update()
                } catch (err) {
                    //console.log('Ah error occured: ' + err)
                    console.log('Indicator tag not found: ' + indicator.Indicator_Key)
                }  
            })
        }
    } catch (err) {
        console.log(
            "An error occured while refreshing stats for Client ID: " 
            + sessionStorage.getItem("activeClient"));
    }
    moveProgressBar = true
}

async function get_chart_values(tmpKeyIndicator, requestedClientID, tmpChart, tmpTitle, tmpMultiplier) {
    request_params = {
        param_token_owner: sessionStorage.getItem("token_owner"),
        param_token_value: sessionStorage.getItem("token_value"),
        param_client_id: sessionStorage.getItem("activeClient"),
        param_indicator_key: tmpKeyIndicator,
        param_records: (tmpChart.data.datasets[0].data.length > 0 ? 1 : 50),
    }

    try {
        const detail_request =
            "https://api.toolsformyjob.com/dashboard/DashboardDetails?"
            + new URLSearchParams(request_params);

        const response = await fetch(detail_request, {
            method: "GET",
        })
        const data = await response.json()
        if ((data.hasOwnProperty('data')) 
                && (requestedClientID == sessionStorage.getItem("activeClient"))) {
            
            if (tmpChart.data.datasets[0].data.length == 0) {
                let currentValue = 0
                data.data.forEach(indicator => {
                    try {
                        currentValue = indicator.Value
                        tmpChart.data.datasets[0].data.push(currentValue * tmpMultiplier);
                        tmpChart.data.labels.push(".");
                        if (tmpChart.data.datasets[0].data.length > chart_max_points) {
                            tmpChart.data.label.shift();
                            tmpChart.data.datasets[0].data.shift();
                        }
                        tmpChart.update();
                    } catch (err) {}
                    tmpChart.data.datasets[0].label = tmpTitle + " ( " + parseFloat(currentValue * tmpMultiplier).toFixed(2) + " % )"
                })
            } else {
                let returnedValue = data.data[0].Value
                tmpChart.data.datasets[0].data.push(returnedValue * tmpMultiplier);
                tmpChart.data.labels.push(".");
                tmpChart.data.datasets[0].label = tmpTitle + " ( " + (returnedValue * tmpMultiplier) + " % )"
                if (tmpChart.data.datasets[0].data.length > chart_max_points) {
                    tmpChart.data.labels.shift();
                    tmpChart.data.datasets[0].data.shift();
                }
            }
            tmpChart.update();
        }
    } catch (err) {
        // console.log(err);
        console.log(
            "Can't setup indicator: " + tmpKeyIndicator +
            " | Client ID: " + sessionStorage.getItem("activeClient"));
    }
}

setInterval(() => {
    if ((AllDetails_time_controller == 0) && ready2Load()) {
        const requestedClientID = sessionStorage.getItem("activeClient")
        moveProgressBar = false
        get_DashboardDetailsAll(requestedClientID, chart_cpu_object);
        get_chart_values("cpu_perc",requestedClientID, chart_cpu_object, "CPU Percentage", 1);
        get_chart_values("battery_percent",requestedClientID, chart_battery_object, "Battery / Power Supply", 100);
        get_chart_values("memory_perc_used",requestedClientID, chart_memory_object, "Memory Utilization", 100);
        AllDetails_time_controller = AllDetails_refresh_Time;
    }
    if (AllDetails_time_controller != 0) {
        AllDetails_time_controller = AllDetails_time_controller - AllDetails_repeating_Interval;
        const progressBar = document.getElementById("progressBar")
        if (moveProgressBar) {
            progressBar.style.width = ((AllDetails_time_controller / AllDetails_refresh_Time) * 100) + "%";
        }
    }
}, AllDetails_repeating_Interval);

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}
  
function formatDate(date) {
return (
    [
    padTo2Digits(date.getHours()),
    padTo2Digits(date.getMinutes()),
    padTo2Digits(date.getSeconds()),
    ].join(':')
);
}