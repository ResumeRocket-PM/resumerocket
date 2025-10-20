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
      console.log('🔄 New service worker available!');
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
      console.log('✅ App ready for offline use');
      toast.success('App ready for offline use', {
        position: "bottom-right",
        autoClose: 3000
      });
    },
    onRegistered(swRegistration) {
      console.log('✅ Service worker registered');
      if (swRegistration) {
        // Check for updates every 60 seconds (increased frequency for testing)
        // For production, you might want to increase this to 5-10 minutes
        setInterval(() => {
          console.log('⏰ Checking for updates...');
          swRegistration.update();
        }, 60 * 1000);  // Check every 60 seconds
      }
    },
    onRegisterError(error) {
      console.error('❌ Service worker registration error:', error);
    }
  });
  return updateSW;
};