document.addEventListener('DOMContentLoaded', function() {
    const startGameBtn= document.getElementById('startGameBtn');

    startGameBtn.addEventListener('click', function(event) {
        event.preventDefault();
        loadGamePage();
    });

    function loadGamePage(){
        fetch('game.html')
        .then(Response => Response.text())
        .then(html => {
            document.body.innerHTML =html;
            history.pushState(null,'','game.html');

        })
        .catch(error => console.error('Error cargando la pagina:', error))
    }
});
