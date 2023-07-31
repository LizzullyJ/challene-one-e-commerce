function scrollToConsolas() {
    const consolasSection = document.getElementById('consolas');
    consolasSection.classList.add('animate__animated', 'animate__fadeIn'); 
    consolasSection.scrollIntoView({ behavior: 'smooth' });
}