import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { LoginService } from 'src/app/login/shared/services/login.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private user: LoginService) { }

  movieList: Movies[] = [{
    id: 1,
    title: 'Into the woods',
    description: 'story of old guys who goes to the woods'
  },
  {
    id: 2,
    title: 'Rush hour',
    description: 'Jackie chan with FBI'
  },
  {
    id: 3,
    title: 'In to the wild',
    description: 'this is one of the best '
  },
  {
    id: 4,
    title: 'A walk to remember',
    description: 'one of the romantic one'
  },
  {
    id: 5,
    title: '21 jump street 2',
    description: 'Undercover as college students'
  }];
  ratings: Ratings[] = [
    {
      id: 1,
      movieId: 1,
      rating: 4,
      userId: 3
    },
    {
      id: 1,
      movieId: 1,
      rating: 4,
      userId: 2
    },
    {
      id: 1,
      movieId: 2,
      rating: 4,
      userId: 3
    },
    {
      id: 1,
      movieId: 2,
      rating: 4,
      userId: 4
    },
    {
      id: 1,
      movieId: 3,
      rating: 2,
      userId: 3
    },
    {
      id: 1,
      movieId: 4,
      rating: 4,
      userId: 2
    }
  ];
  comments: Comments[] = [
    {
      comment: 'this one is best',
      id: 1,
      movieId: 1,
      userId: 2,
      username: null
    },
    {
      comment: 'this one is goood',
      id: 2,
      movieId: 1,
      userId: 3,
      username: null
    },
    {
      comment: 'one of best',
      id: 3,
      movieId: 1,
      userId: 2,
      username: null
    },
    {
      comment: 'pretty bad',
      id: 4,
      movieId: 2,
      userId: 2,
      username: null
    }
  ];


  addMovie(movie: Movies) {
    if (movie) {
      if (movie.id) {
        const index = this.movieList.findIndex(x => x.id === movie.id);
        this.movieList[index] = movie;
        return movie.id;
      } else {
        if (this.movieList) {
          movie.id = this.movieList.length + 1;
          this.movieList.push(movie);
        } else {
          movie.id = 1;
          this.movieList = [movie];
        }
        return movie.id;
      }
    }
    return 0;
  }
  getMovies() {
    return this.movieList;
  }
  getMoviesWithRating() {
    if (this.movieList) {
      const movies = this.movieList as any;
      for (const item of movies) {
        item.rating = this.getAvgMovieRating(item.id);
      }
      return movies;
    }
    return [];
  }
  getMovieById(movieId) {
    if (movieId && this.movieList) {
      const movie = this.movieList.find(x => x.id === Number(movieId));
      return movie;
    }
    return {};
  }
  deleteMovie(movieId) {
    if (this.movieList) {
      const index = this.movieList.findIndex(x => x.id === movieId);
      if (index > -1) {
        this.movieList.splice(index, 1);
      }
    }
  }
  addRating(rating: Ratings) {
    if (rating && this.ratings) {
      const ratingIndex = this.ratings.findIndex(x => x.movieId === rating.movieId && x.userId === rating.userId);
      if (ratingIndex > -1) {
        this.ratings[ratingIndex].rating = rating.rating;
      } else {
        this.ratings.push(rating);
      }
    } else {
      this.ratings = [];
      this.ratings.push(rating);
    }
  }
  getMyRatingByMovie(movieId) {
    if (movieId && this.ratings && this.user.currentUserId.getValue()) {
      const data = this.ratings.find(x => x.userId === this.user.currentUserId.getValue() && x.movieId === Number(movieId));
      if (data) {
        return data.rating;
      }
    }
    return 0;
  }
  getAvgMovieRating(movieId) {
    if (movieId && this.ratings) {
      const data = this.ratings.filter(x => x.movieId === Number(movieId));
      if (data) {
        const rating = data.map(x => x.rating);
        const totalRating = rating.reduce((a, b) => a + b, 0);
        const avgRating = totalRating / rating.length;
        return avgRating;
      }
      return 0;
    }
    return 0;
  }
  addComments(comment) {
    if (comment) {
      if (!this.comments) {
        this.comments = [];
      }
      this.comments.push(comment);
    }
  }
  getCommentByMovie(movieId) {
    if (this.comments) {
      const comments = this.comments.filter(x => x.movieId === movieId);
      if (comments) {
          for (const item of comments) {
              const userData = this.user.getUserDetailsByUserId(item.userId);
              item.username = userData.userName;
          }
      }
      return comments;
    }
    return [];
  }
}
export interface Movies {
  id: number;
  title: string;
  description: string;
}
export interface Ratings {
  id: number;
  movieId: number;
  rating: number;
  userId: number;
}
export interface Comments {
  id: number;
  movieId: number;
  comment: string;
  userId: number;
  username: string;
}
