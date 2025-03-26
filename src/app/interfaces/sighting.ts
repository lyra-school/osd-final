export interface Sighting {
    _id?: string;
    date: Date;
    location: BirdLocation;
    description: string;
    birds: string[];
    imageLink?: string;
    dateLastChanged?: Date;
    owner?: string;
}

export interface BirdLocation {
    habitat: string;
    area: string;
}