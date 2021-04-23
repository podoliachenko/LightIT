import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {CreateReviewPayload, Product, Review} from '../interfaces/catalog';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.API}/api/products/`)
      .pipe(map((products: Product[]) => {
        for (const product of products) {
          product.img = environment.API + '/static/' + product.img;
        }
        return products;
      }));
  }

  createReview(productId: number, payload: CreateReviewPayload): Observable<CreateReviewPayload> {
    return this.http.post<CreateReviewPayload>(`${environment.API}/api/reviews/${productId}`, payload);
  }

  getReviews(productId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${environment.API}/api/reviews/${productId}`);
  }
}
