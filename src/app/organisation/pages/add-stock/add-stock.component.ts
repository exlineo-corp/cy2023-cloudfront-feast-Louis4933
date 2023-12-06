import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StocksService } from 'src/app/shared/services/stocks.service';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.css']
})
export class AddStockComponent {

  constructor(public stockService: StocksService, private router: Router, private fb: FormBuilder) {}

  stockForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    quantity: ['', Validators.required]
  });

  // Fonction pour ajouter un stock à la liste
  addStock() {
    const stock = this.stockForm.value;
    this.stockService.addStock(stock);
    this.router.navigateByUrl('organisation/stocks');
    this.stockForm.reset();
  }
}
