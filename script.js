const warnaGelang1 = document.getElementById("gelang1-select");
const warnaGelang2 = document.getElementById("gelang2-select");
const warnaGelang3 = document.getElementById("gelang3-select");
const warnaGelang4 = document.getElementById("gelang4-select");
const gelang1 = document.querySelector(".gelang1");
const gelang2 = document.querySelector(".gelang2");
const gelang3 = document.querySelector(".gelang3");
const gelang4 = document.querySelector(".gelang4");
const calculateBtn = document.getElementById("calculate-btn");
const resultDiv = document.getElementById("result");

// Fungsi untuk mengubah warna band
function updateBandColors() {
  gelang1.style.backgroundColor = warnaGelang1.value;
  gelang2.style.backgroundColor = warnaGelang2.value;
  gelang3.style.backgroundColor = warnaGelang3.value;
  gelang4.style.backgroundColor = warnaGelang4.value;
}

// Event listener untuk perubahan warna
[warnaGelang1, warnaGelang2, warnaGelang3, warnaGelang4].forEach((select) => {
  select.addEventListener("change", updateBandColors);
});

// Fungsi konversi warna ke nilai
function colorToValue(color) {
  const colorValues = {
    black: 0,
    brown: 1,
    red: 2,
    orange: 3,
    yellow: 4,
    green: 5,
    blue: 6,
    violet: 7,
    gray: 8,
    white: 9,
  };
  return colorValues[color];
}

// Fungsi konversi multiplier
function multiplierToValue(color) {
  const multiplierValues = {
    black: 1,
    brown: 10,
    red: 100,
    orange: 1000,
    yellow: 10000,
    green: 100000,
    blue: 1000000,
    violet: 10000000,
    gray: 100000000,
    white: 1000000000,
    gold: 0.1,
    silver: 0.01,
  };
  return multiplierValues[color];
}

// Fungsi konversi toleransi
function toleranceToValue(color) {
  const toleranceValues = {
    brown: "±1%",
    red: "±2%",
    green: "±0.5%",
    blue: "±0.25%",
    violet: "±0.1%",
    gray: "±0.05%",
    gold: "±5%",
    silver: "±10%",
  };
  return toleranceValues[color];
}

// Fungsi format resistansi
function formatResistance(resistance) {
  if (resistance >= 1000000) {
    return (resistance / 1000000).toFixed(2) + " MΩ";
  } else if (resistance >= 1000) {
    return (resistance / 1000).toFixed(2) + " kΩ";
  } else {
    return resistance.toFixed(2) + " Ω";
  }
}

// Fungsi untuk menghitung resistansi
function calculateResistance() {
  const band1Value = colorToValue(warnaGelang1.value);
  const band2Value = colorToValue(warnaGelang2.value);
  const band3Multiplier = multiplierToValue(warnaGelang3.value);
  const band4Tolerance = toleranceToValue(warnaGelang4.value);

  const resistance = (band1Value * 10 + band2Value) * band3Multiplier;

  const resultHeading = document.getElementById("hasilResistor");
  resultHeading.innerHTML = `Nilai Resistansi: <p style="font-size: 20px";>${formatResistance(
    resistance
  )} ${band4Tolerance}</p>`;
}

// Fungsi validasi
function validateInput() {
  const selects = [warnaGelang1, warnaGelang2, warnaGelang3, warnaGelang4];

  const resultHeading = document.getElementById("hasilResistor");

  for (let i = 0; i < selects.length; i++) {
    if (selects[i].value === "#ebdbcb") {
      resultHeading.innerHTML = `
                 <p style="color: red; font-weight: bold; font-size: 20px;">⚠️ HARAP PILIH SEMUA WARNA GELANG! ⚠️
            </p>`;
      return false;
    }
  }
  return true;
}
calculateBtn.addEventListener("click", function () {
  const resultHeading = document.getElementById("hasilResistor");
  if (validateInput()) {
    calculateResistance();
  } else {
    resultHeading.style.display = "block";
  }
});
