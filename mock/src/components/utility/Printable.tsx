export interface Printable<T, P> {
    data: T;
    print(): P; // Takes in an object's data-type T and returns a printable P (Maybe force P to be a string of HTML)
}