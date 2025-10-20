import { registerSW } from 'virtual:pwa-register';
import { toast } from 'react-toastify';

// Prevent duplicate toasts
let updateToastShown = false;

const showReloadToast = (updateSW) => {
  if (updateToastShown) {
    console.log('⚠️ Update toast already shown, skipping duplicate');
    return;
  }
  updateToastShown = true;
  
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
      toastId: 'pwa-update', // Prevent duplicate toasts with same ID
    }
  );
};

const showLogoutToast = () => {
  if (updateToastShown) {
    console.log('⚠️ Update toast already shown, skipping duplicate');
    return;
  }
  updateToastShown = true;
  
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
      toastId: 'pwa-major-update', // Prevent duplicate toasts with same ID
    }
  );
};

// Track if PWA has been initialized to prevent double initialization
let pwaInitialized = false;

export const initializePWA = () => {
  // Prevent duplicate initialization (can happen in React StrictMode)
  if (pwaInitialized) {
    console.log('⚠️ PWA already initialized, skipping');
    return;
  }
  pwaInitialized = true;
  
  console.log('🚀 Initializing PWA...');
  
  // Check if service workers are supported
  if (!('serviceWorker' in navigator)) {
    console.warn('⚠️ Service workers are not supported in this browser');
    return;
  }

  try {
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
        console.log('✅ Service worker registered', swRegistration);
        if (swRegistration) {
          // Check for updates every 30 seconds
          setInterval(() => {
            console.log('⏰ Checking for updates...');
            swRegistration.update();
          }, 30 * 1000);
        }
      },
      onRegisterError(error) {
        console.error('❌ Service worker registration error:', error);
      }
    });
    
    console.log('✅ PWA registration complete');
    return updateSW;
  } catch (error) {
    console.error('❌ Error during PWA initialization:', error);
  }
};