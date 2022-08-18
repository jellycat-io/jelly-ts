const KEYS = {
  BACKSPACE: "Backspace",
  TAB: "Tab",
  ENTER: "Enter",
  SHIFT_LEFT: "ShiftLeft",
  SHIFT_RIGHT: "ShiftRight",
  CTRL_LEFT: "ControlLeft",
  CTRL_RIGHT: "ControlRight",
  ALT_LEFT: "AltLeft",
  ALT_RIGHT: "AltRight",
  PAUSE: "Pause",
  CAPS_LOCK: "CapsLock",
  ESCAPE: "Escape",
  SPACE: "Space",
  PAGE_UP: "PageUp",
  PAGE_DOWN: "PageDown",
  END: "End",
  HOME: "Home",
  ARROW_LEFT: "ArrowLeft",
  ARROW_UP: "ArrowUp",
  ARROW_RIGHT: "ArrowRight",
  ARROW_DOWN: "ArrowDown",
  INSERT: "Insert",
  DELETE: "Delete",
  PRINT_SCREEN: "PrintScreen",
  SCROLL_LOCK: "ScrollLock",
  DIGIT_0: "Digit0",
  DIGIT_1: "Digit1",
  DIGIT_2: "Digit2",
  DIGIT_3: "Digit3",
  DIGIT_4: "Digit4",
  DIGIT_5: "Digit5",
  DIGIT_6: "Digit6",
  DIGIT_7: "Digit7",
  DIGIT_8: "Digit8",
  DIGIT_9: "Digit9",
  KEY_A: "KeyA",
  KEY_B: "KeyB",
  KEY_C: "KeyC",
  KEY_D: "KeyD",
  KEY_E: "KeyE",
  KEY_F: "KeyF",
  KEY_G: "KeyG",
  KEY_H: "KeyH",
  KEY_I: "KeyI",
  KEY_J: "KeyJ",
  KEY_K: "KeyK",
  KEY_L: "KeyL",
  KEY_M: "KeyM",
  KEY_N: "KeyN",
  KEY_O: "KeyO",
  KEY_P: "KeyP",
  KEY_Q: "KeyQ",
  KEY_R: "KeyR",
  KEY_S: "KeyS",
  KEY_T: "KeyT",
  KEY_U: "KeyU",
  KEY_V: "KeyV",
  KEY_W: "KeyW",
  KEY_X: "KeyX",
  KEY_Y: "KeyY",
  KEY_Z: "KeyZ",
  OS_LEFT: "OsLeft",
  OS_RIGHT: "OsRight",
  CONTEXT_MENU: "ContextMenu",
  NUMPAD_0: "Numpad0",
  NUMPAD_1: "Numpad1",
  NUMPAD_2: "Numpad2",
  NUMPAD_3: "Numpad3",
  NUMPAD_4: "Numpad4",
  NUMPAD_5: "Numpad5",
  NUMPAD_6: "Numpad6",
  NUMPAD_7: "Numpad7",
  NUMPAD_8: "Numpad8",
  NUMPAD_9: "Numpad9",
  NUMPAD_MULTIPLY: "NumpadMultiply",
  NUMPAD_ADD: "NumpadAdd",
  NUMPAD_COMMA: "NumpadComma",
  NUMPAD_SUBSTRACT: "NumpadSubstract",
  NUMPAD_DECIMAL: "NumpadDecimal",
  NUMPAD_DIVIDE: "NumpadDivide",
  NUMPAD_ENTER: "NumpadEnter",
  NUMPAD_EQUAL: "NumpadEqual",
  F1: "F1",
  F2: "F2",
  F3: "F3",
  F4: "F4",
  F5: "F5",
  F6: "F6",
  F7: "F7",
  F8: "F8",
  F9: "F9",
  F10: "F10",
  F11: "F11",
  F12: "F12",
  F13: "F13",
  F14: "F14",
  F15: "F15",
  F16: "F16",
  F17: "F17",
  F18: "F18",
  F19: "F19",
  F20: "F20",
  F21: "F21",
  F22: "F22",
  F23: "F23",
  F24: "F24",
  NUM_LOCK: "NumLock",
  SEMI: "Semicolon",
  EQUAL: "Equal",
  COMMA: "Comma",
  MINUS: "Minus",
  PERIOD: "Period",
  INTL_RO: "IntlRo",
  BACK_QUOTE: "Backquote",
  BRACKET_LEFT: "BracketLeft",
  BACK_SLASH: "Backslash",
  BRACKET_RIGHT: "BracketRight",
  SINGLE_QUOTE: "Quote",
  INTL_YEN: "IntlYen",
};

// Previous key state
const mKeyPreviousState: Record<string, boolean> = {};

// The pressed keys
const mIsKeyPressed: Record<string, boolean> = {};

// Click events: once an event is set, it will remain there until polled
const mIsKeyClicked: Record<string, boolean> = {};

// Event handler functions

function onKeyDown(event: KeyboardEvent): void {
  event.preventDefault();
  mIsKeyPressed[event.code] = true;
}

function onKeyUp(event: KeyboardEvent): void {
  event.preventDefault();
  mIsKeyPressed[event.code] = false;
}

function init(): void {
  Object.values(KEYS).forEach((k) => {
    mKeyPreviousState[k] = false;
    mIsKeyPressed[k] = false;
    mIsKeyClicked[k] = false;
  });

  // Register handlers
  window.addEventListener("keyup", onKeyUp);
  window.addEventListener("keydown", onKeyDown);
}

function update(): void {
  Object.values(KEYS).forEach((k) => {
    mIsKeyClicked[k] = !mKeyPreviousState[k] && mIsKeyPressed[k];
    mKeyPreviousState[k] = mIsKeyPressed[k];
  });
}

function isKeyPressed(code: string) {
  return mIsKeyPressed[code];
}

function isKeyClicked(code: string) {
  return mIsKeyClicked[code];
}

export { KEYS, init, update, isKeyClicked, isKeyPressed };
