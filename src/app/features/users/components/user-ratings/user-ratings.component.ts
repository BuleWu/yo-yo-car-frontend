import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from '../../../../shared/components/navbar/navbar.component';
import {UserProviderService} from '../../user-provider-service/user-provider.service';
import {RatingProviderService} from '../../../ratings/services/rating-provider.service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {MatDivider} from '@angular/material/divider';
import {Rating} from '../../../../shared/models/rating/rating-models';
import {MatIcon} from '@angular/material/icon';
import {DatePipe} from '@angular/common';
import {RatingValueToWordMapping} from '../../enums/mappers';

@Component({
  selector: 'app-user-ratings',
  imports: [
    NavbarComponent,
    MatDivider,
    MatIcon,
    RouterLink,
    DatePipe,
  ],
  templateUrl: './user-ratings.component.html',
  styleUrl: './user-ratings.component.scss'
})
export class UserRatingsComponent implements OnInit {
  public noOfRatings: number = 0;
  public userRating: number = 0;
  public ratings: Rating[] = [];
  public RatingValueToWordMapping = RatingValueToWordMapping;

  constructor(
    private _userProviderService: UserProviderService,
    private _ratingProviderService: RatingProviderService,
    private _activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    const id = this._activatedRoute.snapshot.paramMap.get('id') as string;
    this._ratingProviderService.getRatingsByUserId(id)
      .subscribe((ratings) => {
        this.ratings = ratings;
        const sum = ratings.reduce((acc, curr) => acc + curr.value, 0)
        this.noOfRatings = ratings.length;
        this.userRating = ratings.length ? sum / this.noOfRatings : 0;
      });
  }
}
