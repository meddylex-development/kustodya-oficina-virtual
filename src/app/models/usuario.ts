// Exportamos la clase
export class Usuario {
    'idEstado': string;
    'idPerfil': string;
    'nombres': string;
    'apellidos': string;
    'telefono': string;
    'direccion': string;
    'numIdentificacion': string;
    'tipoIdentificacion': boolean;
    'email': string;
    'clave': string;
    'fechaNacimiento': number;

    constructor(
        idEstado: string,
        idPerfil: string,
        nombres: string,
        apellidos: string,
        telefono: string,
        direccion: string,
        numIdentificacion: string,
        tipoIdentificacion: boolean,
        email: string,
        clave: string,
        fechaNacimiento: number,
    ){}
}