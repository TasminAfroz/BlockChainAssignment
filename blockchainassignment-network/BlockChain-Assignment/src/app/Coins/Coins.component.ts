import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CoinsService } from './Coins.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Coins',
	templateUrl: './Coins.component.html',
	styleUrls: ['./Coins.component.css'],
  providers: [CoinsService]
})
export class CoinsComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      
          coinId = new FormControl("", Validators.required);
        
  
      
          value = new FormControl("", Validators.required);
        
  
      
          ownerId = new FormControl("", Validators.required);
        
  
      
          OwnerEntity = new FormControl("", Validators.required);
        
  


  constructor(private serviceCoins:CoinsService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          coinId:this.coinId,
        
    
        
          value:this.value,
        
    
        
          ownerId:this.ownerId,
        
    
        
          OwnerEntity:this.OwnerEntity
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceCoins.getAll()
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
      $class: "org.bjitgroup.com.Coins",
      
        
          "coinId":this.coinId.value,
        
      
        
          "value":this.value.value,
        
      
        
          "ownerId":this.ownerId.value,
        
      
        
          "OwnerEntity":this.OwnerEntity.value
        
      
    };

    this.myForm.setValue({
      
        
          "coinId":null,
        
      
        
          "value":null,
        
      
        
          "ownerId":null,
        
      
        
          "OwnerEntity":null
        
      
    });

    return this.serviceCoins.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "coinId":null,
        
      
        
          "value":null,
        
      
        
          "ownerId":null,
        
      
        
          "OwnerEntity":null 
        
      
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
      $class: "org.bjitgroup.com.Coins",
      
        
          
        
    
        
          
            "value":this.value.value,
          
        
    
        
          
            "ownerId":this.ownerId.value,
          
        
    
        
          
            "OwnerEntity":this.OwnerEntity.value
          
        
    
    };

    return this.serviceCoins.updateAsset(form.get("coinId").value,this.asset)
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

    return this.serviceCoins.deleteAsset(this.currentId)
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

    return this.serviceCoins.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "coinId":null,
          
        
          
            "value":null,
          
        
          
            "ownerId":null,
          
        
          
            "OwnerEntity":null 
          
        
      };



      
        if(result.coinId){
          
            formObject.coinId = result.coinId;
          
        }else{
          formObject.coinId = null;
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
      
        if(result.OwnerEntity){
          
            formObject.OwnerEntity = result.OwnerEntity;
          
        }else{
          formObject.OwnerEntity = null;
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
      
        
          "coinId":null,
        
      
        
          "value":null,
        
      
        
          "ownerId":null,
        
      
        
          "OwnerEntity":null 
        
      
      });
  }

}
