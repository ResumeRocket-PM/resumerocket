import { registerSW } from 'virtual:pwa-register';
import { toast } from 'react-toastify';

const showReloadToast = (updateSW) => {
  toast.info(
    'New version available!',
    {
      onClick: () => {
        updateSW(true);
        window.location.reload();
      },
      closeButton: true,
      closeOnClick: false,
      autoClose: false,
      position: "bottom-right",
    }
  );
};

const showLogoutToast = () => {
  toast.warning(
    'A major update requires you to log out. Please save your work and refresh the page.',
    {
      onClick: () => {
        localStorage.clear();
        window.location.reload();
      },
      closeButton: true,
      closeOnClick: false,
      autoClose: false,
      position: "bottom-right",
    }
  );
};

export const initializePWA = () => {
  const updateSW = registerSW({
    immediate: true,
    async onNeedRefresh() {
      try {
        const response = await fetch('/app-version.json?v=' + Date.now(), {
          cache: 'no-cache'
        });
        const versionData = await response.json();
        if (versionData.update_type === 'major') {
          showLogoutToast();
        } else {
          showReloadToast(updateSW);
        }
      } catch (error) {
        console.error('Error checking for updates:', error);
        showReloadToast(updateSW);
      }
    },
    onOfflineReady() {
      toast.success('App ready for offline use', {
        position: "bottom-right",
        autoClose: 3000
      });
    },
    onRegistered(swRegistration) {
      if (swRegistration) {
        setInterval(() => {
          swRegistration.update();
        }, 60 * 60 * 1000);
      }
    }
  });
  return updateSW;
};