import {Printable} from './Printable';
import DOMPurify from 'dompurify';

class PrintableStringTable implements Printable<string[][], string> {
    data: string[][];
    headers: boolean;
    constructor(data: string[][], headers: boolean) {
        this.data = data.map((row) => row.map((elem) => DOMPurify.sanitize(elem)));
        this.headers = headers
    }

    // https://stackoverflow.com/questions/15164655/generate-html-table-from-2d-javascript-array
    // Slightly edited from above source (added sanitization and headers)
    print(): string {
        var table = "<table>";
        for (var i = 0; i < this.data.length; i++) {
            if (i == 0 && this.headers) { // Make HTML table headers
                table += "<thead>"
                table += "<tr>"
                for (var j = 0; i < this.data[i].length; j++) {
                    table += "<th>" + this.data[i][j] + "</th>";
                }
                table += "</tr>"
                table += "</thead>"
            } else {
                table += "<tr>";
                for (var j = 0; i < this.data[i].length; j++) {
                    table += "<td>" + this.data[i][j] + "</td>";
                }
                table += "</tr>";
            }
        }
        table += "</table>";

        return table;
    }
}