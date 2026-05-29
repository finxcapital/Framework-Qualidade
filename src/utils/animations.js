export function typeText(element, text, speed = 25) {
  return new Promise((resolve) => {
    element.innerHTML = '<span class="step-question-typing"></span>';
    const cursor = element.querySelector('.step-question-typing');
    let i = 0;
    
    function typeWriter() {
      if (i < text.length) {
        // Insere o caractere antes do cursor piscante
        const textNode = document.createTextNode(text.charAt(i));
        element.insertBefore(textNode, cursor);
        i++;
        setTimeout(typeWriter, speed);
      } else {
        // Remove a classe de animação de digitação quando terminar
        setTimeout(() => {
          cursor.classList.remove('step-question-typing');
          resolve();
        }, 300);
      }
    }
    
    typeWriter();
  });
}
