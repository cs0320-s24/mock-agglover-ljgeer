export interface Printable<T> { // Not sure about this generic type, can keep for now
    data: T;
    print(): JSX.Element; // Takes in an object's data-type and produces a JSX Element to print
}