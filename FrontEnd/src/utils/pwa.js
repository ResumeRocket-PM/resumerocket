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
    '🚀 New version available! Click here to update.',
    {
      onClick: () => {
        console.log('🔄 User clicked update toast');
        toast.dismiss('pwa-update');
        
        // Mark that user initiated the update
        userInitiatedUpdate = true;
        
        // Tell the waiting service worker to skip waiting and activate
        // The controllerchange event will handle the reload
        updateSW(true);
      },
      closeButton: true,
      closeOnClick: false,
      autoClose: false, // Toast stays until user interacts
      position: "top-center",
      toastId: 'pwa-update',
      className: 'pwa-update-toast',
      style: {
        background: '#4CAF50',
        color: 'white',
        fontSize: '16px',
        fontWeight: 'bold',
        padding: '16px 24px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        cursor: 'pointer',
        minWidth: '320px',
        textAlign: 'center'
      },
      progressStyle: {
        background: 'rgba(255,255,255,0.7)'
      }
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
    '⚠️ Major update available! Please save your work and click here to update. You will be logged out.',
    {
      onClick: () => {
        console.log('🔄 User clicked major update toast');
        toast.dismiss('pwa-major-update');
        
        // Mark that user initiated the update
        userInitiatedUpdate = true;
        
        localStorage.clear();
        window.location.reload();
      },
      closeButton: true,
      closeOnClick: false,
      autoClose: false, // Toast stays until user interacts
      position: "top-center",
      toastId: 'pwa-major-update',
      className: 'pwa-major-update-toast',
      style: {
        background: '#FF9800',
        color: 'white',
        fontSize: '16px',
        fontWeight: 'bold',
        padding: '16px 24px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        cursor: 'pointer',
        minWidth: '400px',
        textAlign: 'center'
      },
      progressStyle: {
        background: 'rgba(255,255,255,0.7)'
      }
    }
  );
};

// Track if PWA has been initialized to prevent double initialization
let pwaInitialized = false;
// Track if user has initiated the update
let userInitiatedUpdate = false;

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

  // Listen for when a new service worker takes control
  // Only reload if the user clicked the update button
  let refreshing = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (refreshing) return;
    if (!userInitiatedUpdate) {
      console.log('⚠️ Service worker changed but user did not initiate update, skipping reload');
      return;
    }
    console.log('🔄 New service worker took control, refreshing page...');
    refreshing = true;
    window.location.reload();
  });

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