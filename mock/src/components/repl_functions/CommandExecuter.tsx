import { REPLFunction } from './REPLFunction';
import { load } from './commands/Load'
import { view } from './commands/View'
import { search } from './commands/Search'
import {Printable} from '../utility/Printable'
import {PrintableString} from '../utility/PrintableString'
import {mockedJson} from '../../mock_json/mockedJson';

export const mock = new mockedJson();

export class CommandExecutor {
    private commands: Map<string, REPLFunction>;

    constructor() {
        this.commands = new Map<string, REPLFunction>();
        this.registerCommand("load_file", load);
        this.registerCommand("view", view);
        this.registerCommand("search", search);
        //can add additional commands here
    }

    // Method to register a new command

    //actually this might not be feasible because dk what the repl function is, so user 
    //might just have to populate this one
    public registerCommand(commandName: string, commandFunction: REPLFunction): void {
        if (!this.commands.has(commandName)) {
            this.commands.set(commandName, commandFunction);
        }
    }

    // Method to execute a command
    public executeCommand(commandName: string, args: string[]): Printable<any> {
        const commandFunction = this.commands.get(commandName);
        if (commandFunction) {
            return commandFunction(args);
        } else {
            return new PrintableString("command not found");
        }
    }
}