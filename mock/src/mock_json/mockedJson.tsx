import {Printable} from '../components/utility/Printable';
import {PrintableString} from '../components/utility/PrintableString';
import {PrintableStringTable} from '../components/utility/PrintableStringTable';
import {PrintableRow} from '../components/utility/PrintableRow';

export class mockedJson {
    private currentCsv: string = "";
    private availableCsvs: Map<string, string[][]>;

    // Mocked data
    private simpleCsv: string[][];
    private headerCsv: string[][];
    private badRequest: string[][];
    private evilCsv: string[][];

    constructor() { // Populate these with actual Csvs?
        this.simpleCsv = [
            ["one", "two", "three", "four"],
            ["five", "six", "seven", "eight"],
            ["nine", "ten", "eleven", "twelve"]];
        this.headerCsv = [
            ["header1", "header2"],
            ["notaheader", "element"],
            ["another not-header", "final not-header"]];
        this.badRequest = [["placeholder"]];
        this.evilCsv = [["</tr><button>hacked, harharhar!</button>"]];
        
        this.availableCsvs = new Map();
        this.availableCsvs.set('data/simple.csv', this.simpleCsv);
        this.availableCsvs.set('data/header.csv', this.headerCsv);
        this.availableCsvs.set('data/imaginary.csv', this.badRequest);
        this.availableCsvs.set('data/secretfolder/evil.csv', this.evilCsv);
    }

    // Could delete this function and just specify each individual functionality in each REPLFunction,
    // but for now, this sort of 'emulates' a server more accurately
    request(args: string[]): Printable<any> {
        if (args[0] == "load_file") {
            return this.load(args.slice(1));
        }
        if (args[0] == "view") {
            return this.view(args.slice(1));
        } 
        if (args[0] == "search") {
            return new PrintableString("to-be-implemented");
        } else {
            return new PrintableString("command error - available commands: load_file, view, search")
        }
    }

    load(args: string[]): Printable<any> {
        // Check for correct arguments
        if (args.length != 1) {
            return new PrintableString(" Invalid argument length, correct usage: load_file <path to file>");
        }
        const path = args[0];
        if (this.availableCsvs.has("data/" + path)) {
            // Load the path inside mockedJson
            this.currentCsv = "data/" + path;
            return new PrintableString(`File "${path}" has been loaded.`);
        } else {    
            return new PrintableString(" File not found. Make sure file is in data/ directory.");
        }
    }

    view(args: string[]): Printable<any> {
        // Check for correct arguments (for sanity)
        if (args.length != 0) {
            return new PrintableString("Incorrect usage: view has no arguments.");
        }
        if (this.availableCsvs.has(this.currentCsv)) {
            // Headers should really be checked for 'view' as well, but since CSVParser did not specify it,
            // we will just assume headers are false for viewcsv
            return new PrintableStringTable(this.availableCsvs.get(this.currentCsv)!, false);
        } else {
            return new PrintableString("Please load a file first using load_file.");
        }
    }

    search(args: string[]): Printable<any> {
        if (args.length != 2) {
            return new PrintableString("Invalid argument length")
        }
        if (this.availableCsvs.has(this.currentCsv)) {
            if (args[0] == "0" && args[1] == "one") {
                let csv: string[][] | undefined = this.availableCsvs.get(this.currentCsv);
                if (csv !== undefined) {
                    return new PrintableRow(csv[0]);
                }
            }
            return new PrintableString("Search failed: value not found")
        } else {
            return new PrintableString("Please load a file first using load_file.");
        }
    }
}