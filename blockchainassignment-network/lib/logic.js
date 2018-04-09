'use strict';
/**
 * Write your transction processor functions here
 */
/**
 * TalktimeToCash
 * @param {org.bjitgroup.com.TalktimeToCash} valueChange
 * @transaction
 */




function TalktimeToCash(valueChange) {
    var changedValue = valueChange.callRate * valueChange.minute;
  
   valueChange.talkTimeFrom.value = valueChange.talkTimeTo.value + valueChange.minute
   
   valueChange.talkTimeTo.value = valueChange.minute
   valueChange.cashTo.value =valueChange.cashTo.value + changedValue;
   valueChange.cashFrom.value =valueChange.cashFrom.value-changedValue;
     return getAssetRegistry('org.bjitgroup.com.Talktime')
         .then(function (assetRegistry) {
             return assetRegistry.updateAll([valueChange.talkTimeTo,valueChange.talkTimeFrom]);
         }).then(function () {
             return  getAssetRegistry('org.bjitgroup.com.Cash')
             .then(function (assetRegistry) {
                 return assetRegistry.updateAll([valueChange.cashTo, valueChange.cashFrom]);
             });            
         });
 }
 
 


