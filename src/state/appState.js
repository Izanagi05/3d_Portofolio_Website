// State aplikasi terpusat
export const appState = {
  ready: false, // true setelah user menekan tombol "Masuk"
  busy: false, // true saat kamera sedang transisi

  kulkas: {
    open: false, // kamera fokus ke kulkas
    activeProject: null, // key proyek yang sedang tampil (pil1kul..pil6kul)
  },
  tv: {
    open: false,
  },
  arcade: {
    open: false,
  },

  meshes: {
    laykul: null,
    layarTv1: null,
    layararcade1: null,
  },

  spinners: [], // { object, speed }
  interactiveObjects: [],
};
