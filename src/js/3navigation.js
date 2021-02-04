console.log('Hello from 3navigation');
const modalCard = document.querySelector('.modalCard');
const backDropRef = document.querySelector('.js-modal');
const overlayRef = document.querySelector('.overlay');
const team = document.querySelector('.button_footer');
const heroes = document.querySelector('.heroes');
// const teamBackDropRef = document.querySelector('.js-teamModal');
// const teamOverlayRef = document.querySelector('.teamOverlay');

function activeDetailsPage(movie) {
  backDropRef.classList.add('is-open');
  showDetails(movie);
  window.addEventListener('keydown', onPressEscape);
  overlayRef.addEventListener('click', onBackDropClick);
}

function showDetails({
  poster_path: imgPath,
  title: filmTitle,
  vote_average: voteAverage,
  vote_count: voteCount,
  popularity: popularity,
  original_title: originalTitle,
  genre_ids: genre,
  overview: description,
}) {
  const modalCardinfo = `<img class="modalImg"
                    src='${basicPosterUrl}${imgPath}'
                    alt=${filmTitle}
                    />
                    <div class="description">
        <h2 class="modal_title">${filmTitle}</h2>
        <table>
<tr>
  <td class="definition">Vote/Votes</td>
  <td class="definition info"><span class="rating-modal">${voteAverage}</span> / ${voteCount}</td>
  </tr>
<tr>
  <td class="definition">Popularity</td>
  <td class="definition info">${popularity}</td>
</tr>
<tr>
  <td class="definition">Original Title</td>
  <td class="definition info originalTitle">${originalTitle}</td>
</tr>
<tr>
  <td class="definition">Genre</td>
  <td class="definition info">${genreStringModal(genre)}</td>
</tr>
</table>
<h2 class="about">ABOUT</h2>
<p class="overview">${description}</p>
<button id="btnModal-watched-js" class="btn-modal">
      ADD TO WATCHED
    </button>
    <button id="btnModal-queue-js" class="btn-modal">ADD TO QUEUE</button></div>`;

  modalCard.insertAdjacentHTML('afterbegin', modalCardinfo);

  const watchedModalBtnRef = document.getElementById('btnModal-watched-js');
  watchedModalBtnRef.addEventListener('click', e => {
    console.log('Привет это просмотренные');
  });

  const queueModalBtnRef = document.getElementById('btnModal-queue-js');
  queueModalBtnRef.addEventListener('click', e => {
    console.log('Привет это в очереди');
  });
}

function onCloseModal() {
  window.removeEventListener('keydown', onPressEscape);
  backDropRef.classList.remove('is-open');
  modalCard.innerHTML = '';
}

function onBackDropClick(event) {
  if (event.target === event.currentTarget) {
    onCloseModal();
  }
}

function onPressEscape(event) {
  if (event.code === 'Escape') {
    onCloseModal();
  }
}

function genreStringModal(genre) {
  if (genre.length === 0) {
    return 'Other';
  }
  return genre
    .reduce((acc, el) => {
      return (
        acc +
        (genres.find(elem => {
          return elem.id === el;
        }).name || 'Other') +
        ', '
      );
    }, '')
    .slice(0, -2);
}
///////////////////
team.addEventListener('click', teamCard);

function teamCard() {
  backDropRef.classList.add('is-open');
  window.addEventListener('keydown', onPressEscape);
  overlayRef.addEventListener('click', onBackDropClick);
}

////////////////////////
