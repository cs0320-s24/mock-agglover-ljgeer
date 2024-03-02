import { Printable } from './Printable';
import DOMPurify from 'dompurify';

export class PrintableRow implements Printable<string[]> {
    data: string[];
    
    constructor(data: string[]) {
        this.data = data.map((elem) => DOMPurify.sanitize(elem));
    }

    print(): JSX.Element {
        return (
            <table>
                <tbody>
                    <tr>
                        {this.data.map((elem, index) => (
                            <td key={index}>{elem}</td>
                        ))}
                    </tr>
                </tbody>
            </table>
        );
    }
}