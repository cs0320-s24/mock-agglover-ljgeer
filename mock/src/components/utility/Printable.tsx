export interface Printable<T> { // Not sure about this generic type, can keep for now
    data: T;
    print(): string; // Takes in an object's data-type and produces a string of printable HTML content
}