interface Scene {
  load: () => void;
  init: () => void;
  draw: () => void;
  update: () => void;
}

export default Scene;
