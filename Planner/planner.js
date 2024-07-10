const diasDaSemana = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];
let currentDate = new Date(2024, 6, 8); // Data inicial: 08/07/2024
let weekCounter = 0; // Contador de semanas

// Função para determinar quem é responsável com base no dia da semana e tipo de responsabilidade
function determinarResponsavel(dia, responsabilidade, semanaPar) {
    const alternanciaPar = {
        'Segunda': { 'Caixa': 'Karen', 'Incidentes': 'Mayara' },
        'Terça': { 'Caixa': 'Mayara', 'Incidentes': 'Karen' },
        'Quarta': { 'Caixa': 'Karen', 'Incidentes': 'Mayara' },
        'Quinta': { 'Caixa': 'Mayara', 'Incidentes': 'Karen' },
        'Sexta': { 'Caixa': 'Karen', 'Incidentes': 'Mayara' }
    };

    const alternanciaImpar = {
        'Segunda': { 'Caixa': 'Mayara', 'Incidentes': 'Karen' },
        'Terça': { 'Caixa': 'Karen', 'Incidentes': 'Mayara' },
        'Quarta': { 'Caixa': 'Mayara', 'Incidentes': 'Karen' },
        'Quinta': { 'Caixa': 'Karen', 'Incidentes': 'Mayara' },
        'Sexta': { 'Caixa': 'Mayara', 'Incidentes': 'Karen' }
    };

    return semanaPar ? alternanciaPar[dia][responsabilidade] : alternanciaImpar[dia][responsabilidade];
}

// Função para criar e preencher a tabela do planner
function criarPlanner(startDate, semanaPar) {
    const tbody = document.querySelector('#planner tbody');
    tbody.innerHTML = ''; // Limpar a tabela antes de adicionar novos dados

    diasDaSemana.forEach((dia, index) => {
        const tr = document.createElement('tr');
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + index);

        const tdDate = document.createElement('td');
        tdDate.textContent = date.toLocaleDateString('pt-BR');
        tr.appendChild(tdDate);

        const tdDia = document.createElement('td');
        tdDia.textContent = dia;
        tr.appendChild(tdDia);

        const tdCaixa = document.createElement('td');
        tdCaixa.textContent = determinarResponsavel(dia, 'Caixa', semanaPar);
        tr.appendChild(tdCaixa);

        const tdIncidentes = document.createElement('td');
        tdIncidentes.textContent = determinarResponsavel(dia, 'Incidentes', semanaPar);
        tr.appendChild(tdIncidentes);

        tbody.appendChild(tr);
    });

    atualizarDatasDaSemana(startDate);
}

// Função para atualizar as datas da semana exibida
function atualizarDatasDaSemana(startDate) {
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 4);
    const weekDatesElement = document.getElementById('week-dates');
    weekDatesElement.textContent = `Semana de ${startDate.toLocaleDateString('pt-BR')} a ${endDate.toLocaleDateString('pt-BR')}`;
}

// Função para simular a próxima semana
function simularProximaSemana() {
    currentDate.setDate(currentDate.getDate() + 7);
    weekCounter++;
    criarPlanner(currentDate, weekCounter % 2 === 0);
}

// Função para voltar a semana anterior
function voltarSemana() {
    currentDate.setDate(currentDate.getDate() - 7);
    weekCounter--;
    criarPlanner(currentDate, weekCounter % 2 === 0);
}

// Chamar a função para criar o planner quando a página carregar
window.onload = () => criarPlanner(currentDate, weekCounter % 2 === 0);
