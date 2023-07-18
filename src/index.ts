import SJSconsole, { insertConsoleElem, insertMenubarElem } from './console';
import { ScratchExtensionInfo, ScratchExtension, loadUnsandboxedExtension } from 'scratch-extension-utils';

class ScratchJS implements ScratchExtension {
    runtime: any;

    constructor(runtime: any) {
        this.runtime = runtime;
        insertConsoleElem();
        insertMenubarElem();
        console.log("ScratchJS Intialized!");
    }

    getInfo(): ScratchExtensionInfo {
        return {
            id: "scratchjs",
            name: "ScratchJS",
            blocks: [
                {
                    opcode: "eval_cmd",
                    blockType: "command",
                    text: "eval [code]",
                    arguments: {
                        code: {
                            type: "string",
                            defaultValue: "alert(\"Hello, World!\");"
                        }
                    }
                },
                {
                    opcode: "eval_rep",
                    blockType: "reporter",
                    text: "eval [code]",
                    arguments: {
                        code: {
                            type: "string",
                            defaultValue: "alert(\"Hello, World!\");"
                        }
                    }
                },
                {
                    opcode: "fetch",
                    blockType: "reporter",
                    text: "fetch [url]",
                    arguments: {
                        url: {
                            type: "string",
                            defaultValue: "https://api.weather.gov/points/37.4268,-122.0806"
                        }
                    }
                },
                {
                    opcode: "alert",
                    blockType: "command",
                    text: "alert [text]",
                    arguments: {
                        text: {
                            type: "string",
                            defaultValue: "Hello, World!"
                        }
                    }
                },
                {
                    opcode: "log",
                    blockType: "command",
                    text: "console log [text]",
                    arguments: {
                        text: {
                            type: "string",
                            defaultValue: "Hello, World!"
                        }
                    }
                },
                {
                    opcode: "error",
                    blockType: "command",
                    text: "console error [text]",
                    arguments: {
                        text: {
                            type: "string",
                            defaultValue: "Scary Error!"
                        }
                    }
                },
                {
                    opcode: "warn",
                    blockType: "command",
                    text: "console warn [text]",
                    arguments: {
                        text: {
                            type: "string",
                            defaultValue: "Spooky Warning!"
                        }
                    }
                },
                {
                    opcode: "clear",
                    blockType: "command",
                    text: "clear console",
                }
            ]
        }
    }

    eval_cmd = this.eval;
    eval_rep = this.eval;

    eval(args: { code: string }) {
        return JSON.stringify(eval(args.code));
    }

    async fetch(args: { url: string }) {
        return await fetch(args.url).then((res: Response) => res.text());
    }

    alert(args: { text: string }) {
        alert(args.text);
    }

    log(args: { text: string }) {
        SJSconsole.log(args.text);
    }

    error(args: { text: string }) {
        SJSconsole.error(args.text);
    }

    warn(args: { text: string }) {
        SJSconsole.warn(args.text);
    }

    clear() {
        SJSconsole.clear();
    }
}

loadUnsandboxedExtension(ScratchJS);