function calculate() {
    // Obtener valores del formulario
    let gender = document.getElementById("gender").value;
    let weight = parseFloat(document.getElementById("weight").value);
    let height = parseFloat(document.getElementById("height").value);
    let age = parseFloat(document.getElementById("age").value);
    let activity = parseFloat(document.getElementById("activity").value);
    let goal = document.getElementById("goal").value;

    if (isNaN(weight) || isNaN(height) || isNaN(age)) {
        document.getElementById("result").innerHTML = "<p style='color: red;'>Por favor, completa todos los campos.</p>";
        return;
    }

    // Calcular TMB (Tasa Metabólica Basal) usando la fórmula de Harris-Benedict
    let TMB;
    if (gender === "male") {
        TMB = 88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age);
    } else {
        TMB = 447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age);
    }

    // Calcular GET (Gasto Energético Total) según nivel de actividad
    let GET = TMB * activity;

    // Ajustar calorías según el objetivo
    let calories;
    if (goal === "gain") {
        calories = GET + 380; // Subir de peso (superávit)
    } else {
        calories = GET - 400; // Bajar grasa (déficit)
    }

    // Calcular proteínas (entre 1.6 y 2.2 g/kg para subir, 2 a 2.5 g/kg para definir)
    let proteinMin, proteinMax;
    if (goal === "gain") {
        proteinMin = weight * 1.6;
        proteinMax = weight * 2.2;
    } else {
        proteinMin = weight * 2.0;
        proteinMax = weight * 2.5;
    }

    // Mostrar resultados
    document.getElementById("result").innerHTML = `
        <h3>Resultados:</h3>
        <p><strong>Calorías diarias necesarias:</strong> ${calories.toFixed(2)} calorías</p>
        <p><strong>Proteínas necesarias:</strong> entre ${proteinMin.toFixed(2)} g y ${proteinMax.toFixed(2)} g por día</p>
    `;
}
