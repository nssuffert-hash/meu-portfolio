// Aguarda o documento HTML ser completamente carregado para executar o script
document.addEventListener('DOMContentLoaded', function() {
    // Menu mobile toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });

    // Seleciona o formulário pelo seu ID
    const form = document.querySelector('#form-contato');

    // Adiciona um "ouvinte de evento" que será acionado quando o formulário for submetido
    form.addEventListener('submit', function(event) {
        // Previne o comportamento padrão do formulário, que é recarregar a página
        event.preventDefault();

        // Seleciona os campos de input e textarea
        const nomeInput = document.querySelector('#nome');
        const emailInput = document.querySelector('#email');
        const mensagemInput = document.querySelector('#mensagem');

        // VALIDAÇÃO: Verifica se o campo nome está vazio
        if (nomeInput.value.trim() === '') {
            alert('Por favor, preencha o seu nome.');
            return; // Para a execução se o campo estiver vazio
        }

        // VALIDAÇÃO: Verifica se o campo e-mail está vazio
        if (emailInput.value.trim() === '') {
            alert('Por favor, preencha o seu e-mail.');
            return;
        }
        
        // VALIDAÇÃO: Verifica se o campo mensagem está vazio
        if (mensagemInput.value.trim() === '') {
            alert('Por favor, digite sua mensagem.');
            return;
        }

        // Se todas as validações passarem, exibe a mensagem de sucesso
        alert('Mensagem enviada com sucesso!');

        // Simulação do envio: limpa os campos do formulário
        form.reset();
    });
});
