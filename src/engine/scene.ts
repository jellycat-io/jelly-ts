interface Scene {
  load: () => void;
  unload: () => void;
  init: () => void;
  draw: () => void;
  update: () => void;
}

export default Scene;
