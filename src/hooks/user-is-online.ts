import { useSyncExternalStore } from "react";

function handleConnectivity(cb: () => void) {
  window.addEventListener("online", cb);
  window.addEventListener("offline", cb);

  return () => {
    window.removeEventListener("online", cb);
    window.removeEventListener("offline", cb);
  };
}

export default function useIsOnline() {
  return useSyncExternalStore(
    handleConnectivity,
    () => navigator.onLine,
    () => true
  );
}
