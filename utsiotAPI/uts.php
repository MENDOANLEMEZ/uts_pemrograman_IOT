<?php
header("Access-Control-Allow-Origin: *");
include('koneksi.php');

if (!$conn) {
    return;
}

// Kueri untuk data suhu
$result = $conn->query("SELECT MAX(suhu) AS suhumax, MIN(suhu) AS suhumin, AVG(suhu) AS suhurata FROM tb_cuaca");
$suhuData = $result->fetch_assoc();

// Kueri yang lebih sederhana untuk data suhu maksimum
$query = "
    SELECT id AS idx, suhu AS suhun, humid, lux AS kecerahan, ts AS timestamp
    FROM tb_cuaca
    ORDER BY suhu DESC, humid DESC
    LIMIT 2
";
$result = $conn->query($query);
$nilaiSuhuMaxHumidMax = [];
while ($row = $result->fetch_assoc()) {
    $nilaiSuhuMaxHumidMax[] = $row;
}

// Kueri untuk data bulan-tahun
$query = "SELECT DISTINCT DATE_FORMAT(ts, '%m-%Y') AS month_year FROM tb_cuaca LIMIT 2";
$result = $conn->query($query);
$monthYearMaxDema = [];
while ($row = $result->fetch_assoc()) {
    $monthYearMaxDema[] = $row;
}

// Format data JSON
$data = [
    "suhumax" => (int)$suhuData['suhumax'],
    "suhumin" => (int)$suhuData['suhumin'],
    "suhurata" => round((float)$suhuData['suhurata'], 2),
    "nilai_suhu_max_humid_max" => $nilaiSuhuMaxHumidMax,
    "month_year_max_dema" => $monthYearMaxDema
];

// Tampilkan data dalam format JSON
header('Content-Type: application/json');
echo json_encode($data);

// Tutup koneksi
$conn->close();
?>
