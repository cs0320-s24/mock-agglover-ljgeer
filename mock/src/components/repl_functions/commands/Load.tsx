import { REPLFunction } from '../REPLFunction';
import { PrintableString } from '../../utility/PrintableString';
import {mockedJson} from '../../../mock_json/mockedJson';

// Define the function for the "greet" command
export const load: REPLFunction = (args: string[]): PrintableString => {
    const mock = new mockedJson();
    return mock.load(args.slice(1));
}
