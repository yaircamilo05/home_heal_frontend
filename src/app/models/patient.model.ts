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
    NOREGISTER = 1,
    ESTABLE = 2,
    RIESGOSO =  3,
    CRITICO = 4
}

export interface PatientCard{
   patient_id:number,
   name:string,
   lastname:string,
   cc:string,
   phone:string,
   email:string,
   email_familiar:string,
   id_familiar:number,
   family_name:string,
   address:string,
   description:string,
   age:string,
   gender:string,
   img_url:string,
   status:EnumEStatusPatient
}

export interface PatientModel{

}
