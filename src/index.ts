import SJSconsole, { insertConsoleElem, insertMenubarElem } from './console';
import { ScratchExtensionInfo, ScratchExtension, loadExtension } from './extensionUtils';

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
                    opcode: "clear",
                    blockType: "command",
                    text: "clear console",
                }
            ]
        }
    }

    eval_cmd = this.eval;
    eval_rep = this.eval;

    eval({ code }: { code: string }) {
        return JSON.stringify(eval(code));
    }

    async fetch({ url }: { url: string }) {
        return await fetch(url).then((res: Response) => res.text());
    }

    alert({ text }: { text: string }) {
        alert(text);
    }

    log({ text }: { text: string }) {
        SJSconsole.log(text);
    }

    clear() {
        SJSconsole.clear();
    }
}

loadExtension(ScratchJS);