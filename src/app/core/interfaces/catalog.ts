export interface Product {
  id: number;
  img: string;
  text: string;
  title: string;
}

export interface Review {
  id: number;
  product: number;
  created_by: CreatedBy;
  rate: number;
  text: string;
  created_at: string;
}

export interface CreatedBy {
  id: number;
  username: string;
}

export interface CreateReviewPayload {
  rate: number;
  text: string;
}

export interface CreateReviewResponse {
  review_id: number;
}
