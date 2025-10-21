// Aguarda o documento HTML ser completamente carregado para executar o script
document.addEventListener('DOMContentLoaded', function() {

    // --- PARTE DO MENU MOBILE TOGGLE ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');

    // Verifica se o botão de toggle existe antes de adicionar o listener
    if (menuToggle && navMenu) { // Adicionado verificação para navMenu também
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        // Fechar menu ao clicar em um link (se o menu existe)
        const navLinks = document.querySelectorAll('nav ul li a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                // Só remove a classe 'active' se o menu estiver ativo (visível)
                if (navMenu.classList.contains('active')) {
                     navMenu.classList.remove('active');
                }
            });
        });
    } // Fim do if (menuToggle && navMenu)

    // --- PARTE DA VALIDAÇÃO DO FORMULÁRIO ---
    const form = document.querySelector('#form-contato');

    // Verifica se o formulário existe antes de adicionar o listener
    if (form) {
        form.addEventListener('submit', function(event) {
            // Previne o comportamento padrão do formulário
            event.preventDefault();

            // Seleciona os campos dentro do listener de submit
            const nomeInput = document.querySelector('#nome');
            const emailInput = document.querySelector('#email');
            const mensagemInput = document.querySelector('#mensagem');

            // VALIDAÇÃO: Nome
            if (nomeInput.value.trim() === '') {
                alert('Por favor, preencha o seu nome.');
                return;
            }

            // VALIDAÇÃO: E-mail
            if (emailInput.value.trim() === '') {
                alert('Por favor, preencha o seu e-mail.');
                return;
            }
             // Adicionar validação de formato de e-mail (opcional, mas bom)
             const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
             if (!emailPattern.test(emailInput.value.trim())) {
                 alert('Por favor, insira um formato de e-mail válido.');
                 return;
             }


            // VALIDAÇÃO: Mensagem
            if (mensagemInput.value.trim() === '') {
                alert('Por favor, digite sua mensagem.');
                return;
            }

            // Mensagem de Sucesso
            alert('Mensagem enviada com sucesso!');

            // Limpa o formulário
            form.reset();
        });
    } // Fim do if (form)

}); // Fim do DOMContentLoaded principal
