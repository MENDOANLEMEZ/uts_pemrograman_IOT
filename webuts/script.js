async function fetchData() {
  try {
    const response = await fetch("http://localhost/utsiot/uts.php");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();

    // Displaying temperature data
    document.getElementById("suhumax").textContent = data.suhumax + " °C";
    document.getElementById("suhumin").textContent = data.suhumin + " °C";
    document.getElementById("suhurata").textContent = data.suhurata + " °C";

    // Populating the Top Max Temp and Humidity table
    const nilaiSuhuMaxHumidMaxTable = document.getElementById("nilaiSuhuMaxHumidMaxTable").getElementsByTagName("tbody")[0];
    nilaiSuhuMaxHumidMaxTable.innerHTML = ""; // Clear previous content
    data.nilai_suhu_max_humid_max.forEach((item) => {
      const row = nilaiSuhuMaxHumidMaxTable.insertRow();
      row.insertCell(0).textContent = item.idx;
      row.insertCell(1).textContent = item.suhun + " °C";
      row.insertCell(2).textContent = item.humid + "%";
      row.insertCell(3).textContent = item.kecerahan;
      row.insertCell(4).textContent = item.timestamp;
    });

    // Populating the Month-Year Max Dema table
    const monthYearMaxDemaTable = document.getElementById("monthYearMaxDemaTable").getElementsByTagName("tbody")[0];
    monthYearMaxDemaTable.innerHTML = ""; // Clear previous content
    data.month_year_max_dema.forEach((item) => {
      const row = monthYearMaxDemaTable.insertRow();
      row.insertCell(0).textContent = item.month_year;
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    document.getElementById("suhumax").textContent = "Error loading data";
    document.getElementById("suhumin").textContent = "Error loading data";
    document.getElementById("suhurata").textContent = "Error loading data";

    // Display error in tables
    document.getElementById("nilaiSuhuMaxHumidMaxTable").getElementsByTagName("tbody")[0].innerHTML = '<tr><td colspan="5">Error loading data</td></tr>';
    document.getElementById("monthYearMaxDemaTable").getElementsByTagName("tbody")[0].innerHTML = "<tr><td>Error loading data</td></tr>";
  }
}

fetchData();
