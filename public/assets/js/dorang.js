/*!
=========================================================
* Dorang Landing page
=========================================================

* Copyright: 2019 DevCRUD (https://devcrud.com)
* Licensed: (https://devcrud.com/licenses)
* Coded by www.devcrud.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

 // toggle 
$(document).ready(function(){
    
    $('.search-toggle').click(function(){
        $('.search-wrapper').toggleClass('show');
    });

    $('.modal-toggle').click(function(){
        $('.modalBox').toggleClass('show');
    })

    $('.modalBox').click(function(){
        $(this).removeClass('show');
    });

    $('.spinner').click(function(){
        $(".theme-selector").toggleClass('show');
    });
    $('.light').click(function(){
        $('body').addClass('light-theme');
        $('body').removeClass('dark-theme');
    });
    $('.dark').click(function(){
        $('body').toggleClass('dark-theme');
        $('body').removeClass('light-theme');
    });
});



// smooth scroll
$(document).ready(function(){
    $(".navbar .nav-link").on('click', function(event) {

        if (this.hash !== "") {

            event.preventDefault();

            var hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 700, function(){
                window.location.hash = hash;
            });
        } 
    });
}); 

  document.addEventListener('DOMContentLoaded', function() {
    const gameBoxes = document.querySelectorAll('.game-box');
    const now = new Date();
  
    let nextGameIndex = -1;
    gameBoxes.forEach((box, index) => {
        const dateText = box.querySelector('strong').nextSibling.textContent.trim();
        const gameDate = new Date(dateText);
        const day = gameDate.getDate();
        const month = gameDate.toLocaleString('default', { month: 'short' });

        // Update the date display
        const gameDateDiv = box.querySelector('.game-date');
        gameDateDiv.querySelector('.day').textContent = day;
        gameDateDiv.querySelector('.month').textContent = month;

        // Update the result display
        const resultText = box.querySelector('.result').textContent.trim();
        const [homeScore, awayScore] = resultText.split(':').map(Number);
        const homeTeam = box.querySelector('.home-team').textContent.trim();
        const awayTeam = box.querySelector('.away-team').textContent.trim();

        if (homeTeam === 'EPIC SC Attack White 2014B') {
            if (homeScore > awayScore) {
                box.querySelector('.result').classList.add('win');
                box.querySelector('.result').textContent += ' W';
            } else {
                box.querySelector('.result').classList.add('loss');
                box.querySelector('.result').textContent += ' L';
            }
        } else if (awayTeam === 'EPIC SC Attack White 2014B') {
            if (awayScore > homeScore) {
                box.querySelector('.result').classList.add('win');
                box.querySelector('.result').textContent += ' W';
            } else {
                box.querySelector('.result').classList.add('loss');
                box.querySelector('.result').textContent += ' L';
            }
        }

        if (gameDate > now && nextGameIndex === -1) {
            nextGameIndex = index;
        }
    });
  
    if (nextGameIndex !== -1) {
        gameBoxes[nextGameIndex].classList.add('highlight');
        gameBoxes[nextGameIndex].scrollIntoView({ behavior: 'smooth', inline: 'center' });
    }
});