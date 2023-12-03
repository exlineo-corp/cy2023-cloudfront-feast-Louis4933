import { Pipe, PipeTransform } from '@angular/core';
import { StocksI } from '../models/stocks-i';

@Pipe({
  name: 'stocks'
})
export class StocksPipe implements PipeTransform {

  transform(stocksList: Array<StocksI>, filtre : string): Array<StocksI> {
    return stocksList.filter(stock => stock.name.toLowerCase().indexOf(filtre.toLowerCase()) > -1 );
  }

}
