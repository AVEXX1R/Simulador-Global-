// Função para acessar um simulador específico
function acessarSimulador(pasta) {
    // Mostrar overlay de loading
    mostrarLoading();
    
    // Simular um pequeno delay para melhor UX
    setTimeout(() => {
        // Redirecionar para a pasta do simulador
        window.location.href = `./${pasta}/`;
    }, 800);
}

// Função para mostrar o overlay de loading
function mostrarLoading() {
    const overlay = document.getElementById('loadingOverlay');
    overlay.style.display = 'flex';
}

// Função para esconder o overlay de loading
function esconderLoading() {
    const overlay = document.getElementById('loadingOverlay');
    overlay.style.display = 'none';
}

// Adicionar efeitos de hover nos cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.simulator-card');
    
    cards.forEach(card => {
        // Efeito de parallax suave no hover
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Efeito de clique no card inteiro
        card.addEventListener('click', function(e) {
            // Verificar se o clique não foi no botão
            if (!e.target.closest('.btn')) {
                const simulatorType = this.dataset.simulator;
                const pasta = simulatorType === 'total' ? 'app-total' : 'app-mensal';
                acessarSimulador(pasta);
            }
        });
    });
    
    // Adicionar efeito de ripple nos botões
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Criar efeito ripple
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            // Remover o ripple após a animação
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Adicionar animação de entrada suave
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observar elementos para animação
    const animatedElements = document.querySelectorAll('.simulator-card, .info-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Adicionar CSS para o efeito ripple
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .simulator-card {
        cursor: pointer;
    }
    
    .simulator-card:active {
        transform: translateY(-3px) scale(0.98) !important;
    }
`;
document.head.appendChild(style);

// Função para detectar se está sendo acessado via GitHub Pages
function detectarAmbiente() {
    const hostname = window.location.hostname;
    const isGitHubPages = hostname.includes('github.io') || hostname.includes('githubusercontent.com');
    
    if (isGitHubPages) {
        console.log('Executando no GitHub Pages');
        // Ajustar caminhos se necessário para GitHub Pages
        return 'github';
    } else {
        console.log('Executando localmente');
        return 'local';
    }
}

// Verificar ambiente na inicialização
document.addEventListener('DOMContentLoaded', function() {
    const ambiente = detectarAmbiente();
    
    // Adicionar informações de debug no console
    console.log('Menu dos Simuladores Global Plus carregado');
    console.log('Ambiente:', ambiente);
    console.log('URL atual:', window.location.href);
});

// Função para lidar com erros de navegação
window.addEventListener('error', function(e) {
    console.error('Erro detectado:', e.error);
    esconderLoading();
});

// Função para voltar ao menu (útil se chamada de outros simuladores)
function voltarAoMenu() {
    window.location.href = '../';
}

// Exportar funções para uso global
window.acessarSimulador = acessarSimulador;
window.voltarAoMenu = voltarAoMenu;

