import { Component } from '@angular/core';
import {ProductsService} from "../services/products.service";
import {Product, Products} from "../../types";
import {ProductComponent} from "../components/product/product.component";
import {NgForOf} from "@angular/common";
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductComponent, NgForOf, PaginatorModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private productsService: ProductsService) {}

  products: Product[] = [];
  totalRecords: number = 0;
  rows: number = 5;
  rowsPerPageOptions: number[] = [5, 10, 20];

  onProductOutput(product: Product) {
    console.log(product, 'Output');
  }

  fetchProducts(page: number, perPage: number) {
    this.productsService
      .getProducts('http://localhost:3000/clothes', {page, perPage})
      .subscribe((products: Products) => {
        this.products = products.items;
        this.totalRecords = products.total;
      });
  }

  onPageChange(event: any) {
    this.fetchProducts(event.page, event.rows);
  }

  ngOnInit() {
    this.fetchProducts(0, this.rows);
  }
}
