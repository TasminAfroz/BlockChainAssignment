import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { TransactionComponent } from './Transaction/Transaction.component'
import { HomeComponent } from './home/home.component';

import { CoinsComponent } from './Coins/Coins.component';
import { CashComponent } from './Cash/Cash.component';
import { EnergyComponent } from './Energy/Energy.component';

const routes: Routes = [
    // { path: 'transaction', component: TransactionComponent },
    {path: '', component: HomeComponent},
		
		{ path: 'Coins', component: CoinsComponent},
		
		{ path: 'Cash', component: CashComponent},
		
		{ path: 'Energy', component: EnergyComponent},
		
		{path: '**', redirectTo:''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
