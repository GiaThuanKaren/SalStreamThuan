import { Messaging } from "firebase-admin/lib/messaging/messaging";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import React from "react";
import { onBackgroundMessage } from "firebase/messaging/sw";
import { firebaseConfig } from "src/utils/lib/firebase";
interface StateUseToken {
  tokenFCM: string;
  messaging: any;
}
function useToken() {
  const [tokenFCM, setTokenFCM] = React.useState<StateUseToken>();
  const HandleMessageIncoming = async function (messageVar: any) {
    try {
      onMessage(messageVar, (payload) => {
        console.log("Message received. 123 ", payload);
        // ...
      });
    } catch (error) {
      throw error;
    }
  };
  React.useEffect(() => {
    const app = initializeApp(firebaseConfig);

    const messaging = getMessaging(app);
    Notification.requestPermission((permission) => {
      if (permission == "granted") {
        getToken(messaging, {
          vapidKey:
            process.env.NEXT_PUBLIC_APIKEY_MESSAGING,
        })
          .then((currentToken) => {
            if (currentToken) {
              console.log("TOKEN", currentToken);
              localStorage.setItem("token_sal_stream", currentToken)
              onMessage(messaging, (payload) => {
                console.log("Message received. 123123 ", payload);
                // ...
              });
              setTokenFCM({
                tokenFCM: currentToken,
                messaging: messaging,
              });
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

  return { tokenFCM, HandleMessageIncoming };
}

export default useToken;
