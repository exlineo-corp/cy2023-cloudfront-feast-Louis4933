import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsPipe } from './pipes/events.pipe';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StocksPipe } from './pipes/stocks.pipe';


@NgModule({
  declarations: [
    EventsPipe,
    StocksPipe
  ],
  exports: [
    FormsModule,
    HttpClientModule,
    EventsPipe,
    StocksPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ]
})
export class SharedModule { }
