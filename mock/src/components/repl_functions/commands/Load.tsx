import { REPLFunction } from '../REPLFunction';
import { PrintableString } from '../../utility/PrintableString';

// Define the function for the "greet" command
export const load: REPLFunction = (args: string[]): PrintableString => {
    return new PrintableString("loaded");
}
