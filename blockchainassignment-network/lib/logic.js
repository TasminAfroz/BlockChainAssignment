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
    var totalBill = valueChange.callRate* valueChange.mintue;
    // var changedValue = valueChange.energyRate * valueChange.energyValue;
   
    // valueChange.energyFrom.value = valueChange.energyFrom.value - valueChange.energyValue;
    // valueChange.energyTo.value = valueChange.energyTo.value + valueChange.energyValue;
    // valueChange.coinFrom.value = valueChange.coinFrom.value - changedValue;
    // valueChange.coinTo.value = valueChange.coinTo.value + changedValue;
   
    // return getAssetRegistry('org.bjitgroup.com.Coins')
    // .then(function (assetRegistry) {
    // return assetRegistry.updateAll([valueChange.coinTo, valueChange.coinFrom]);
    // })
    // .then(function () {
    // return getAssetRegistry('org.bjitgroup.com.Energy')
    // .then(function (assetRegistry) {
    // return assetRegistry.updateAll([valueChange.energyTo, valueChange.energyFrom]);
    // }); 
    // });
   }
/**
 * CashToTalkTime
 * @param {org.bjitgroup.com.CashToTalkTime} valueChange 
 * @transaction
 */
function CashToTalkTime(valueChange) {
    // var changedValue = valueChange.coinRate * valueChange.coinValue;
   
    // valueChange.cashFrom.value = valueChange.cashFrom.value - changedValue;
    // valueChange.cashTo.value = valueChange.cashTo.value + changedValue;
    // valueChange.coinFrom.value = valueChange.coinFrom.value - valueChange.coinValue;
    // valueChange.coinTo.value = valueChange.coinTo.value + valueChange.coinValue;
   
    // return getAssetRegistry('org.bjitgroup.com.Coins')
    // .then(function (assetRegistry) {
    // return assetRegistry.updateAll([valueChange.coinTo, valueChange.coinFrom]);
    // })
    // .then(function () {
    // return getAssetRegistry('org.bjitgroup.com.Cash')
    // .then(function (assetRegistry) {
    // return assetRegistry.updateAll([valueChange.cashTo, valueChange.cashFrom]);
    // }); 
    // });
   }

