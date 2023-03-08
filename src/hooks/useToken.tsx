import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import React from "react";
import { firebaseConfig } from "src/utils/lib/firebase";

function useToken() {
  const [tokenFCM, setTokenFCM] = React.useState<string>("");

  React.useEffect(() => {
    const app = initializeApp(firebaseConfig);

    const messaging = getMessaging(app);
    Notification.requestPermission((permission) => {
      if (permission == "granted") {
        getToken(messaging, {
          vapidKey:
            "BG35iwrect5LCXN_jhH549Nz9qWPV5IodLpvQYhtCadE5_Tg2AEJ0wzr7GFz38MXzwvBjZYhEoFmRXRL8cDKW3s",
        })
          .then((currentToken) => {
            if (currentToken) {
              console.log("TOKEN", currentToken);
              alert(currentToken);
              setTokenFCM(currentToken);
              // Send the token to your server and update the UI if necessary
              // ...
            } else {
              // Show permission request UI
              console.log(
                "No registration token available. Request permission to generate one."
              );
              // ...
            }
          })
          .catch((err) => {
            console.log("An error occurred while retrieving token. ", err);
            throw err;
            // ...
          });
      } else {
      }
    });
  }, []);
  return { tokenFCM };
}

export default useToken;
