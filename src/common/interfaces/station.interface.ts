export interface Station {
  displayName: string;
  id: number;
  hasDiesel: boolean;
  hasGasoline: boolean;
  hasLpg: boolean;
  stationUrl: string;
  cityNameKey?: string | number;
  districtNameKey?: string | number;
  gasolineKey?: string | number;
  dieselKey?: string | number;
  lpgKey?: string | number;
}
