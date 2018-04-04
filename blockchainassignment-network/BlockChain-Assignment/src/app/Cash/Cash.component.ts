import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CashService } from './Cash.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Cash',
	templateUrl: './Cash.component.html',
	styleUrls: ['./Cash.component.css'],
  providers: [CashService]
})
export class CashComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      
          cashId = new FormControl("", Validators.required);
        
  
      
          currency = new FormControl("", Validators.required);
        
  
      
          value = new FormControl("", Validators.required);
        
  
      
          ownerId = new FormControl("", Validators.required);
        
  
      
          ownerEntity = new FormControl("", Validators.required);
        
  


  constructor(private serviceCash:CashService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          cashId:this.cashId,
        
    
        
          currency:this.currency,
        
    
        
          value:this.value,
        
    
        
          ownerId:this.ownerId,
        
    
        
          ownerEntity:this.ownerEntity
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceCash.getAll()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: "org.bjitgroup.com.Cash",
      
        
          "cashId":this.cashId.value,
        
      
        
          "currency":this.currency.value,
        
      
        
          "value":this.value.value,
        
      
        
          "ownerId":this.ownerId.value,
        
      
        
          "ownerEntity":this.ownerEntity.value
        
      
    };

    this.myForm.setValue({
      
        
          "cashId":null,
        
      
        
          "currency":null,
        
      
        
          "value":null,
        
      
        
          "ownerId":null,
        
      
        
          "ownerEntity":null
        
      
    });

    return this.serviceCash.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "cashId":null,
        
      
        
          "currency":null,
        
      
        
          "value":null,
        
      
        
          "ownerId":null,
        
      
        
          "ownerEntity":null 
        
      
      });
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else{
            this.errorMessage = error;
        }
    });
  }


   updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: "org.bjitgroup.com.Cash",
      
        
          
        
    
        
          
            "currency":this.currency.value,
          
        
    
        
          
            "value":this.value.value,
          
        
    
        
          
            "ownerId":this.ownerId.value,
          
        
    
        
          
            "ownerEntity":this.ownerEntity.value
          
        
    
    };

    return this.serviceCash.updateAsset(form.get("cashId").value,this.asset)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
            else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = error;
			}
    });
  }


  deleteAsset(): Promise<any> {

    return this.serviceCash.deleteAsset(this.currentId)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
			else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = error;
			}
    });
  }

  setId(id: any): void{
    this.currentId = id;
  }

  getForm(id: any): Promise<any>{

    return this.serviceCash.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "cashId":null,
          
        
          
            "currency":null,
          
        
          
            "value":null,
          
        
          
            "ownerId":null,
          
        
          
            "ownerEntity":null 
          
        
      };



      
        if(result.cashId){
          
            formObject.cashId = result.cashId;
          
        }else{
          formObject.cashId = null;
        }
      
        if(result.currency){
          
            formObject.currency = result.currency;
          
        }else{
          formObject.currency = null;
        }
      
        if(result.value){
          
            formObject.value = result.value;
          
        }else{
          formObject.value = null;
        }
      
        if(result.ownerId){
          
            formObject.ownerId = result.ownerId;
          
        }else{
          formObject.ownerId = null;
        }
      
        if(result.ownerEntity){
          
            formObject.ownerEntity = result.ownerEntity;
          
        }else{
          formObject.ownerEntity = null;
        }
      

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });

  }

  resetForm(): void{
    this.myForm.setValue({
      
        
          "cashId":null,
        
      
        
          "currency":null,
        
      
        
          "value":null,
        
      
        
          "ownerId":null,
        
      
        
          "ownerEntity":null 
        
      
      });
  }

}
