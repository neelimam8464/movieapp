
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BarRatingModule } from 'ngx-bar-rating';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { StatModule } from 'src/app/shared/modules/stat/stat.module';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
    declarations: [MoviesListComponent, MovieDetailsComponent],
    imports: [
        CommonModule,
        UserRoutingModule,
        StatModule,
        MatCardModule,
        MatGridListModule,
        MatIconModule,
        CommonModule,
        MatButtonModule,
        MatInputModule,
        ReactiveFormsModule,
        BarRatingModule,
        MatSnackBarModule,
        MatFormFieldModule,
        FormsModule,
        MatCardModule
    ],
})
export class UserModule {}
