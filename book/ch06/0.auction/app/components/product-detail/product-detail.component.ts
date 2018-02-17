import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Product, Review, ProductService} from '../../services/product.service';

@Component({
  selector: 'auction-product-page',
  templateUrl: 'app/components/product-detail/product-detail.component.html'
})
export default class ProductDetailComponent {
  product: Product;
  reviews: Review[];

  newComment: string;
  newRating: number = 0;

  isReviewHidden: boolean = true;


  constructor(route: ActivatedRoute, productService: ProductService) {
    let prodId: number = parseInt(route.snapshot.params['productId']);
    this.product = productService.getProductById(prodId);
    this.reviews = productService.getReviewsForProduct(this.product.id);
  }

  addReview() {
    let review = new Review(0, this.product.id, new Date(), 'Anonymous', this.newRating, this.newComment);
    console.log('Adding review' + JSON.stringify(review));

    // 전개 연산자
    this.reviews = [...this.reviews, review];
    this.product.rating = this.averageRating(this.reviews);

    this.resetForm();
  }

  averageRating(reviews: Review[]) {
    let sum = reviews.reduce((average, review) => average + (review.rating || 0), 0);
    return sum / reviews.length;
  }

  resetForm() {
    this.newRating = 0;
    this.newComment = null;
    this.isReviewHidden = true;
  }
}





