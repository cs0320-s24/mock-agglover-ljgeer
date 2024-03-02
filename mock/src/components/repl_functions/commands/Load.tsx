import { REPLFunction } from '../REPLFunction';
import { PrintableString } from '../../utility/PrintableString';
import {mockedJson} from '../../../mock_json/mockedJson';
import { mock } from '../CommandExecuter';

// Define the function for the "greet" command
export const load: REPLFunction = (args: string[]): PrintableString => {
    return mock.load(args);
}
