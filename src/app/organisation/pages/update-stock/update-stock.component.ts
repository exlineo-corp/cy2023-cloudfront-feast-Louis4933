import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StocksI } from 'src/app/shared/models/stocks-i';
import { StocksService } from 'src/app/shared/services/stocks.service';

@Component({
  selector: 'app-update-stock',
  templateUrl: './update-stock.component.html',
  styleUrls: ['./update-stock.component.css']
})
export class UpdateStockComponent {

  stockId !: string;
  stock !: StocksI;

  constructor(public stockService: StocksService, private router: Router, private fb: FormBuilder, private route: ActivatedRoute) {

    this.stockId = this.route.snapshot.paramMap.get('id') || '';
    this.stockService.getStock(this.stockId)
      .then((e) => {
        this.stock = e;
        // on a déjà le console.log dans le service
      })
      .catch((er) => console.log(er));

  }

  stockForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    quantity: ['', Validators.required]
  });

  // Fonction pour mettre à jour un stock dans la liste
  updateStock() {

    const stock = this.stockForm.value;
    this.stockService.updatestock(this.stockId, stock);
    this.router.navigateByUrl('organisation/stocks');
    this.stockForm.reset();

  }

}
