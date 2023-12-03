import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StocksService } from 'src/app/shared/services/stocks.service';

@Component({
  selector: 'app-orga-stocks',
  templateUrl: './orga-stocks.component.html',
  styleUrls: ['./orga-stocks.component.css']
})
export class OrgaStocksComponent implements OnInit {
  filtre : string = '';

  constructor(public stockService: StocksService, private router: Router) { }

  ngOnInit(): void {
    this.stockService.getStocks();
  }

  addStock(){
    this.router.navigateByUrl('organisation/stocks/add');
  }

  deleteStock(id : string){
    this.stockService.deleteStock(id);
    this.stockService.getStocks();
  }

  updateStock(id : string){
    this.router.navigateByUrl(`organisation/stocks/update/${id}`);
  }
}

