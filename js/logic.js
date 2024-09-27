const second = document.querySelector(".second_part")
const third = document.querySelector(".third_part")
const form = document.querySelector(".main_form")
const inputA = document.querySelector("#m_amount")
const inputI = document.querySelector("#m_interest")
const inputT = document.querySelector("#m_term")
const clearB = document.querySelector(".clear_button")
const divLime = document.querySelector(".inside_lime")
const label_one = document.querySelector(".inp_one")
const label_two = document.querySelector(".mortgage_term")
const label_three =document.querySelector(".interest_rate")



clearB.addEventListener("click", () => {
    form.reset()
    showIntro()
    label_one.classList.remove("error")
    label_two.classList.remove("error")
    label_three.classList.remove("error")
})

inputA.addEventListener("input", () => {

    inputA.value = inputA.value.replace(/[^0-9,.]/, "")
    label_one.classList.remove("error")
    const cleanValue = cleanNumber(inputA.value)
    inputA.value = ponerCommas(cleanValue)
    const pointCount = (inputA.value.match(/\./g) || []).length;
    if (pointCount > 1) {
        inputA.value = inputA.value.slice(0, -1);
        return;
    }
})
function ponerCommas(value) {
    let parts = value.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join('.');
}
function cleanNumber(value) {
    return value.replace(/,/g, '');
}

inputI.addEventListener("input", () => {

    const pointCount = (inputI.value.match(/\./g) || []).length;
    inputI.value = inputI.value.replace(/[^0-9.]/, "")
    label_three.classList.remove("error")
    if (pointCount > 1) {
        inputI.value = inputI.value.slice(0, -1);
        return;
    }
})
inputT.addEventListener("input", () => {

    const pointCount = (inputT.value.match(/\./g) || []).length;
    label_two.classList.remove("error")
    
    inputT.value = inputT.value.replace(/[^0-9.]/, "")
    if (pointCount > 1) {
        inputT.value = inputT.value.slice(0, -1);
        return;
    }

})


form.addEventListener("submit", (e) => {
    e.preventDefault()
    const formdata = new FormData(form)
    const ch = formdata.get("choose")

    if (formdata.get("m_amount") === "" || formdata.get("m_interest") === "" || formdata.get("m_term") === "") {
    label_one.classList.add("error")
    label_two.classList.add("error")
    label_three.classList.add("error")

    } if (ch === "repay") {
        calcular(e)
    } 
    if (ch==="interest_only"){
        calcularSoloInteres(e)
    }
})

function calcular(e) {
    e.preventDefault()
    const formdata = new FormData(form)
    const clean = cleanNumber(formdata.get("m_amount"))
    const p = parseFloat(clean)
    const r = parseFloat(formdata.get("m_interest")) / 100
    const n = parseFloat(formdata.get("m_term")) * 12
    const res = (p * (r / 12) * ((1 + (r / 12)) ** n) / (((1 + (r / 12)) ** n) - 1))
    const total = parseFloat((res * 12) * (n / 12))
    showResults(ponerCommas(res.toFixed(2)), ponerCommas(total.toFixed(2)))

}

function calcularSoloInteres(e) {
    e.preventDefault()
    const formdata = new FormData(form)
    const clean = cleanNumber(formdata.get("m_amount"))
    const p = parseFloat(clean)
    const r = parseFloat(formdata.get("m_interest")) / 100
    const n = parseFloat(formdata.get("m_term")) * 12
    const res = (p * (r / 12) * ((1 + (r / 12)) ** n) / (((1 + (r / 12)) ** n) - 1))
    const total = parseFloat((res * 12) * (n / 12))
    const interes = res - (p / n)
    const totalInteres = total - p
    showResultsInteres(ponerCommas(interes.toFixed(2)), ponerCommas(totalInteres.toFixed(2)))
}

function showResults(result, total_amount) {
    third.classList.remove("d-none")
    second.classList.add("d-none")
    divLime.innerHTML = ""
    const h3 = document.createElement("h3")
    const span = document.createElement("span")
    h3c = document.createElement("h3")
    spanClon = document.createElement("span")
    h3.setAttribute("class", `text-light pt-3 ps-3`)
    h3.textContent = "El pago mensual es: "
    span.setAttribute("class", `text_lime ps-3`)
    span.textContent = `$ ${result}`
    const hr = document.createElement("hr")

    h3c.setAttribute("class", `text-light pt-2 ps-3`)
    h3c.textContent = "El pago total que realizarás es: "
    spanClon.setAttribute("class", `text_gray ps-3`)
    spanClon.textContent = `$ ${total_amount}`
    divLime.append(h3, span, hr, h3c, spanClon)
}

function showResultsInteres(int, totalInt) {
    third.classList.remove("d-none")
    second.classList.add("d-none")
    divLime.innerHTML = ""
    const h3 = document.createElement("h3")
    const span = document.createElement("span")
    h3c = document.createElement("h3")
    spanClon = document.createElement("span")
    h3.setAttribute("class", `text-light pt-3 ps-3`)
    h3.textContent = "El pago de solo interes mensual es: "
    span.setAttribute("class", `text_lime ps-3`)
    span.textContent = `$ ${int}`
    const hr = document.createElement("hr")

    h3c.setAttribute("class", `text-light pt-2 ps-3`)
    h3c.textContent = "El pago total de Interes que realizarás es: "
    spanClon.setAttribute("class", `text_gray ps-3`)
    spanClon.textContent = `$ ${totalInt}`
    divLime.append(h3, span, hr, h3c, spanClon)
}

function showIntro() {
    third.classList.add("d-none")
    second.classList.remove("d-none")
}
