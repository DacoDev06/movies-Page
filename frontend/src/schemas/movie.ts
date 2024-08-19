class Movie {
    id:number
    titulo: string;
    año: number;
    url: string;
    description: string;

    constructor(id:number,titulo: string, año: number, url: string, description: string) {
        this.id = id
        this.titulo = titulo;
        this.año = año;
        this.url = url;
        this.description = description;
    }
}

export {Movie}