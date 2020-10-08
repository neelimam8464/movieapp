import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService, Movies } from '../../../shared/services/movie.service';
import { FormControl } from '@angular/forms';
@Component({
    selector: 'app-movies-list',
    templateUrl: './movies-list.component.html',
    styleUrls: ['./movies-list.component.scss'],
})
export class MoviesListComponent implements OnInit {
    movieList;
    filteredMovies;
    rating = 0;
    movieParam = new FormControl('');
    title = '';
    constructor(private movieService: MovieService, private router: Router) {}

    ngOnInit(): void {
        this.getMoviesList();
        this.movieParam.valueChanges.subscribe((res) => {
            this.title = res;
            this.filterMovies();
        });
    }

    getMoviesList() {
        this.movieList = this.movieService.getMoviesWithRating();
        this.filteredMovies = this.movieList;
    }
    filterMovies() {
        if (this.title) {
            this.filteredMovies = this.movieList.filter((x) =>
                x.title.includes(this.title)
            );
        } else {
            this.filteredMovies = this.movieList;
        }
        if (this.rating) {
            this.filteredMovies = this.filteredMovies.filter(
                (x) => x.rating === this.rating
            );
        }
    }
    resetFilter() {
        this.title = '';
        this.rating = 0;
        this.filterMovies();
    }
}
