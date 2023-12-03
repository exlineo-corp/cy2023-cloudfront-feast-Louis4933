import { Injectable } from '@angular/core';
import { StocksI } from '../models/stocks-i';
import { BehaviorSubject } from 'rxjs';
import { Firestore, addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class StocksService {

  stocksList: Array<StocksI> = [];
  stocksList$:BehaviorSubject<Array<StocksI>> = new BehaviorSubject([] as Array<StocksI>);

  constructor( private firestore: Firestore) {}

  // Récupération de tous les stocks
  getStocks(){
    this.stocksList = [];

    getDocs(collection(this.firestore, 'stocks'))
      .then((querySnapshot) => {
        const newStocksList : StocksI[] = [];
  
        querySnapshot.forEach((doc) => {
          const data = doc.data() as StocksI;
          const stockData = { ...data, id: doc.id };
          newStocksList.push(stockData);
        });
  
        this.stocksList = newStocksList;
        this.stocksList$.next(this.stocksList);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  /**
   * Récupération d'un stock
   * @param id
   */
  getStock(id: string): Promise<StocksI> {
    return getDoc(doc(this.firestore, 'stocks', id))
      .then((stockDoc) => {
        if (stockDoc.exists()) {
          const stock = stockDoc.data() as StocksI;
          stock.id = stockDoc.id;
          console.log('Stock details:', stock);
          return stock;
        } else {
          console.log('No such stock!');
          return {} as StocksI;
        }
      })
      .catch((error) => {
        console.error('Firestore error:', error);
        return {} as StocksI;
      });
  }

  /**
   * Ajout d'un nouveau stock
   * @param stockData
   */
  addStock(stockData: any) {
    addDoc(collection(this.firestore, 'stocks'), stockData)
    .then(() => {
      console.log('Stock added successfully');
    })
    .catch((error) => {
      console.error('Error adding stock:', error);
      throw error;
    });
  }

  /**
   * Suppression d'un stock
   * @param stockId
   */
  deleteStock(stockId: string) {
    deleteDoc(doc(this.firestore, 'stocks', stockId))
    .then(() => {
      console.log('Stock deleted successfully');
    })
    .catch((error) => {
      console.error('Error deleting stock:', error);
      throw error;
    });
  }

  /**
   * Mise à jour d'un stock
   * @param stockId
   * @param updatedstockData
   */
  updatestock(stockId: string, updatedStockData: StocksI) {
    const stockRef = doc(this.firestore, 'stocks', stockId);
    setDoc(stockRef, updatedStockData)
    .then(() => {
      console.log('Stock updated successfully');
    })
    .catch((error) => {
      console.error('Error updating stock:', error);
      throw error;
    });
  }

}
