import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MovieService } from 'src/app/shared/services/movie.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-movies',
  templateUrl: './add-movies.component.html',
  styleUrls: ['./add-movies.component.scss']
})
export class AddMoviesComponent implements OnInit {
  movieForm: FormGroup;
  count = 5;
  @Output() updates = new EventEmitter();
  constructor(private fb: FormBuilder, private movie: MovieService, private snack: MatSnackBar,
              private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
    this.getMovieDetails();
  }
  initForm() {
    this.movieForm = this.fb.group({
      id: [null],
      title: ['', Validators.required],
      description:  ['', Validators.required]
    });
  }
  addMovie() {
    const movie = this.movieForm.value;
    const check = this.movie.addMovie(movie);
    if (check > 0) {
      this.snack.open('movie added successfully', '', {duration: 1000});
      this.movieForm.reset();
      this.movieForm.markAsPristine();
      this.router.navigate(['../admin'], {relativeTo: this.route.parent});
    } else {
      this.snack.open('something went wrong.try again', '', {duration: 1000});
    }
  }
  getMovieDetails() {
    const movieId = this.route.snapshot.params.id;
    if (movieId) {
      const movie = this.movie.getMovieById(movieId);
      if (movie) {
        this.movieForm.patchValue(movie);
      }
    }
  }
}
