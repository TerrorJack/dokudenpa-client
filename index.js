import Terminal from "xterm";
import * as Chalk from "chalk";

function sleep(interval) {
    return new Promise(resolve => setTimeout(() => resolve(null), interval));
}

(async () => {
    const term = new Terminal({cursorBlink: true, rows: 64});
    term.writeWithInterval = interval => async (text) => {
        for (let i = 0; i < text.length; ++i) {
            term.write(text[i]);
            await sleep(interval);
        }
    };
    const chalk = new Chalk.constructor({enabled: true, level: 2});

    term.open(document.body, true);
    term.element.classList["add"]("fullscreen");

    const f = term.writeWithInterval(128);
    await f(chalk.green("HELLO"));
    await f(" WORLD");
})();
