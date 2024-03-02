import '../styles/main.css';
import { Printable } from './utility/Printable'

interface REPLHistoryProps{
    history: string[];
    outputMode: string;
    commandOutput: Printable<any>[];
}

// export function REPLHistory(props : REPLHistoryProps) {
//     return (
//         <div className="repl-history">
//             {/* This is where command history will go */}
//             {/* TODO: To go through all the pushed commands... try the .map() function! */}
//             {props.history.map((line, index) => 
//                 props.outputMode === 'verbose' ? (
//                 <p key={index}>Command: {line}</p>
//                 ) : (
//                 <p key={index}>{line}</p>
//                 )
//             )}
//         </div>
//     );
// }

export function REPLHistory(props: REPLHistoryProps) {
    return (
        <div className="repl-history">
            {/* This is where command history will go */}
            {/* TODO: To go through all the pushed commands... try the .map() function! */}
            {props.history.map((line, index) => (
                <div key={index}>
                    {props.outputMode === 'verbose' ? (
                        <p>Command: {line}</p>
                    ) : (
                        <p>{line}</p>
                    )}
                    {/* Check if commandOutput[index] exists before rendering */}
                    {props.commandOutput[index] && (
                        <p>{props.commandOutput[index].print()}</p>
                    )}
                </div>
            ))}
        </div>
    );
}