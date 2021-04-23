import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Review} from '../../../core/interfaces/catalog';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'lt-review-item',
  templateUrl: './review-item.component.html',
  styleUrls: ['./review-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewItemComponent implements OnInit {


  @Input() review: Review;
  rating: FormControl;

  ngOnInit(): void {
    this.rating = new FormControl(this.review.rate);
  }

}
