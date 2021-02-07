"use strict";var firebaseConfig={apiKey:"AIzaSyDYFDsGasHWWG9JVZMqavo8otHQIfri16c",authDomain:"team-project-js-filmoteka.firebaseapp.com",projectId:"team-project-js-filmoteka",storageBucket:"team-project-js-filmoteka.appspot.com",messagingSenderId:"378351083417",appId:"1:378351083417:web:43f8e90e12a94511ff3d08"};firebase.initializeApp(firebaseConfig);var posterUrl="https://image.tmdb.org/t/p",sizePoster="/w500",basicPosterUrl=posterUrl+sizePoster,BASE_URL="https://api.themoviedb.org/3/search/movie",API_KEY="d407875648143dbc537f3d16fab2b882",MEDIA_TYPE="movie",TIME_WINDOW="week",pageNumber=1,inputValue="",renderFilms=[],genres=[],currentPageNumber=document.getElementById("js-currentPageNumber"),list=document.querySelector(".galleryHome"),homeSection=document.querySelector("#home-section"),librarySection=document.querySelector("#library-section"),homeHeader=document.getElementById("homeHeader"),libaryHeader=document.getElementById("libraryHeader"),libraryLink=document.getElementById("libraryLink"),galleryHomeLink=document.getElementById("galleryHomeLink"),homeLink=document.getElementById("homeLink"),refs={searchForms:document.getElementById("js-search-form"),backBtn:document.getElementById("js-backBtn"),nextBtn:document.getElementById("js-nextBtn"),error:document.getElementById("js-error")},loggedIn=!1,userGrantedButtons=[document.querySelector(".button-queue"),document.querySelector(".button-watched")];function fetchGenres(){return fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=".concat(API_KEY,"&language=en-US")).then(function(e){return e.json()}).then(function(e){return genres=e.genres,e.genres})}function fetchPopularMoviesList(){var e="https://api.themoviedb.org/3/trending/".concat(MEDIA_TYPE,"/").concat(TIME_WINDOW,"?api_key=").concat(API_KEY,"&page=").concat(pageNumber);return fetch(e).then(function(e){return e.json()}).then(function(e){renderFilms=e.results,e.total_pages<=pageNumber?refs.nextBtn.classList.add("btnIsHidden"):refs.nextBtn.classList.remove("btnIsHidden"),list.innerHTML="";var t=document.createDocumentFragment();return renderFilms.map(function(e){t.appendChild(createCardFunc(e))}),list.appendChild(t),e}).then(function(e){}).catch(function(e){errorPlug(),refs.nextBtn.classList.add("btnIsHidden")})}function createCardFunc(e){var t=cardTemplate(e);return t.addEventListener("click",function(){activeDetailsPage(e)}),t}function cardTemplate(e){var t=e.poster_path,n=e.title,a=e.original_title,o=e.genre_ids,r=e.release_date,i=e.vote_average,s=document.createElement("li");s.classList.add("gallery__item");var c="../images/noPoster.jpg";t&&(c=basicPosterUrl+t);var l='<img class="gallery__item__picture"\n                    src=\''.concat(c,"'\n                    alt=").concat(n,'\n                    />\n                    <div class="gallery__item__picture__background">\n                <h2 class="gallery__item__title">').concat(n||a,'</h2>\n                \n                <p class="gallery__item__description">\n                \n                    ').concat(genreString(o),"\n                   ");return 4<=r.length&&(l+='<span class="gallery__item__description__decor">|</span>\n             <span class="gallery__item__description__year">'.concat(r.substring(0,4),"</span>\n            ")),l+='<span class="gallery__item__description__rating">\n            '.concat(i,"</span>\n            </p>  </div>"),s.insertAdjacentHTML("afterbegin",l),s}function genreString(a){if(0===a.length)return"Other";var e=a.slice(0,3).reduce(function(e,t,n){return 2===n&&3<a.length?e+"Other, ":e+(genres.find(function(e){return e.id===t}).name||"Other")+", "},"").slice(0,-2);if(30<e.length){var t=e.split(",");return t.splice(2,1,"Other"),t}return e}function errorPlug(){list.insertAdjacentHTML("afterbegin",'<div class="errorPlug">\n <p>Что-то пошло не так! Повторите запрос на сервер</p>\n <img src="../images/noPoster.jpg"alt="Ошибка">\n </div>')}function startFetch(){resetPage(),checkInput()}console.log(userGrantedButtons),firebase.auth().onAuthStateChanged(function(e){if(e){console.log(e);var t=10<e.email.length?e.email.slice(0,7)+"...":e.email;btnAuth.textContent=t,btnAuthLibrary.textContent=t,loggedIn=!0,userGrantedButtons.map(function(e){e.classList.remove("visually-hidden")})}else btnAuth.textContent="Sign in",btnAuthLibrary.textContent="Sign in",loggedIn=!1,userGrantedButtons.map(function(e){e.classList.add("visually-hidden")})}),fetchGenres(),onHomelink(),homeLink.addEventListener("click",onHomelink),galleryHomeLink.addEventListener("click",onHomelink);var formAuth=document.querySelector(".container__modalAuth__form"),inputEmail=document.querySelector(".container__modalAuth__form__email"),inputRassword=document.querySelector(".container__modalAuth__form__password"),btnAuth=document.querySelector(".btnAuth"),btnAuthLibrary=document.querySelector(".btnAuthLibrary"),btnIn=document.querySelector(".in"),btnRegister=document.querySelector(".register"),btnExit=document.querySelector(".exit"),modalAuth=document.getElementById("js_modalAuth"),overlayAuth=document.getElementById("overlay__modalAuth"),authError=document.querySelector(".auth__text");function signUpWithEmailPasswoerd(){var e=inputEmail.value,t=inputRassword.value;firebase.auth().createUserWithEmailAndPassword(e,t).then(function(e){authError.classList.add("visually-hidden");var t=e.user;console.log(t)}).catch(function(e){e.code;var t=e.message;authError.textContent=t,authError.classList.remove("visually-hidden")})}function signInWithEmailPassword(){var n=inputEmail.value,e=inputRassword.value;firebase.auth().signInWithEmailAndPassword(n,e).then(function(e){e.user;authError.classList.add("visually-hidden"),console.log(n,"email есть в базе"),authError.textContent="registration completed successfully",authError.classList.remove("visually-hidden"),loggedIn=!0,onCloseModalAuth()}).catch(function(e){e.code;var t=e.message;authError.textContent=t,authError.classList.remove("visually-hidden"),console.log(n,"email нету в базе ,нужно зарегаться")})}function signOut(){firebase.auth().signOut().then(function(){loggedIn=!1,onCloseModalAuth()}).catch(function(e){authError.classList.remove("visually-hidden")})}function onCloseModalAuth(){window.removeEventListener("keydown",onPressEscapeAuth),modalAuth.classList.remove("is-open"),modalCard.innerHTML="",authError.textContent="",authError.classList.add("visually-hidden"),startFetch(),renderAuthCheckLibrary()}function onBackDropClickAuth(e){e.target===e.currentTarget&&onCloseModalAuth()}function onPressEscapeAuth(e){"Escape"===e.code&&onCloseModalAuth()}function onOpenModalAuth(){modalAuth.classList.add("is-open"),window.addEventListener("keydown",onPressEscapeAuth),overlayAuth.addEventListener("click",onBackDropClickAuth)}function onHomelink(){homeHeader.classList.remove("visually-hidden"),homeSection.classList.remove("visually-hidden"),librarySection.classList.add("visually-hidden"),libaryHeader.classList.add("visually-hidden"),libraryLink.classList.remove("current"),homeLink.classList.add("current"),startFetch()}function errorContent(){refs.error.textContent="Search result not successful. Enter the correct movie name and try again."}function fetchFilms(){var e="".concat(BASE_URL,"?api_key=").concat(API_KEY,"&query=").concat(inputValue,"&page=").concat(pageNumber);fetch(e).then(function(e){return e.json()}).then(function(e){renderFilms=e.results,e.total_pages<=pageNumber?refs.nextBtn.classList.add("btnIsHidden"):refs.nextBtn.classList.remove("btnIsHidden"),console.log(e.total_pages),console.log(renderFilms),list.innerHTML="",0===renderFilms.length&&errorContent();var t=document.createDocumentFragment();renderFilms.map(function(e){t.appendChild(createCardFunc(e))}),list.appendChild(t)}).catch(function(e){console.log(e),errorContent()})}function checkInput(){""===inputValue?fetchPopularMoviesList():fetchFilms()}function searchFilms(e){e.preventDefault(),refs.error.textContent="",inputValue=e.currentTarget.search.value,resetPage(),checkInput()}function plaginationNavigation(e){"js-backBtn"===e.target.id?pageNumber-=1:pageNumber+=1,currentPageNumber.textContent=pageNumber,checkInput(),scroll(),1===pageNumber||pageNumber<1?refs.backBtn.classList.add("btnIsHidden"):refs.backBtn.classList.remove("btnIsHidden")}function resetPage(){pageNumber=1,currentPageNumber.textContent=pageNumber,refs.backBtn.classList.add("btnIsHidden")}function scroll(){window.scrollTo({top:0,behavior:"smooth"})}btnAuth.addEventListener("click",onOpenModalAuth),btnAuthLibrary.addEventListener("click",onOpenModalAuth),btnIn.addEventListener("click",function(e){e.preventDefault(),authError.textContent="",signInWithEmailPassword()}),btnRegister.addEventListener("click",function(e){e.preventDefault(),authError.textContent="",signUpWithEmailPasswoerd()}),btnExit.addEventListener("click",function(e){e.preventDefault(),authError.textContent="",signOut()}),refs.error.textContent="",refs.searchForms.addEventListener("submit",searchFilms),refs.backBtn.addEventListener("click",plaginationNavigation),refs.nextBtn.addEventListener("click",plaginationNavigation),$(window).on("load",function(){$(".loader-container").fadeOut("slow")}),1===pageNumber&&refs.backBtn.classList.add("btnIsHidden"),console.log("Hello from 3navigation");var modalCard=document.querySelector(".modalCard"),backDropRef=document.querySelector(".js-modal"),overlayRef=document.querySelector(".overlay");function activeDetailsPage(e){backDropRef.classList.add("is-open"),showDetails(e),window.addEventListener("keydown",onPressEscape),overlayRef.addEventListener("click",onBackDropClick),initModalDialogButton(moviesWatchedKeyName,"btnModal-watched-js",e),initModalDialogButton(moviesQueuedKeyName,"btnModal-queue-js",e)}function showDetails(e){var t=e.poster_path,n=e.title,a=e.vote_average,o=e.vote_count,r=e.popularity,i=e.original_title,s=e.genre_ids,c=e.overview,l=e.id,d='<img class="modalImg"\n                    src=\''.concat(basicPosterUrl).concat(t,"'\n                    alt=").concat(n,'\n                    />\n                    <div class="description">\n        <h2 class="modal_title">').concat(n,'</h2>\n        <table>\n<tr>\n  <td class="definition">Vote/Votes</td>\n  <td class="definition info"><span class="rating-modal">').concat(a,"</span> / ").concat(o,'</td>\n  </tr>\n<tr>\n  <td class="definition">Popularity</td>\n  <td class="definition info">').concat(r,'</td>\n</tr>\n<tr>\n  <td class="definition">Original Title</td>\n  <td class="definition info originalTitle">').concat(i,'</td>\n</tr>\n<tr>\n  <td class="definition">Genre</td>\n  <td class="definition info">').concat(genreStringModal(s),'</td>\n</tr>\n</table>\n<h2 class="about">ABOUT</h2>\n<p class="overview">').concat(c,'</p>\n<button id="btnModal-watched-js"\n        data-id=').concat(l,'\n        class="btn-modal">\n  ').concat(getButtonTitle(moviesWatchedKeyName,l),'\n</button>\n\n<button id="btnModal-queue-js"\n        class="btn-modal"\n        data-id=').concat(l,">\n  ").concat(getButtonTitle(moviesQueuedKeyName,l),"\n</button>\n\n</>");modalCard.insertAdjacentHTML("afterbegin",d)}function onCloseModal(){window.removeEventListener("keydown",onPressEscape),backDropRef.classList.remove("is-open"),modalCard.innerHTML=""}function onBackDropClick(e){e.target===e.currentTarget&&onCloseModal()}function onPressEscape(e){"Escape"===e.code&&onCloseModal()}function genreStringModal(e){return 0===e.length?"Other":e.reduce(function(e,t){return e+(genres.find(function(e){return e.id===t}).name||"Other")+", "},"").slice(0,-2)}var _buttonTitles,teamModal=document.querySelector(".js-teamModal"),teamOverlay=document.querySelector(".teamOverlay"),teamBtn=document.querySelector(".button_footer"),team=document.querySelector(".team-container");function onOpenModalTeam(){teamModal.classList.add("is-open"),window.addEventListener("keydown",onPressEscapeTeam),teamOverlay.addEventListener("click",onBackDropClickTeam),console.log(teamOverlay)}function onCloseModalTeam(){window.removeEventListener("keydown",onPressEscapeTeam),teamModal.classList.remove("is-open")}function onBackDropClickTeam(e){e.target===e.currentTarget&&onCloseModalTeam()}function onPressEscapeTeam(e){"Escape"===e.code&&onCloseModalTeam()}function _defineProperty(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}teamBtn.addEventListener("click",onOpenModalTeam),console.log("Hello from 4filmDetailsPage");var moviesWatchedKeyName="filmsWatched",moviesQueuedKeyName="filmsQueue",selectedClassName="selected",btnWatchedRef=document.querySelector(".button-watched"),btnQueueRef=document.querySelector(".button-queue"),buttonTitles=(_defineProperty(_buttonTitles={},moviesWatchedKeyName,{add:"ADD TO WATCHED",delete:"DELETE FROM WATCHED"}),_defineProperty(_buttonTitles,moviesQueuedKeyName,{add:"ADD TO QUEUE",delete:"DELETE FROM QUEUE"}),_buttonTitles),selectedMovieListKey=moviesWatchedKeyName;function initModalDialogButton(a,e,o){var t=document.getElementById(e);loggedIn?(isMovieAddedToList(a,o.id)||t.classList.add(selectedClassName),t.addEventListener("click",function(e){var t=e.currentTarget,n=t.dataset.id;toggleMovieExistenceInList(a,o),t.innerHTML=getButtonTitle(a,n),t.classList.toggle(selectedClassName),rerenderPageWithMovies(selectedMovieListKey)})):t.classList.add("visually-hidden")}function getButtonTitle(e,t){return isMovieAddedToList(e,t)?buttonTitles[e].delete:buttonTitles[e].add}function toggleMovieExistenceInList(e,t){var n=t.id,a=getMoviesList(e)||{};isMovieAddedToList(e,n)?delete a[n]:a[n]=t,localStorage.setItem(e,JSON.stringify(a))}function isMovieAddedToList(e,t){return void 0!==(getMoviesList(e)||{})[t]}function getMoviesList(e){return JSON.parse(localStorage.getItem(e))}function initHeaderButton(e,t){document.querySelector(e).addEventListener("click",function(){rerenderPageWithMovies(selectedMovieListKey=t)})}function rerenderPageWithMovies(t){var e=document.querySelector(".galleryLibrary"),n=getMoviesList(t),a=Object.values(n).filter(function(e){return isMovieAddedToList(t,e.id)});if(0!==a.length){var o=document.createDocumentFragment();a.map(function(e){o.appendChild(createCardFunc(e))}),e.innerHTML="",e.appendChild(o)}else e.innerHTML='\n    <div class="empty-container">\n      <div class="empty-state">\n        You do not have to '.concat(t===moviesWatchedKeyName?"watched":"queue",' movies to watch\n        </div>\n        <div class="empty-img"><img src="../images/noPoster.jpg"alt="Ошибка"></div></div>')}function onLibraryPageLoad(){rerenderPageWithMovies(selectedMovieListKey)}initHeaderButton(".button-queue",moviesQueuedKeyName),initHeaderButton(".button-watched",moviesWatchedKeyName),console.log("Hello page5");var listLibrary=document.querySelector(".galleryLibrary");function renderAuthCheckLibrary(){loggedIn?onLibraryPageLoad():(console.log("qqqqq"),listLibrary.innerHTML='\n      <div class="empty-state">\n        Please login to use the library\n      </div>')}libraryLink.addEventListener("click",function(e){console.log(e.target),homeHeader.classList.add("visually-hidden"),homeSection.classList.add("visually-hidden"),libaryHeader.classList.remove("visually-hidden"),librarySection.classList.remove("visually-hidden"),renderAuthCheckLibrary(),libraryLink.classList.add("current"),homeLink.classList.remove("current"),btnWatchedRef.classList.add(selectedClassName)}),btnQueueRef.addEventListener("click",function(){btnQueueRef.classList.add(selectedClassName),btnWatchedRef.classList.remove(selectedClassName)}),btnWatchedRef.addEventListener("click",function(){btnWatchedRef.classList.add(selectedClassName),btnQueueRef.classList.remove(selectedClassName)});