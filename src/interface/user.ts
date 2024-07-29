export interface UserResonse {
  users:  UserI;
  status: number;
}

export interface UserI {
  id:        string;
  email:     string;
  name:      string;
  lastname:  string;
  username:  string;
  password:  string;
  role:      string;
  dni:       string;
  country:   string;
  codePhone: string;
  isEmployee: boolean;
  phone:     string;
  active:    boolean;
  credit:    number;
  createdAt: Date;
  updatedAt: Date;
  Referreal: Referreal[];
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
  typePaid:          string;
  mountPaid:         number;
  positionReferreal: string;
  paid:              boolean;
  createdAt:         Date;
  updatedAt:         Date;
}
