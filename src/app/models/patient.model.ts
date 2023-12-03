export interface PatientRegister{
    name: string,
    lastname: string,
    phone: string,
    email: string,
    cc: string,
    password: string,
    gender: string,
    birthdate: Date,
    address: string,
    description: string,
    familiar_name: string,
    familiar_lastname: string,
    familiar_email: string,
    familiar_phone: string,
}

export enum EnumEStatusPatient {
    STABLE = 1,
    RISKY =  2,
    CRITICAL = 3
}

export interface PatientCard{
   patient_id:number,
   name:string,
   lastname:string,
   cc:string,
   phone:string,
   emil:string,
   address:string,
   age:string,
   gender:string,
   img_url:string,
   status:EnumEStatusPatient
}

export interface PatientModel{

}
