document.addEventListener('DOMContentLoaded', () => {

  console.log('Página de Recursos Educacionais carregada.');

  const downloadLinks = document.querySelectorAll('.download-link');

  downloadLinks.forEach(link => {
    
    link.addEventListener('click', (event) => {
      const fileName = event.target.getAttribute('href');
      
      console.log(`Usuário iniciou o download de: ${fileName}`);
    });

  });

});