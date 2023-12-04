import { MessageModel } from "../models/message.model";

export const Messages = {
  DeleteRecord: "¿Estas seguro que deseas eliminar el registro?",
  SuccessAction: "Acción realizada con éxito",
  ErrorAction: "Error al realizar la acción",
  ErrorEmail: "¡Oh no! Tu correo no está registrado",
  ErrorPassword: "¡Oh no! Tu contraseña es incorrecta",
  ErrorLogin: "¡Oh no! Debes llenar todos los campos",
  WelcomeWebsite: "¡Hola! Esperamos que te encuentres mejor",
  WelcomeAdmin: "¡Hola! Te extrañamos",
  WelcomeDoctor: "¡Hola Doc! Te extrañamos",
  WelcomeFamiliar: "¡Hola! Te extrañamos",
  Logout: "¿Estas seguro que deseas cerrar sesión?",
  SuccessRegister: "¡Bienvenido a la familia Home Heal!",
  ImageError: "¡Oh no! No pudimos subir tu imagen",
  ErrorRegister: "¡Oh no! Los correos ya están registrados",
  newMessage: (mensaje:MessageModel) => `Tienes un nuevo mensaje de ${mensaje.nombre_remitente}`,
  CancelAppointment: "¿Estas seguro que deseas cancelar la cita?",
  EmailSent: (message:string) => `¡Tu ${message} ha sido notificado!`,
  ErrorCancelAppointment: "¡Oh no! No puedes cancelar una cita que ya ha pasado",
  ErrorCheckAppointment: "¡Oh no! No puedes checar una cita que no ha pasado",
  SuccessAppointment: "¡Tu cita ha sido agendada!",
}


