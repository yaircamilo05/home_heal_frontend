export interface MessageModel{
  nombre_remitente?: string;
  nombre_destinatario?: string;
  room: string;
  email: string;
  image_username: string;
  image_destinatario: string;
  type: number
  mensaje: string;
  fecha: string;
  hora: string;
}
