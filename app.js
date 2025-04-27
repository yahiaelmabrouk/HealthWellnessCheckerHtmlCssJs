const translations = {
  en: {
    title: "BMI Calculator",
    weight: "Weight",
    height: "Height",
    metric: "Metric (kg/cm)",
    imperial: "Imperial (lbs/in)",
    calculate: "Calculate",
    underweight: "Underweight",
    normal: "Normal weight",
    overweight: "Overweight",
    recommendation: {
      underweight:
        "High-calorie, nutrient-rich foods (e.g., nuts, avocados, lean proteins).",
      normal:
        "Balanced diet with fruits, vegetables, whole grains, and proteins.",
      overweight:
        "Low-calorie, high-fiber foods (e.g., vegetables, lean meats, whole grains).",
    },
    maxHealthy: "Max healthy weight for your height:",
    export: "Export PDF",
    invalid: "Please enter valid positive numbers.",
    footer: "Stay healthy with Health & Wellness",
    recommendationLabel: "Diet Recommendation",
  },
  es: {
    title: "Calculadora de IMC",
    weight: "Peso",
    height: "Altura",
    metric: "Métrico (kg/cm)",
    imperial: "Imperial (lbs/in)",
    calculate: "Calcular",
    underweight: "Bajo peso",
    normal: "Peso normal",
    overweight: "Sobrepeso",
    recommendation: {
      underweight:
        "Alimentos ricos en calorías y nutrientes (por ejemplo, nueces, aguacates, proteínas magras).",
      normal:
        "Dieta equilibrada con frutas, verduras, cereales integrales y proteínas.",
      overweight:
        "Alimentos bajos en calorías y ricos en fibra (por ejemplo, verduras, carnes magras, cereales integrales).",
    },
    maxHealthy: "Peso máximo saludable para tu altura:",
    export: "Exportar PDF",
    invalid: "Por favor, introduce números positivos válidos.",
    footer: "Mantente saludable con Salud y Bienestar",
    recommendationLabel: "Recomendación dietética",
  },
  fr: {
    title: "Calculateur IMC",
    weight: "Poids",
    height: "Taille",
    metric: "Métrique (kg/cm)",
    imperial: "Impérial (lbs/in)",
    calculate: "Calculer",
    underweight: "Insuffisance pondérale",
    normal: "Poids normal",
    overweight: "Surpoids",
    recommendation: {
      underweight:
        "Aliments riches en calories et en nutriments (ex : noix, avocats, protéines maigres).",
      normal:
        "Régime équilibré avec fruits, légumes, céréales complètes et protéines.",
      overweight:
        "Aliments faibles en calories et riches en fibres (ex : légumes, viandes maigres, céréales complètes).",
    },
    maxHealthy: "Poids maximal sain pour votre taille :",
    export: "Exporter PDF",
    invalid: "Veuillez entrer des nombres positifs valides.",
    footer: "Restez en bonne santé avec Santé & Bien-être",
    recommendationLabel: "Recommandation diététique",
  },
  ar: {
    title: "حاسبة مؤشر كتلة الجسم",
    weight: "الوزن",
    height: "الطول",
    metric: "متري (كجم/سم)",
    imperial: "إنجليزي (رطل/بوصة)",
    calculate: "احسب",
    underweight: "نقص الوزن",
    normal: "وزن طبيعي",
    overweight: "زيادة الوزن",
    recommendation: {
      underweight:
        "أطعمة غنية بالسعرات والعناصر الغذائية (مثل المكسرات، الأفوكادو، البروتينات الخالية من الدهون).",
      normal:
        "نظام غذائي متوازن مع الفواكه والخضروات والحبوب الكاملة والبروتينات.",
      overweight:
        "أطعمة منخفضة السعرات وغنية بالألياف (مثل الخضروات، اللحوم الخالية من الدهون، الحبوب الكاملة).",
    },
    maxHealthy: "الوزن الأقصى الصحي لطولك:",
    export: "تصدير PDF",
    invalid: "يرجى إدخال أرقام صحيحة وإيجابية.",
    footer: "حافظ على صحتك مع الصحة والعافية",
    recommendationLabel: "توصية غذائية",
  },
};

let currentLang = "en";

function t(key) {
  const keys = key.split(".");
  let val = translations[currentLang];
  for (const k of keys) {
    val = val[k];
    if (!val) break;
  }
  return val || key;
}

function updateTexts() {
  document.getElementById("title").textContent = t("title");
  document.getElementById("weight-label").textContent = t("weight");
  document.getElementById("height-label").textContent = t("height");
  document.getElementById("metric-label").textContent = t("metric");
  document.getElementById("imperial-label").textContent = t("imperial");
  document.getElementById("calculate-btn").textContent = t("calculate");
  document.getElementById("footer-text").textContent = t("footer");
}

document.getElementById("language-select").addEventListener("change", (e) => {
  currentLang = e.target.value;
  updateTexts();
  if (window.lastBMIResult) showResult(window.lastBMIResult);
});

document.getElementById("dark-mode-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  document.getElementById("dark-mode-toggle").textContent =
    document.body.classList.contains("dark") ? "☀️" : "🌙";
});

function showResult({ bmi, category, recommendation, maxHealthyWeight, unit }) {
  const resultDiv = document.getElementById("result");
  if (!bmi) {
    resultDiv.innerHTML = `<div class="error">${t("invalid")}</div>`;
    return;
  }
  const categoryColor =
    category === t("underweight")
      ? "var(--warning)"
      : category === t("normal")
      ? "var(--accent)"
      : category === t("overweight")
      ? "var(--danger)"
      : "#888";
  resultDiv.innerHTML = `
    <div class="gauge-container" style="text-align:center;">
      <svg width="220" height="120" viewBox="0 0 220 120">
        <path d="M30,110 A90,90 0 0,1 190,110" fill="none" stroke="#e0eafc" stroke-width="18"/>
        <path d="M30,110 A90,90 0 0,1 190,110" fill="none" stroke="${categoryColor}" stroke-width="18"
          stroke-dasharray="${((bmi - 10) / 30) * 283},283"/>
        <g transform="rotate(${
          ((Math.min(Math.max(bmi, 10), 40) - 10) / 30) * 270 + 135
        } 110 110)">
          <rect x="107" y="30" width="6" height="60" rx="3" fill="#185a9d" stroke="#185a9d"/>
        </g>
        <!-- Removed the white center circle -->
        <text x="110" y="115" text-anchor="middle" font-size="1.7rem" font-weight="bold" fill="#185a9d">${bmi}</text>
        <text x="110" y="140" text-anchor="middle" font-size="1rem" fill="#888">BMI</text>
      </svg>
      <div style="font-size:1.2rem;margin:0.5rem 0;color:${categoryColor};font-weight:600;">
        ${category}
      </div>
      <div style="color:var(--text-alt);margin-bottom:0.7rem;">
        <strong>${t("recommendationLabel")}:</strong>
        <div>${recommendation}</div>
      </div>
      <div style="margin:0.7rem 0 0.2rem 0;color:var(--text);font-weight:500;font-size:1.05rem;">
        ${t("maxHealthy")} <span style="font-weight:700;">${maxHealthyWeight} ${
    unit === "metric" ? "kg" : "lbs"
  }</span>
      </div>
      <button id="export-pdf-btn">${t("export")}</button>
    </div>
  `;
  document.getElementById("export-pdf-btn").onclick = () =>
    exportPDF({ bmi, category, recommendation, maxHealthyWeight, unit });
}

function exportPDF({ bmi, category, recommendation, maxHealthyWeight, unit }) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text(t("title"), 14, 18);
  doc.setFontSize(12);
  doc.text(
    `${t("weight")}: ${document.getElementById("weight").value} ${
      unit === "metric" ? "kg" : "lbs"
    }`,
    14,
    30
  );
  doc.text(
    `${t("height")}: ${document.getElementById("height").value} ${
      unit === "metric" ? "cm" : "inches"
    }`,
    14,
    38
  );
  doc.text(`BMI: ${bmi}`, 14, 46);
  doc.text(`${t("category") || "Category"}: ${category}`, 14, 54);
  doc.text(`${t("recommendationLabel")}:`, 14, 62);
  doc.text(recommendation, 14, 70, { maxWidth: 180 });
  doc.text(
    `${t("maxHealthy")} ${maxHealthyWeight} ${
      unit === "metric" ? "kg" : "lbs"
    }`,
    14,
    82
  );
  doc.save("bmi_report.pdf");
}

document.getElementById("bmi-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const weight = parseFloat(document.getElementById("weight").value);
  const height = parseFloat(document.getElementById("height").value);
  const unit = document.querySelector('input[name="unit"]:checked').value;

  if (!weight || !height || weight <= 0 || height <= 0) {
    showResult({ bmi: null });
    window.lastBMIResult = { bmi: null };
    return;
  }

  let w = weight,
    h = height;
  if (unit === "imperial") {
    w = w * 0.453592;
    h = h * 2.54;
  }
  const hMeters = h / 100;
  const bmiValue = w / (hMeters * hMeters);
  const bmi = bmiValue.toFixed(1);

  const maxWeight = 24.9 * (hMeters * hMeters);
  const maxHealthyWeight =
    unit === "imperial"
      ? (maxWeight / 0.453592).toFixed(1)
      : maxWeight.toFixed(1);

  let category = "";
  let recommendation = "";
  if (bmiValue < 18.5) {
    category = t("underweight");
    recommendation = t("recommendation.underweight");
  } else if (bmiValue < 25) {
    category = t("normal");
    recommendation = t("recommendation.normal");
  } else {
    category = t("overweight");
    recommendation = t("recommendation.overweight");
  }

  const resultObj = { bmi, category, recommendation, maxHealthyWeight, unit };
  showResult(resultObj);
  window.lastBMIResult = resultObj;
});

updateTexts();
