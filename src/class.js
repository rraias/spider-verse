//Class Constructor
class Hero {
    constructor(name, description, thumbnail){
        this.name = name,
        this.description = description,
        this.thumbnail = thumbnail
    }
}

;

class Comic{
    constructor(id, title, price, thumbnail, creators){
        this.id = id;
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
        this.creators = creators
    }
}

export {Hero, Comic}