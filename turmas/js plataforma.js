function togglePDF(id) {
  const pdf = document.getElementById(id);
  pdf.style.display = pdf.style.display === 'none' || pdf.style.display === ''
    ? 'block'
    : 'none';
}