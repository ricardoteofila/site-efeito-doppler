
const formulario = document.getElementById("dopplerForm");
const resultado = document.getElementById("resultado");
const frequenciaCalculada =
    document.getElementById("frequenciaCalculada");
const interpretacao = document.getElementById("interpretacao");
const erro = document.getElementById("erro");

formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    erro.textContent = "";
    resultado.hidden = true;

    // Receber os valores informados pelo usuário
    const vo = Number(document.getElementById("velObservador").value);
    const vs = Number(document.getElementById("velFonte").value);
    const v = Number(document.getElementById("velSom").value);
    const f0 = Number(document.getElementById("freqFonte").value);

    // Validar os dados
    if (![vo, vs, v, f0].every(Number.isFinite)) {
        erro.textContent = "Informe valores numéricos válidos.";
        return;
    }

    if (v <= 0 || f0 <= 0) {
        erro.textContent =
            "A velocidade do som e a frequência devem ser maiores que zero.";
        return;
    }

    if (Math.abs(vs) >= v) {
        erro.textContent =
            "A velocidade da fonte deve ter módulo menor que a velocidade do som.";
        return;
    }

    // Fórmula do efeito Doppler
    const fObs = f0 * (v + vo) / (v - vs);

    if (!Number.isFinite(fObs) || fObs <= 0) {
        erro.textContent =
            "Os valores informados não produzem uma frequência física válida neste modelo.";
        return;
    }

    // Exibir o resultado
    frequenciaCalculada.textContent =
        fObs.toLocaleString("pt-BR", {
            maximumFractionDigits: 2
        }) + " Hz";

    if (fObs > f0) {
        interpretacao.textContent =
            "A frequência percebida é maior que a emitida.";
    } else if (fObs < f0) {
        interpretacao.textContent =
            "A frequência percebida é menor que a emitida.";
    } else {
        interpretacao.textContent =
            "A frequência percebida é igual à frequência emitida.";
    }

    resultado.hidden = false;
});

// Limpar também as mensagens e o resultado
formulario.addEventListener("reset", function () {
    resultado.hidden = true;
    erro.textContent = "";
});
