import { Component, OnInit, ViewChild } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/shared/services/movie.service';
import { LoginService } from 'src/app/login/shared/services/login.service';
@Component({
    selector: 'app-movie-details',
    templateUrl: './movie-details.component.html',
    styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
    @ViewChild('form') form;
    movieDetails;
    avarageRating;
    filteredMoviesList = [];
    rate = 0;
    ratingControl = new FormControl('');
    movieParam = new FormControl('');
    movieId;
    commentForm: FormGroup;
    constructor(
        private movieService: MovieService,
        private route: ActivatedRoute,
        private snackbar: MatSnackBar,
        private fb: FormBuilder,
        private auth: LoginService
    ) {}

    ngOnInit(): void {
        const movieId = this.route.snapshot.params['id'];
        this.movieId = movieId;
        this.initForm();
        if (movieId) {
            this.getMovieDetailsById(movieId);
            this.getMovieAvarageRating(movieId);
            this.getMyMovieRating(movieId);
            this.getMovieComment(movieId);
        }
        this.ratingControl.valueChanges.subscribe((res) => {
            this.ratingChange(res);
        });
    }

    initForm() {
        this.commentForm = this.fb.group({
            movieId: [Number(this.movieId), Validators.required],
            comment: ['', Validators.required],
            userId: [this.auth.currentUserId.getValue(), Validators.required]
        });
    }

    getMovieDetailsById(movieId) {
        this.movieDetails = this.movieService.getMovieById(movieId);
    }

    getMovieAvarageRating(movieId) {
        this.avarageRating = this.movieService.getAvgMovieRating(movieId);
    }
    getMyMovieRating(movieId) {
        const rating = this.movieService.getMyRatingByMovie(movieId);
        if (rating) {
            this.ratingControl.setValue(rating);
        }
    }
    ratingChange(value) {
        const data = {
            userId: this.auth.currentUserId.getValue(),
            rating: value,
            movieId: this.movieDetails.id,
            id: null,
        };
        this.movieService.addRating(data);
        this.snackbar.open('Rating saved successfully', '', { duration: 900 });
        this.getMovieAvarageRating(this.movieId);
    }

    addComment() {
        if (this.commentForm.valid) {
            this.movieService.addComments(this.commentForm.value);
            this.snackbar.open('commend added successfully', '', {
                duration: 1000,
            });
            this.getMovieComment(this.movieId);
            this.form.resetForm();
            this.commentForm.get('comment').setValue('');
            this.commentForm.get('comment').updateValueAndValidity();
            this.initForm();
        }
    }
    getMovieComment(movieId) {
        this.movieDetails.commants = this.movieService.getCommentByMovie(
            Number(movieId)
        );
    }
}
