import '../styles/main.css';
import { Printable } from './utility/Printable'

interface REPLHistoryProps{
    history: string[];
    outputMode: string;
    commandOutput: Printable<any>[];
}

export function REPLHistory(props: REPLHistoryProps) {
    return (
        <div className="repl-history">
            {props.history.map((line, index) => (
                <div key={index}>
                    {props.outputMode === 'verbose' ? (
                        <div>
                            <p>Command: {line}</p>  
                            <span>Output: {props.commandOutput[index].print()}</span>
                        </div>
                    ) : (
                        <p>{props.commandOutput[index].print()}</p>
                    )}
                </div>
            ))}
        </div>
    );
}