import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.bjitgroup.com{
   export class Resident extends Participant {
      residentId: string;
      firstName: string;
      lastName: string;
      coins: Coins;
      cash: Cash;
      energy: Energy;
   }
   export class Bank extends Participant {
      bankId: string;
      bankName: string;
      coins: Coins;
      cash: Cash;
   }
   export class PDC extends Participant {
      pdcId: string;
      pdcName: string;
      coins: Coins;
      energy: Energy;
   }
   export class Coins extends Asset {
      coinId: string;
      value: number;
      ownerId: string;
      OwnerEntity: OwnerEntity;
   }
   export class Cash extends Asset {
      cashId: string;
      currency: string;
      value: number;
      ownerId: string;
      ownerEntity: OwnerEntity;
   }
   export class Energy extends Asset {
      energyId: string;
      unit: string;
      value: number;
      ownerId: string;
      ownerEntity: OwnerEntity;
   }
   export enum OwnerEntity {
      Resident,
      Bank,
      PDC,
   }
   export class EnergyToCoins extends Transaction {
      energyRate: number;
      energyValue: number;
      energyFrom: Energy;
      energyTo: Energy;
      coinFrom: Coins;
      coinTo: Coins;
   }
   export class CoinToCash extends Transaction {
      coinRate: number;
      coinValue: number;
      cashFrom: Cash;
      cashTo: Cash;
      coinFrom: Coins;
      coinTo: Coins;
   }
// }
