import {Printable} from './Printable';
import DOMPurify from 'dompurify';

class PrintableString implements Printable<string, string> {
    data: string;
    constructor(data: string) {
        this.data = DOMPurify.sanitize(data); // maybe sanitize this string or escape any backslashes
    }
    print(): string {
        return this.data
    }
}