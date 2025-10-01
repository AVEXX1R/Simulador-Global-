// Variáveis globais para armazenar os totais
let totals = {
    bloco1: 0,
    bloco2: 0,
    bloco3: 0,
    bloco4: 0,
    bloco5: 0
};

// Função para atualizar o total de um bloco
function updateBlockTotal(blockId) {
    let total = 0;
    
    if (blockId === 'bloco1') {
        // Licenciamento
        const fields = ['usuario_admin', 'usuario_operacional', 'usuario_zapcob', 'usuario_integracao'];
        
        fields.forEach(field => {
            const select = document.querySelector(`select[name="${field}"]`);
            if (select) {
                const selectedOption = select.options[select.selectedIndex];
                const value = parseFloat(selectedOption.dataset.value) || 0;
                total += value;
                document.getElementById(`${field}-value`).textContent = `R$ ${value.toLocaleString('pt-BR')}`;
            }
        });
        
        totals.bloco1 = total;
        document.getElementById('bloco1-total').textContent = `R$ ${total.toLocaleString('pt-BR')}`;
        
    } else if (blockId === 'bloco2') {
        // Telefonia
        const fields = ['ramais', 'discador'];
        
        fields.forEach(field => {
            const select = document.querySelector(`select[name="${field}"]`);
            if (select) {
                const selectedOption = select.options[select.selectedIndex];
                const value = parseFloat(selectedOption.dataset.value) || 0;
                total += value;
                document.getElementById(`${field}-value`).textContent = `R$ ${value.toLocaleString('pt-BR')}`;
            }
        });
        
        totals.bloco2 = total;
        document.getElementById('bloco2-total').textContent = `R$ ${total.toLocaleString('pt-BR')}`;
        
    } else if (blockId === 'bloco3') {
        // Créditos Notificações
        const fields = ['email', 'sms_rota1', 'sms_rota2', 'sms_rota3', 'minutagem_fixo', 'minutagem_celular', 'ura'];
        
        fields.forEach(field => {
            const select = document.querySelector(`select[name="${field}"]`);
            if (select) {
                const selectedOption = select.options[select.selectedIndex];
                const value = parseFloat(selectedOption.dataset.value) || 0;
                total += value;
                document.getElementById(`${field}-value`).textContent = `R$ ${value.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
            }
        });
        
        totals.bloco3 = total;
        document.getElementById('bloco3-total').textContent = `R$ ${total.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
        
    } else if (blockId === 'bloco4') {
        // Portal Financeiro
        const fields = ['portal_pontocob', 'portal_independente'];
        
        fields.forEach(field => {
            const select = document.querySelector(`select[name="${field}"]`);
            if (select) {
                const selectedOption = select.options[select.selectedIndex];
                const value = parseFloat(selectedOption.dataset.value) || 0;
                total += value;
                document.getElementById(`${field}-value`).textContent = `R$ ${value.toLocaleString('pt-BR')}`;
            }
        });
        
        totals.bloco4 = total;
        document.getElementById('bloco4-total').textContent = `R$ ${total.toLocaleString('pt-BR')}`;
        
    } else if (blockId === 'bloco5') {
        // Enriquecimento
        const fields = ['dados_sintegra', 'demais_dados'];
        
        fields.forEach(field => {
            const select = document.querySelector(`select[name="${field}"]`);
            if (select) {
                const selectedOption = select.options[select.selectedIndex];
                const value = parseFloat(selectedOption.dataset.value) || 0;
                total += value;
                document.getElementById(`${field}-value`).textContent = `R$ ${value.toLocaleString('pt-BR')}`;
            }
        });
        
        totals.bloco5 = total;
        document.getElementById('bloco5-total').textContent = `R$ ${total.toLocaleString('pt-BR')}`;
    }
    
    // Atualizar total geral
    updateTotalGeral();
}

// Função para atualizar o total geral
function updateTotalGeral() {
    const totalGeral = totals.bloco1 + totals.bloco2 + totals.bloco3 + totals.bloco4 + totals.bloco5;
    document.getElementById('total-geral').textContent = `R$ ${totalGeral.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
}

// Função para gerar relatório
function gerarRelatorio() {
    const relatorioContent = document.getElementById('relatorio-content');
    let html = '';
    
    // Header do relatório
    html += `
        <div style="text-align: center; margin-bottom: 30px;">
            <h2 style="color: #2563eb; margin-bottom: 10px;"><img src="logo.png" alt="Logo" style="height: 30px; width: auto; vertical-align: middle; margin-right: 10px;">Plus</h2>
            <h2 style="color: #2563eb; margin-bottom: 10px;">Relatório de Investimento Mensal</h2>
            <p style="color: #64748b;">Gerado em: ${new Date().toLocaleDateString('pt-BR')}</p>
        </div>
    `;
    
    // Cabeçalho da tabela
    html += `
        <div class="relatorio-item header">
            <div><strong>Item</strong></div>
            <div><strong>Quantidade</strong></div>
            <div><strong>Valor</strong></div>
        </div>
    `;
    
    // Bloco 1: Licenciamento
    html += `<h3 style="margin: 20px 0 10px 0; color: #2563eb;">1. Licenciamento</h3>`;
    
    const licenciamento = [
        { name: 'usuario_admin', label: 'Usuário Administrador', unitario: 500 },
        { name: 'usuario_operacional', label: 'Usuário Operacional', unitario: 250 },
        { name: 'usuario_zapcob', label: 'Usuário ZapCob', unitario: 100 },
        { name: 'usuario_integracao', label: 'Usuário Integração', unitario: 250 }
    ];
    
    licenciamento.forEach(item => {
        const select = document.querySelector(`select[name="${item.name}"]`);
        if (select) {
            const quantidade = select.value;
            const valor = parseFloat(select.options[select.selectedIndex].dataset.value) || 0;
            html += `
                <div class="relatorio-item">
                    <div>${item.label}</div>
                    <div>${quantidade}</div>
                    <div>R$ ${valor.toLocaleString('pt-BR')}</div>
                </div>
            `;
        }
    });
    
    html += `
        <div class="relatorio-item total">
            <div><strong>Total Licenciamento</strong></div>
            <div></div>
            <div><strong>R$ ${totals.bloco1.toLocaleString('pt-BR')}</strong></div>
        </div>
    `;
    
    // Bloco 2: Telefonia
    html += `<h3 style="margin: 20px 0 10px 0; color: #2563eb;">2. Telefonia</h3>`;
    
    const telefonia = [
        { name: 'ramais', label: 'Ramais', unitario: 85 },
        { name: 'discador', label: 'Discador', unitario: 250 }
    ];
    
    telefonia.forEach(item => {
        const select = document.querySelector(`select[name="${item.name}"]`);
        if (select) {
            const quantidade = select.value;
            const valor = parseFloat(select.options[select.selectedIndex].dataset.value) || 0;
            html += `
                <div class="relatorio-item">
                    <div>${item.label}</div>
                    <div>${quantidade}</div>
                    <div>R$ ${valor.toLocaleString('pt-BR')}</div>
                </div>
            `;
        }
    });
    
    html += `
        <div class="relatorio-item total">
            <div><strong>Total Telefonia</strong></div>
            <div></div>
            <div><strong>R$ ${totals.bloco2.toLocaleString('pt-BR')}</strong></div>
        </div>
    `;
    
    // Bloco 3: Créditos Notificações
    html += `<h3 style="margin: 20px 0 10px 0; color: #2563eb;">3. Créditos Notificações</h3>`;
    
    const creditos = [
        { name: 'email', label: 'E-mail', unitario: 0.040 },
        { name: 'sms_rota1', label: 'SMS Rota 1', unitario: 0.044 },
        { name: 'sms_rota2', label: 'SMS Rota 2', unitario: 0.054 },
        { name: 'sms_rota3', label: 'SMS Rota 3', unitario: 0.075 },
        { name: 'minutagem_fixo', label: 'Minutagem Fixo', unitario: 0.100 },
        { name: 'minutagem_celular', label: 'Minutagem Celular', unitario: 0.150 },
        { name: 'ura', label: 'URA', unitario: 0.150 }
    ];
    
    creditos.forEach(item => {
        const select = document.querySelector(`select[name="${item.name}"]`);
        if (select) {
            const quantidade = select.value;
            const valor = parseFloat(select.options[select.selectedIndex].dataset.value) || 0;
            html += `
                <div class="relatorio-item">
                    <div>${item.label}</div>
                    <div>${parseInt(quantidade).toLocaleString('pt-BR')}</div>
                    <div>R$ ${valor.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
                </div>
            `;
        }
    });
    
    html += `
        <div class="relatorio-item">
            <div>WhatsApp</div>
            <div>-</div>
            <div>Contratação direto com a Meta</div>
        </div>
    `;
    
    html += `
        <div class="relatorio-item total">
            <div><strong>Total Créditos Notificações</strong></div>
            <div></div>
            <div><strong>R$ ${totals.bloco3.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</strong></div>
        </div>
    `;
    
    // Bloco 4: Portal Financeiro
    html += `<h3 style="margin: 20px 0 10px 0; color: #2563eb;">4. Portal Financeiro</h3>`;
    
    const portal = [
        { name: 'portal_pontocob', label: 'Portal PontoCob - Licenciamento Mensal', unitario: 500 },
        { name: 'portal_independente', label: 'Portal Independente por Projeto', unitario: 2500 }
    ];
    
    portal.forEach(item => {
        const select = document.querySelector(`select[name="${item.name}"]`);
        if (select) {
            const quantidade = select.value;
            const valor = parseFloat(select.options[select.selectedIndex].dataset.value) || 0;
            html += `
                <div class="relatorio-item">
                    <div>${item.label}</div>
                    <div>${quantidade}</div>
                    <div>R$ ${valor.toLocaleString('pt-BR')}</div>
                </div>
            `;
        }
    });
    
    html += `
        <div class="relatorio-item total">
            <div><strong>Total Portal Financeiro</strong></div>
            <div></div>
            <div><strong>R$ ${totals.bloco4.toLocaleString('pt-BR')}</strong></div>
        </div>
    `;
    
    // Bloco 5: Enriquecimento
    html += `<h3 style="margin: 20px 0 10px 0; color: #2563eb;">5. Enriquecimento</h3>`;
    
    const enriquecimento = [
        { name: 'dados_sintegra', label: 'Dados cadastrais - Sintegra', unitario: 0.80 },
        { name: 'demais_dados', label: 'Demais dados - telefone, e-mail, pessoas relacionadas, endereço', unitario: 0.40 }
    ];
    
    enriquecimento.forEach(item => {
        const select = document.querySelector(`select[name="${item.name}"]`);
        if (select) {
            const quantidade = select.value;
            const valor = parseFloat(select.options[select.selectedIndex].dataset.value) || 0;
            html += `
                <div class="relatorio-item">
                    <div>${item.label}</div>
                    <div>${quantidade}</div>
                    <div>R$ ${valor.toLocaleString('pt-BR')}</div>
                </div>
            `;
        }
    });
    
    html += `
        <div class="relatorio-item total">
            <div><strong>Total Enriquecimento</strong></div>
            <div></div>
            <div><strong>R$ ${totals.bloco5.toLocaleString('pt-BR')}</strong></div>
        </div>
    `;
    
    // Total Geral
    const totalGeral = totals.bloco1 + totals.bloco2 + totals.bloco3 + totals.bloco4 + totals.bloco5;
    html += `
        <div style="margin-top: 30px; padding: 20px; background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; border-radius: 12px; text-align: center;">
            <h2 style="margin: 0; font-size: 1.5rem;">TOTAL DO INVESTIMENTO MENSAL</h2>
            <div style="font-size: 2.5rem; font-weight: 700; margin-top: 15px; color: #e0e0e0ff;">
                R$ ${totalGeral.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
            </div>
        </div>
    `;
    
    relatorioContent.innerHTML = html;
    document.getElementById('relatorioModal').style.display = 'block';
}

// Função para fechar modal
function fecharModal() {
    document.getElementById('relatorioModal').style.display = 'none';
}

// Função para imprimir relatório
function imprimirRelatorio() {
    const conteudo = document.getElementById('relatorio-content').innerHTML;
    const janela = window.open('', '_blank');
    janela.document.write(`
        <html>
            <head>
                <title> - </title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    .relatorio-item { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 15px; padding: 10px; border-bottom: 1px solid #ccc; }
                    .relatorio-item.header { background: #f0f0f0; font-weight: bold; }
                    .relatorio-item.total { background: #e6f3ff; font-weight: bold; border: 1px solid #0ea5e9; margin-top: 10px; }
                    h2, h3 { color: #2563eb; }
                </style>
            </head>
            <body>
                ${conteudo}
            </body>
        </html>
    `);
    janela.document.close();
    janela.print();
}

// Função para limpar formulário
function limparFormulario() {
    if (confirm('Tem certeza que deseja limpar todas as opções selecionadas?')) {
        // Resetar todos os selects para primeira opção (0)
        const selects = document.querySelectorAll('select');
        selects.forEach(select => {
            select.selectedIndex = 0;
        });
        
        // Recalcular todos os totais
        updateBlockTotal('bloco1');
        updateBlockTotal('bloco2');
        updateBlockTotal('bloco3');
        updateBlockTotal('bloco4');
        updateBlockTotal('bloco5');
    }
}

// Fechar modal ao clicar fora dele
window.onclick = function(event) {
    const modal = document.getElementById('relatorioModal');
    if (event.target === modal) {
        fecharModal();
    }
}

// Inicialização quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    // Calcular totais iniciais
    updateBlockTotal('bloco1');
    updateBlockTotal('bloco2');
    updateBlockTotal('bloco3');
    updateBlockTotal('bloco4');
    updateBlockTotal('bloco5');
    updateTotalGeral();
});

