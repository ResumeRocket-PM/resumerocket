import { registerSW } from 'virtual:pwa-register';
import { toast } from 'react-toastify';

// Function to show reload toast
const showReloadToast = (updateSW) => {
  toast.info(
    'New version available!',
    {
      onClick: () => {
        updateSW();
      },
      closeButton: true,
      closeOnClick: false,
      autoClose: false,
      position: "bottom-right",
    }
  );
};

// Function to show logout toast
const showLogoutToast = () => {
  toast.warning(
    'A major update requires you to log out. Please save your work and refresh the page.',
    {
      onClick: () => {
        // Clear any auth tokens or user session data
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
        // The fetch will be intercepted by the new service worker
        // which has the new version of app-version.json cached
        const response = await fetch('/app-version.json?v=' + Date.now(), {
          cache: 'no-cache' // Ensure we bypass browser cache
        });
        const versionData = await response.json();
        
        // Check update type and show appropriate toast
        if (versionData.update_type === 'major') {
          showLogoutToast();
        } else {
          showReloadToast(updateSW);
        }
      } catch (error) {
        console.error('Error checking for updates:', error);
        // Show default reload toast if version check fails
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
        // Check for updates every 60 minutes
        setInterval(() => {
          swRegistration.update();
        }, 60 * 60 * 1000);
      }
    }
  });

  return updateSW;
};