$.ajax({
    url: "http://www.omdbapi.com/?apikey=32213539&s=my hero academia",
    success: results => {
        const movies = results.Search;
        let cards ='';
        movies.forEach(m => {
            cards += showCard(m);
        });
        $('.movie-container').html(cards);
        // console.log(movies);

        $('.modal-detail-button').on('click', function(){
            $.ajax({
                url : "http://www.omdbapi.com/?apikey=32213539&i=" + $(this).data('imdbid'),
                success : m => {
                    const movieDetail = showModal(m);
                    $('.modal-content').html(movieDetail);
                },
                error : (e) => {
                    console.log(e.responseText); 
                }
            });
        });
    },
    error: e =>{
        console.log(e.responseText);
    }
});

$('.search-button').on('click', function(){
    $.ajax({
        url: "http://www.omdbapi.com/?apikey=32213539&s=" + $('.form-control').val(),
        success: results => {
            const movies = results.Search;
            let cards ='';
            if(movies !== undefined){
                movies.forEach(m => {
                    cards += showCard(m);
                });
            
                $('.movie-container').html(cards);
            // console.log(movies);
    
            $('.modal-detail-button').on('click', function(){
                $.ajax({
                    url : "http://www.omdbapi.com/?apikey=32213539&i=" + $(this).data('imdbid'),
                    success : m => {
                        const movieDetail = showModal(m);
                        $('.modal-content').html(movieDetail);
                    },
                    error : (e) => {
                        console.log(e.responseText);
                    }
                });
            });
        } else {
            alert('Movies not found');
        } 
        },
        error: e =>{
            console.log(e.responseText);
        }
    });
});

const showCard = m => `<div class="col-md-4 my-3">
                        <div class="card">
                            <img src="${m.Poster}" class="card-img-top">
                            <div class="card-body bg-warning">
                                <h5 class="card-title">${m.Title}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                                <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#movieDetailModal" data-imdbid="${m.imdbID}">Show Details</a>
                            </div>
                        </div>
                        </div>`;

const showModal = m => `<div class="modal-header bg-warning">
                        <h2 class="modal-title" id="movieDetailModalLabel">${m.Title} (${m.Year})</h2>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-md-3">
                                    <img src="${m.Poster}" class="movie-img img-fluid">
                                </div>
                                <div class="col-md">
                                    <ul class="list-group">
                                        <li class="list-group-item"><strong>Genre :</strong> ${m.Genre}</li>
                                        <li class="list-group-item"><strong>Director :</strong> ${m.Director}</li>
                                        <li class="list-group-item"><strong>Writer : </strong> ${m.Writer}</li>
                                        <li class="list-group-item"><strong>Actors : </strong> ${m.Actors}</li>
                                        <li class="list-group-item"><strong>Plot : </strong> ${m.Plot}</li>
                                        <li class="list-group-item"><strong>Language : </strong> ${m.Language}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        </div>
                        <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>`;