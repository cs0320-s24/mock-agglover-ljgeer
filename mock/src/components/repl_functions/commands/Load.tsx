import { REPLFunction } from '../REPLFunction';
import { PrintableString } from '../../utility/PrintableString';

// Define the function for the "greet" command
export const load: REPLFunction = (args: string[]): PrintableString => {
    // if (args.length === 0) {
    //     return new PrintableString("hello");
    // } else if (args.length === 1) {
    //     r