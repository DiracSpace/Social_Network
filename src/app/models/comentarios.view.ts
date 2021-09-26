import { Baseview } from "./base.view";

export class ComentariosResponse {
    idComentatio: number;
    idUsuario: number;

    nombre: string;

    idPublicacion: number;
    contenido: string;

    fechaCreacion: string;
    cantidadLikes: number;

    likePropio: boolean;
}

export class ComentarioRequest extends Baseview {
    idComentario: number;
    idPublicacion: number;
    idUsuario: number;

    contenido: string;
}