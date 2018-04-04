import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { EnergyService } from './Energy.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Energy',
	templateUrl: './Energy.component.html',
	styleUrls: ['./Energy.component.css'],
  providers: [EnergyService]
})
export class EnergyComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      
          energyId = new FormControl("", Validators.required);
        
  
      
          unit = new FormControl("", Validators.required);
        
  
      
          value = new FormControl("", Validators.required);
        
  
      
          ownerId = new FormControl("", Validators.required);
        
  
      
          ownerEntity = new FormControl("", Validators.required);
        
  


  constructor(private serviceEnergy:EnergyService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          energyId:this.energyId,
        
    
        
          unit:this.unit,
        
    
        
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
    return this.serviceEnergy.getAll()
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
      $class: "org.bjitgroup.com.Energy",
      
        
          "energyId":this.energyId.value,
        
      
        
          "unit":this.unit.value,
        
      
        
          "value":this.value.value,
        
      
        
          "ownerId":this.ownerId.value,
        
      
        
          "ownerEntity":this.ownerEntity.value
        
      
    };

    this.myForm.setValue({
      
        
          "energyId":null,
        
      
        
          "unit":null,
        
      
        
          "value":null,
        
      
        
          "ownerId":null,
        
      
        
          "ownerEntity":null
        
      
    });

    return this.serviceEnergy.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "energyId":null,
        
      
        
          "unit":null,
        
      
        
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
      $class: "org.bjitgroup.com.Energy",
      
        
          
        
    
        
          
            "unit":this.unit.value,
          
        
    
        
          
            "value":this.value.value,
          
        
    
        
          
            "ownerId":this.ownerId.value,
          
        
    
        
          
            "ownerEntity":this.ownerEntity.value
          
        
    
    };

    return this.serviceEnergy.updateAsset(form.get("energyId").value,this.asset)
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

    return this.serviceEnergy.deleteAsset(this.currentId)
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

    return this.serviceEnergy.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "energyId":null,
          
        
          
            "unit":null,
          
        
          
            "value":null,
          
        
          
            "ownerId":null,
          
        
          
            "ownerEntity":null 
          
        
      };



      
        if(result.energyId){
          
            formObject.energyId = result.energyId;
          
        }else{
          formObject.energyId = null;
        }
      
        if(result.unit){
          
            formObject.unit = result.unit;
          
        }else{
          formObject.unit = null;
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
      
        
          "energyId":null,
        
      
        
          "unit":null,
        
      
        
          "value":null,
        
      
        
          "ownerId":null,
        
      
        
          "ownerEntity":null 
        
      
      });
  }

}
