import {Printable} from './Printable';
import DOMPurify from 'dompurify';

export class PrintableString implements Printable<string> {
    data: string;
    constructor(data: string) {
        this.data = DOMPurify.sanitize(data); // maybe sanitize this string or escape any backslashes
    }
    print(): string {
        return this.data
    }
}