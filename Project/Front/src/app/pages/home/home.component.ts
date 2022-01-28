import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { BrandService } from 'src/app/services/brand.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products=[]
  brands:string[]=[]
  constructor(private _products:ProductsService,private _brand:BrandService, private _category:CategoryService) { }

  ngOnInit(): void {
    this.allProducts()
  }

  allProducts(){
    this._products.getAllProducts().subscribe(
      (res) => {
        let newProducts = res.data
        newProducts.forEach( (product:any) => {
          this._brand.getBrandById(product.brandId).subscribe(result => { product.brandName = result.data.name })

          product.categoryNames = []
          product.categories.forEach((cat:any) => {
            this._category.getCategoryById(cat.catId).subscribe(result => { product.categoryNames.push(result.data.name) })
          });

        })
        this.products = newProducts
      }
    )
  }
}
