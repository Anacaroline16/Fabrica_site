import {exercicios} from "./listExercicios.js";
import {series} from "./listSeries.js";

const dropdownExercicios = {
    btn: document.querySelector(".dropdown .btn-selecione"),
    conteudo: document.querySelector(".conteudo-selecione"),
    input: document.querySelector(".conteudo-selecione input"),
    opcoes: document.querySelector(".conteudo-selecione .opcoes"),
    icone: document.querySelector("#icon_selecione"),
    data: exercicios,
};

const dropdownSeries = {
    btn: document.querySelector(".dropdown-series .btn-selecione"),
    conteudo: document.querySelector(".conteudo-selecione-series"),
    input: document.querySelector(".conteudo-selecione-series input"),
    opcoes: document.querySelector(".conteudo-selecione-series .opcoes"),
    icone: document.querySelector("#icon_selecione_series"),
    data: series, 
};

// Inicializar os dropdowns
initializeDropdown(dropdownExercicios);
initializeDropdown(dropdownSeries);
// const conteudo_selecione = document.querySelector('.conteudo-selecione');
// const opcoes = document.querySelector('.conteudo-selecione .opcoes');
// const input_selecione = document.querySelector('.conteudo-selecione input');
// const btn_selecione = document.querySelector('.btn-selecione');
// const txt_selecione = document.querySelector('.btn-selecione span');
// const icone_selecione = document.querySelector('#icon_selecione');

btn_selecione.onclick = () => toggleActive();

function toggleActive(conteudo, input, icone){
    conteudo.classList.toggle("active");

    if (conteudo.classList.contains("active")){
        input.focus();
        icone.classList.value = "bx bx-chevron-up";
    } else{
        icone.classList.value = "bx bx-chevron-down";
    }
}


function filter(input, data, callback){
    const arrFilter = data.filter((item) => item.toLocaleLowerCase().includes(input.value.toLocaleLowerCase())
    );
    callback(arrFilter);
}

function setItems(arr, opcoes, btnSpan, input, toggleFn){
    opcoes.textContent = null;
    const fragment = document.createDocumentFragment();
    
    arr.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = item;
        fragment.appendChild(li);

        if (li.textContent === btnSpan.textContent){
            li.style.backgroundColor = 'lightgray';
        }
        
        li.onclick = () => {
            btnSpan.textContent = li.textContent;
            input.value = " ";
            toggleFn();
            // filter();
        };
    });

    if (arr.length === 0 ){
        const li = document.createElement("li");
        li.textContent = "Nenhum item encontrado";
        fragment.appendChild(li);
    }
    opcoes.appendChild(fragment);
}
function initializeDropdown({ btn, conteudo, input, opcoes, icone, data }) {
    const btnSpan = btn.querySelector("span");

    btn.onclick = () => toggleActive(conteudo, input, icone);

    input.oninput = () => filter(input, data, (filteredData) => {
        setItems(filteredData, opcoes, btnSpan, input, () =>
            toggleActive(conteudo, input, icone)
        );
    });

    setItems(data, opcoes, btnSpan, input, () =>
        toggleActive(conteudo, input, icone)
    );
}

