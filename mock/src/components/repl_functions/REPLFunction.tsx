import {Printable} from '../utility/Printable';

export interface REPLFunction {    
    (args: Array<string>): Printable<any>
}
