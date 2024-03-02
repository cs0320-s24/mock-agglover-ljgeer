import { REPLFunction } from '../REPLFunction';
import { PrintableString } from '../../utility/PrintableString';
import { mock } from '../CommandExecuter';

export const load: REPLFunction = (args: string[]): PrintableString => {
    return mock.load(args);
}
