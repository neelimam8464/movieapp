import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/shared/services/movie.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list-movies',
  templateUrl: './list-movies.component.html',
  styleUrls: ['./list-movies.component.scss']
})
export class ListMoviesComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  displayedColumns = ['no', 'title', 'desc', 'action'];
  constructor(private movie: MovieService) { }

  ngOnInit(): void {
    this.getMovies();
  }
  getMovies() {
    this.dataSource = new MatTableDataSource(this.movie.getMovies());
  }
  deleteMovieById(movieId) {
    this.movie.deleteMovie(movieId);
    this.getMovies();
  }
}
