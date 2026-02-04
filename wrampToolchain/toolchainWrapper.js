import WasmModule from './wasm.js'
import WLinkModule from './wlink.js'

window.assembleAndLink = async (fileName, content) => {
    //Create instances of the JS wrappers for Wasm and WLink
    const WasmModuleInstance = await WasmModule();
    const WLinkModuleInstance = await WLinkModule();

    //Delete the input file from the Wasm File System if it already exists
    try { WasmModuleInstance.FS.unlink(fileName); } catch(e) {}
    WasmModuleInstance.FS.writeFile(fileName, content);

    //Assemble the provided .s file
    WasmModuleInstance.ccall('wasm', 'void', ['string'], [fileName]);

    //Write the outputted .o file to the WLink FS
    if (!WLinkModuleInstance) throw new Error('Module not initialized');
    const objData = WasmModuleInstance.FS.readFile('output.o');
    try { WLinkModuleInstance.FS.unlink('output.o'); } catch(e) {}
    WLinkModuleInstance.FS.writeFile('output.o', objData);

    //Link the provided .o file to produce an SREC
    WLinkModuleInstance.ccall('wlink', 'void', ['string'], ['output.o']);

    //Return the outputted .srec file as bytes
    const srecData = WLinkModuleInstance.FS.readFile('output.srec');
    return srecData;
}