document.addEventListener('DOMContentLoaded', () => {

    const botoesEscola = document.querySelectorAll('.escola-botao');

    botoesEscola.forEach(botao => {
        botao.addEventListener('click', (event) => {
        
            event.preventDefault(); 
            
            const nomeEscola = event.target.textContent;
            
            alert(`Você clicou na ${nomeEscola}. \n(Esta ação pode ser personalizada)`);
        });
    });
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); 
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

});