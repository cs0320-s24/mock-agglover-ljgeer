import {Printable} from './Printable';
import DOMPurify from 'dompurify';

export class PrintableString implements Printable<string> {
    data: string;
    constructor(data: string) {
        this.data = DOMPurify.sanitize(data);
    }
    print(): JSX.Element {
        return <>{this.data}</>
    }
}