importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyAJTIsv8TYTh85gmqPe71fnEwGBizVV3NA",
  authDomain: "salstream-cloud-message.firebaseapp.com",
  projectId: "salstream-cloud-message",
  storageBucket: "salstream-cloud-message.appspot.com",
  messagingSenderId: "932595126454",
  appId: "1:932595126454:web:394b088254eb5ea8ba9617",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
