export type ScratchBlockArgument = {
    type: "string" | "number",
    defaultValue?: string | number
}

export type ScratchBlock = {
    opcode: string
    blockType: "command" | "reporter" | "Boolean" | "hat",
    text: string,
    arguments?: {[key: string]: ScratchBlockArgument},
    filter?: any
}

export type ScratchExtensionInfo = {
    id: string
    name: string,
    menuIconURI?: string,
    blockIconURI?: string,
    blocks?: ScratchBlock[]
}

export interface ScratchExtension {
    runtime?: any;
    getInfo(): ScratchExtensionInfo;
}

declare global {
    interface Window {
        vm: {
            extensionManager: {
                runtime: any,
                _registerInternalExtension: (extension: ScratchExtension) => any,
                _loadedExtensions: Map<any, any>
            }
        }
    }
}

export const loadCSS = (url: string) => {
    const elem = document.createElement('link');
}