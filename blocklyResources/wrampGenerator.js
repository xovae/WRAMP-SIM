export const wrampGenerator = new Blockly.CodeGenerator('WRAMP');

wrampGenerator.STATEMENT_PREFIX = 'highlightBlock(%1)\n\t';
wrampGenerator.addReservedWords('highlightBlock');

function textBlock(block, generator) {
  const instruction = block.getFieldValue('instruction');
  return `${instruction}`;
}

function instructionThreeRegisterBlock(block, generator) {
  const instruction = block.getFieldValue('instruction');
  const register1 = block.getFieldValue('register1');
  const register2 = block.getFieldValue('register2');
  const register3 = block.getFieldValue('register3');
  return `${instruction} ${register1}, ${register2}, ${register3}`;
}

function instructionTwoRegisterImmediateBlock(block, generator) {
  const instruction = block.getFieldValue('instruction');
  const register1 = block.getFieldValue('register1');
  const register2 = block.getFieldValue('register2');
  const immediate = block.getFieldValue('immediate');
  return `${instruction} ${register1}, ${register2}, ${immediate}`;
}

function wordBlock(block, generator) {
  const instruction = block.getFieldValue('instruction');
  const register1 = block.getFieldValue('register1');
  const offset = block.getFieldValue('offset');
  const register2 = block.getFieldValue('register2');
  return `${instruction} ${register1}, ${offset}(${register2})`;
}

function specialMoveBlock(block, generator) {
  const instruction = block.getFieldValue('instruction');
  const register1 = block.getFieldValue('register1');
  const register2 = block.getFieldValue('register2')
  const specialRegister = block.getFieldValue('specialRegister');
  if (register1 != null)
  {
    return `${instruction} ${register1}, ${specialRegister}`;
  }
  else
  {
    return `${instruction} ${specialRegister}, ${register2}`
  }
}

function memoryBlocks(block, generator) {
  const instruction = block.getFieldValue('instruction');
  const string = block.getFieldValue('string');
  return `${instruction} ${string}`;
}

function asciiBlocks(block, generator) {
  const instruction = block.getFieldValue('instruction');
  const string = block.getFieldValue('string');
  return `${instruction} "${string}"`
}

wrampGenerator.scrub_ = function(block, code, thisOnly) {
  const nextBlock =
      block.nextConnection && block.nextConnection.targetBlock();
  if (nextBlock && !thisOnly) {
    return code + '\n' + wrampGenerator.blockToCode(nextBlock);
  }
  return code;
};

wrampGenerator.forBlock['global'] = textBlock;

wrampGenerator.forBlock['textHead'] = textBlock;

wrampGenerator.forBlock['dataHead'] = textBlock;

wrampGenerator.forBlock['bssHead'] = textBlock;

wrampGenerator.forBlock['equ'] = function(block, generator) {
  const instruction = block.getFieldValue('instruction');
  const alias = block.getFieldValue('alias');
  const immediate = block.getFieldValue('immediate');
  return `${instruction} ${alias}, ${immediate}`
}

wrampGenerator.forBlock['label'] = function(block, generator) {
  const label = block.getFieldValue('label');
  return `LABEL${label}:`;
}

wrampGenerator.forBlock['jump'] = function(block, generator) {
  const instruction = block.getFieldValue('instruction');
  const address = block.getFieldValue('address');
  return `${instruction} ${address}`;
}

wrampGenerator.forBlock['jumpRegister'] = function(block, generator) {
  const instruction = block.getFieldValue('instruction');
  const register = block.getFieldValue('register');
  return `${instruction} ${register}`;
}

wrampGenerator.forBlock['branchOn'] = function(block, generator) {
  const instruction = block.getFieldValue('instruction');
  const register = block.getFieldValue('register');
  const offset = block.getFieldValue('offset');
  return `${instruction} ${register}, ${offset}`;
}

wrampGenerator.forBlock['loadWord'] = wordBlock;

wrampGenerator.forBlock['storeWord'] = wordBlock;

wrampGenerator.forBlock['loadAddress'] = function(block, generator) {
  const register = block.getFieldValue('register');
  const address = block.getFieldValue('address');
  return `la ${register}, ${address})`;
}

wrampGenerator.forBlock['word'] = memoryBlocks;

wrampGenerator.forBlock['asciiz'] = asciiBlocks;

wrampGenerator.forBlock['ascii'] = asciiBlocks;

wrampGenerator.forBlock['space'] = memoryBlocks;

wrampGenerator.forBlock['arithmetic'] = instructionThreeRegisterBlock

wrampGenerator.forBlock['arithmeticUnsigned'] = instructionThreeRegisterBlock

wrampGenerator.forBlock['arithmeticImmediate'] = instructionTwoRegisterImmediateBlock;

wrampGenerator.forBlock['arithmeticUnsignedImmediate'] = instructionTwoRegisterImmediateBlock;

wrampGenerator.forBlock['loadHighImmediate'] = function(block, general) {
  const instruction = block.getFieldValue('instruction');
  const register = block.getFieldValue('register');
  const immediate = block.getFieldValue('immediate');
  return `${instruction} ${register}, ${immediate}`
}

wrampGenerator.forBlock['bitwise'] = instructionThreeRegisterBlock;

wrampGenerator.forBlock['bitwiseImmediate'] = instructionTwoRegisterImmediateBlock;

wrampGenerator.forBlock['shift'] = instructionThreeRegisterBlock;

wrampGenerator.forBlock['shiftImmediate'] = instructionTwoRegisterImmediateBlock;

wrampGenerator.forBlock['setOn'] = instructionThreeRegisterBlock;

wrampGenerator.forBlock['setOnUnsigned'] = instructionThreeRegisterBlock;

wrampGenerator.forBlock['setOnImmediate'] = instructionTwoRegisterImmediateBlock;

wrampGenerator.forBlock['setOnUnsignedImmediate'] = instructionTwoRegisterImmediateBlock;

wrampGenerator.forBlock['moveGeneralToSpecial'] = specialMoveBlock;

wrampGenerator.forBlock['moveSpecialToGeneral'] = specialMoveBlock;

wrampGenerator.forBlock['break'] = textBlock;

wrampGenerator.forBlock['syscall'] = textBlock;

wrampGenerator.forBlock['returnFromException'] = textBlock;

window.wrampGenerator = wrampGenerator;