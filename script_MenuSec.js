document.addEventListener('DOMContentLoaded', function() {
    const overlay = document.getElementById('gameMenuOverlay');
    const resumeButton = document.getElementById('resumeButton');
    const resumeButton2 = document.getElementById('resumeButton2');
    const mainMenuButton = document.getElementById('mainMenuButton');

    function closeOverlay() {
        overlay.style.display = 'none';
    }

    function openOverlay() {
        overlay.style.display = 'flex';
        resumeButton.focus();
    }

    resumeButton.addEventListener('click', closeOverlay);

    resumeButton2.addEventListener('click', function() {
        closeOverlay();
    });

    mainMenuButton.addEventListener('click', function() {
        closeOverlay();
    });

    const focusableElements = overlay.querySelectorAll('button');
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    overlay.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
});