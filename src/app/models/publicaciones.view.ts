import { Baseview as BaseView } from "./base.view";

export class PublicacionesResponse {
    idPublicacion: number;
    idUsuario: number;

    nombre: string;
    contenido: string;

    fechaCreacion: string;
    cantidadComentarios: number;
    cantidadLikes: number;

    likePropio: boolean;
}

export class PublicacionesRequest extends BaseView {
    idPublicacion: number;
    idUsuario: number;
    
    contenido: string;
}

export class LikePublicacionRequest extends BaseView {
    idPublicacion: number;
    idUsuario: number;
}