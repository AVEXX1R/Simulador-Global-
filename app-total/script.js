// Variáveis globais para armazenar os totais
let totals = {
    bloco1: 0,
    bloco2: 1300, // Valor fixo das funcionalidades básicas
    bloco3: 400,  // Valor inicial (títulos até 2999)
    bloco4: 0
};

// Função para alternar a seção de integrações
function toggleIntegracoes(enabled) {
    const integracoesSection = document.getElementById('integracoes-details');
    const inputs = integracoesSection.querySelectorAll('input[type="radio"]');
    
    if (enabled) {
        integracoesSection.classList.remove('disabled');
        inputs.forEach(input => input.disabled = false);
    } else {
        integracoesSection.classList.add('disabled');
        inputs.forEach(input => {
            input.disabled = true;
            if (input.value === 'nao') {
                input.checked = true;
            } else {
                input.checked = false;
            }
        });
        // Resetar todos os valores do bloco 1
        resetBlockValues('bloco1');
        updateBlockTotal('bloco1');
    }
}

// Função para resetar valores de um bloco
function resetBlockValues(blockId) {
    if (blockId === 'bloco1') {
        document.getElementById('datasul-value').textContent = 'R$ 0';
        document.getElementById('protheus-value').textContent = 'R$ 0';
        document.getElementById('sap-value').textContent = 'R$ 0';
        document.getElementById('asaas-value').textContent = 'R$ 0';
        document.getElementById('cliente_dev-value').textContent = 'Falar com time de desenvolvimento';
        document.getElementById('outro_sistema-value').textContent = 'R$ 0';
    }
}

// Função para atualizar o total de um bloco
function updateBlockTotal(blockId) {
    let total = 0;
    
    if (blockId === 'bloco1') {
        // Calcular total das integrações
        const processoIntegrado = document.querySelector('input[name="processo_integrado"]:checked');
        
        if (processoIntegrado && processoIntegrado.value === 'sim') {
            const datasul = document.querySelector('input[name="datasul"]:checked');
            const protheus = document.querySelector('input[name="protheus"]:checked');
            const sap = document.querySelector('input[name="sap"]:checked');
            const asaas = document.querySelector('input[name="asaas"]:checked');
            
            if (datasul) {
                const value = parseInt(datasul.dataset.value);
                total += value;
                document.getElementById('datasul-value').textContent = value > 0 ? `R$ ${value.toLocaleString('pt-BR')}` : 'R$ 0';
            }
            
            if (protheus) {
                const value = parseInt(protheus.dataset.value);
                total += value;
                document.getElementById('protheus-value').textContent = value > 0 ? `R$ ${value.toLocaleString('pt-BR')}` : 'R$ 0';
            }
            
            if (sap) {
                const value = parseInt(sap.dataset.value);
                total += value;
                document.getElementById('sap-value').textContent = value > 0 ? `R$ ${value.toLocaleString('pt-BR')}` : 'R$ 0';
            }
            
            if (asaas) {
                const value = parseInt(asaas.dataset.value);
                total += value;
                document.getElementById('asaas-value').textContent = value > 0 ? `R$ ${value.toLocaleString('pt-BR')}` : 'R$ 0';
            }
            
            // Atualizar valores de texto especiais
            const clienteDev = document.querySelector('input[name="cliente_dev"]:checked');
            if (clienteDev) {
                document.getElementById('cliente_dev-value').textContent = clienteDev.dataset.text;
            }
            
            const outroSistema = document.querySelector('input[name="outro_sistema"]:checked');
            if (outroSistema) {
                document.getElementById('outro_sistema-value').textContent = outroSistema.dataset.text;
            }
        }
        
        totals.bloco1 = total;
        document.getElementById('bloco1-total').textContent = `R$ ${total.toLocaleString('pt-BR')}`;
        
    } else if (blockId === 'bloco2') {
        // Funcionalidades básicas (valores fixos + parcelamento)
        total = 1300; // Soma dos valores fixos
        
        const parcelamento = document.querySelector('input[name="parcelamento"]:checked');
        if (parcelamento) {
            const value = parseInt(parcelamento.dataset.value);
            total += value;
            document.getElementById('parcelamento-value').textContent = value > 0 ? `R$ ${value.toLocaleString('pt-BR')}` : 'R$ 0';
        }
        
        totals.bloco2 = total;
        document.getElementById('bloco2-total').textContent = `R$ ${total.toLocaleString('pt-BR')}`;
        
    } else if (blockId === 'bloco3') {
        // Funcionalidades avançadas
        const fields = [
            'titulos_aberto', 'cobranca_online', 'pefin_serasa', 'distribuicao_global',
            'mailing_carteira', 'campanha_ura', 'click2call', 'enriquecimento_base',
            'discador', 'whatsapp_api', 'portal_financeiro', 'bot_atendimento',
            'webhook', 'view_bi'
        ];
        
        fields.forEach(field => {
            const input = document.querySelector(`input[name="${field}"]:checked`);
            if (input) {
                const value = parseInt(input.dataset.value);
                total += value;
                document.getElementById(`${field}-value`).textContent = value > 0 ? `R$ ${value.toLocaleString('pt-BR')}` : 'R$ 0';
            }
        });
        
        totals.bloco3 = total;
        document.getElementById('bloco3-total').textContent = `R$ ${total.toLocaleString('pt-BR')}`;
        
    } else if (blockId === 'bloco4') {
        // Treinamentos (usuários são sempre 0, apenas portal financeiro tem valor)
        const portalFinanceiroTreinamento = document.querySelector('input[name="portal_financeiro_treinamento"]:checked');
        if (portalFinanceiroTreinamento) {
            const value = parseInt(portalFinanceiroTreinamento.dataset.value);
            total += value;
            document.getElementById('portal_financeiro_treinamento-value').textContent = value > 0 ? `R$ ${value.toLocaleString('pt-BR')}` : 'R$ 0';
        }
        
        totals.bloco4 = total;
        document.getElementById('bloco4-total').textContent = `R$ ${total.toLocaleString('pt-BR')}`;
    }
    
    // Atualizar total geral
    updateTotalGeral();
}

// Função para atualizar o total geral
function updateTotalGeral() {
    const totalGeral = totals.bloco1 + totals.bloco2 + totals.bloco3 + totals.bloco4;
    document.getElementById('total-geral').textContent = `R$ ${totalGeral.toLocaleString('pt-BR')}`;
}

// Função para gerar relatório
function gerarRelatorio() {
    const relatorioContent = document.getElementById('relatorio-content');
    let html = '';
    
    // Header do relatório
    html += `
        <div style="text-align: center; margin-bottom: 30px;">
            <h2 style="color: #2563eb; margin-bottom: 10px;"><img src="logo.png" alt="Logo" style="height: 60px; width: auto; vertical-align: middle; margin-right: 10px;"></h2>
            <p style="color: #64748b;">Gerado em: ${new Date().toLocaleDateString('pt-BR')}</p>
        </div>
    `;
    
    // Cabeçalho da tabela
    html += `
        <div class="relatorio-item header">
            <div><strong>Item</strong></div>
            <div><strong>Opção Selecionada</strong></div>
            <div><strong>Valor</strong></div>
        </div>
    `;
    
    // Bloco 1: Integrações
    html += `<h3 style="margin: 20px 0 10px 0; color: #2563eb;">1. Integrações</h3>`;
    
    const processoIntegrado = document.querySelector('input[name="processo_integrado"]:checked');
    
    if (processoIntegrado && processoIntegrado.value === 'sim') {
        const integracoes = [
            { name: 'datasul', label: 'Integração com Datasul' },
            { name: 'protheus', label: 'Integração com Protheus' },
            { name: 'sap', label: 'Integração com SAP' },
            { name: 'asaas', label: 'Importação ASAAS - PAGAR.ME' },
            { name: 'cliente_dev', label: 'Cliente desenvolve a integração' },
            { name: 'outro_sistema', label: 'Integração com outro sistema' }
        ];
        
        integracoes.forEach(integracao => {
            const input = document.querySelector(`input[name="${integracao.name}"]:checked`);
            if (input) {
                const value = input.dataset.value;
                const text = input.dataset.text || (value > 0 ? `R$ ${parseInt(value).toLocaleString('pt-BR')}` : 'R$ 0');
            }
        });
    }
    
    html += `
        <div class="relatorio-item total">
            <div><strong>Total Integrações</strong></div>
            <div></div>
            <div><strong>R$ ${totals.bloco1.toLocaleString('pt-BR')}</strong></div>
        </div>
    `;
    
    // Bloco 2: Funcionalidades Básicas
    html += `<h3 style="margin: 20px 0 10px 0; color: #2563eb;">2. Funcionalidades Básicas (Standard)</h3>`;
    
    const funcionalidadesBasicas = [
        { label: 'Régua de Cobrança', opcao: 'Pacote Padrão', valor: 'R$ 500' },
        { label: 'Emissão de Segunda via de boleto', opcao: 'Pacote Padrão', valor: 'R$ 100' },
        { label: 'Registro de Status por títulos', opcao: 'Pacote Padrão', valor: 'R$ 100' },
        { label: 'Gerenciamento de acionamentos', opcao: 'Pacote Padrão', valor: 'R$ 400' },
        { label: 'Encaminha notificações manuais', opcao: 'Pacote Padrão', valor: 'R$ 200' }
    ];
    
    funcionalidadesBasicas.forEach(func => {
    });
    
    const parcelamento = document.querySelector('input[name="parcelamento"]:checked');
    if (parcelamento) {
        const value = parseInt(parcelamento.dataset.value);
    }
    
    html += `
        <div class="relatorio-item total">
            <div><strong>Total Funcionalidades Básicas</strong></div>
            <div></div>
            <div><strong>R$ ${totals.bloco2.toLocaleString('pt-BR')}</strong></div>
        </div>
    `;
    
    // Bloco 3: Funcionalidades Avançadas
    html += `<h3 style="margin: 20px 0 10px 0; color: #2563eb;">3. Funcionalidades Avançadas</h3>`;
    
    const funcionalidadesAvancadas = [
        { name: 'titulos_aberto', label: 'Qtde de títulos em aberto' },
        { name: 'cobranca_online', label: 'Usa meios de cobrança online' },
        { name: 'pefin_serasa', label: 'Usa PEFIN/SERASA' },
        { name: 'distribuicao_global', label: 'Distribuição de Cobrança Global?' },
        { name: 'mailing_carteira', label: 'Realiza mailing para distribuição de carteira entre analistas' },
        { name: 'campanha_ura', label: 'Realizar campanha de URA?' },
        { name: 'click2call', label: 'Realiza discagem Click2call' },
        { name: 'enriquecimento_base', label: 'Realiza enriquecimento de base' },
        { name: 'discador', label: 'Realiza campanha de discagem - Discador' },
        { name: 'whatsapp_api', label: 'Usa API Oficial Whatsapp e não tem configurado?' },
        { name: 'portal_financeiro', label: 'Portal Financeiro Integrado PontoCob' },
        { name: 'bot_atendimento', label: 'Bot Auto Atendimento - Default PontoCob' },
        { name: 'webhook', label: 'Necessita de Webhook' },
        { name: 'view_bi', label: 'Disponibilidade de View para integração com BI' }
    ];
    
    funcionalidadesAvancadas.forEach(func => {
        const input = document.querySelector(`input[name="${func.name}"]:checked`);
        if (input) {
            let opcaoTexto = '';
            if (func.name === 'titulos_aberto') {
                if (input.value === 'ate_2999') opcaoTexto = 'Até 2.999 títulos';
                else if (input.value === '3000_24999') opcaoTexto = '3.000 a 24.999 títulos';
                else if (input.value === 'acima_25000') opcaoTexto = 'Acima de 25.000 títulos';
            } else if (func.name === 'whatsapp_api') {
                if (input.value === 'sim') opcaoTexto = 'Sim';
                else if (input.value === 'sim_selo_azul') opcaoTexto = 'Sim com selo azul';
                else opcaoTexto = 'Não';
            } else {
                opcaoTexto = input.value === 'sim' ? 'Sim' : 'Não';
            }
            
            const value = parseInt(input.dataset.value);
        }
    });
    
    html += `
        <div class="relatorio-item total">
            <div><strong>Total Funcionalidades Avançadas</strong></div>
            <div></div>
            <div><strong>R$ ${totals.bloco3.toLocaleString('pt-BR')}</strong></div>
        </div>
    `;
    
    // Bloco 4: Treinamentos
    html += `<h3 style="margin: 20px 0 10px 0; color: #2563eb;">4. Treinamentos</h3>`;
    
    const usuariosAdm = document.querySelector('select[name="usuarios_adm"]').value;
    const usuariosOp = document.querySelector('select[name="usuarios_operacionais"]').value;
    const usuariosChatcob = document.querySelector('select[name="usuarios_chatcob"]').value;
    const portalFinanceiroTreinamento = document.querySelector('input[name="portal_financeiro_treinamento"]:checked');
    if (portalFinanceiroTreinamento) {
        const value = parseInt(portalFinanceiroTreinamento.dataset.value);
    }
    
    html += `
        <div class="relatorio-item total">
            <div><strong>Total Treinamentos</strong></div>
            <div></div>
            <div><strong>R$ ${totals.bloco4.toLocaleString('pt-BR')}</strong></div>
        </div>
    `;
    
    // Total Geral
    const totalGeral = totals.bloco1 + totals.bloco2 + totals.bloco3 + totals.bloco4;
    html += `
        <div style="margin-top: 30px; padding: 20px; background: linear-gradient(135deg, #0e0429, #072b23); color: white; border-radius: 12px; text-align: center;">
            <h2 style="margin: 0; font-size: 1.5rem;">TOTAL DO INVESTIMENTO - PROJETO DE IMPLANTAÇÃO</h2>
            <div style="font-size: 2.5rem; font-weight: 700; margin-top: 15px; color: #e7e7e7ff;">
                R$ ${totalGeral.toLocaleString('pt-BR')}
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
                <title>Relatório de Orçamento - Global Plus</title>
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
        // Resetar todos os radio buttons para "não"
        const radios = document.querySelectorAll('input[type="radio"]');
        radios.forEach(radio => {
            if (radio.value === 'nao' || radio.value === 'ate_2999') {
                radio.checked = true;
            } else {
                radio.checked = false;
            }
        });
        
        // Resetar selects para primeira opção
        const selects = document.querySelectorAll('select');
        selects.forEach(select => {
            select.selectedIndex = 0;
        });
        
        // Resetar processo integrado para "não"
        document.querySelector('input[name="processo_integrado"][value="nao"]').checked = true;
        toggleIntegracoes(false);
        
        // Recalcular todos os totais
        updateBlockTotal('bloco1');
        updateBlockTotal('bloco2');
        updateBlockTotal('bloco3');
        updateBlockTotal('bloco4');
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
    updateBlockTotal('bloco2');
    updateBlockTotal('bloco3');
    updateBlockTotal('bloco4');
    updateTotalGeral();
    
    // Configurar estado inicial das integrações
    toggleIntegracoes(false);
});

