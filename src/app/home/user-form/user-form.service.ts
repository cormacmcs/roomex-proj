import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';

export interface Movies {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserFormService {
  matchedMovies = new BehaviorSubject<Movies[]>(undefined);
  movieList: Movies[];
  constructor(private api: ApiService) {}

  movieExists(movie: string) {
    if (this.movieList) {
      return this.movieList.find(m => m.Title === movie);
    }
  }

  getMovies(title: string): void {
    this.api
      .get('http://www.omdbapi.com/?apikey=83513884&type=%20movie&s=' + title)
      .pipe(map(res => res.Search))
      .subscribe(e => {
        this.movieList = e;
        this.matchedMovies.next(e);
      });
  }
}
