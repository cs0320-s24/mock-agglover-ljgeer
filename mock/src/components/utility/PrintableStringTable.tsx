import {Printable} from './Printable';
import DOMPurify from 'dompurify';

export class PrintableStringTable implements Printable<string[][]> {
    data: string[][];
    headers: boolean;
    constructor(data: string[][], headers: boolean) {
        this.data = data.map((row) => row.map((elem) => DOMPurify.sanitize(elem)));
        this.headers = headers
    }

    // Slightly adapted from https://www.geeksforgeeks.org/how-to-build-an-html-table-using-reactjs-from-arrays/
    print(): JSX.Element {
        if (this.headers) {
            const headers = this.data[0];
            const data = this.data.slice(1);
            return (
                <table>
                    <thead>
                        <tr>
                            {headers.map((header, headerIndex) => (
                                <th key={headerIndex}>{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {row.map((elem, elemIndex) => (
                                    <td key={elemIndex}>{elem}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )
        } else {
            const data = this.data;
            return (
                <table>
                    <tbody>
                        {data.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {row.map((elem, elemIndex) => (
                                    <td key={elemIndex}>{elem}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )
        }        
    }
}