import {Printable} from '../utility/Printable';

/**
 * Interface for all command line functions
 */
export interface REPLFunction {    
    (args: Array<string>): Printable<any>
}
