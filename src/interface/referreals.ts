export interface ReferrealI {
  referreals: Referreal[];
  status:     number;
}

export interface Referreal {
  id:                string;
  code:              string;
  userId:            string;
  active:            boolean;
  nameReferreal:     string;
  lastnameReferreal: string;
  emailReferreal:    string;
  phoneReferreal:    string;
  dniReferreal:      string;
  positionReferreal: string;
  createdAt:         Date;
  updatedAt:         Date;
}
