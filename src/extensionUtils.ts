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

export const loadExtension = (extensionClass: any) => {
    const instance = new extensionClass(window.vm.extensionManager.runtime);
    const service = window.vm.extensionManager._registerInternalExtension(instance);
    window.vm.extensionManager._loadedExtensions.set(instance.getInfo().id, service);
}