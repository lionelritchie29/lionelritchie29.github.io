// default: 11.50 | 16.50
// special & project: 16.50 -> hilangin sesi 1
// jumat: 10.50 | 16.50 -> ubah sesi 1
// sabtu: 11.50 | 16.20 -> ubah sesi 2

//data jsonnya bakal diupdate tiap hari utk bagian currenttypenya

let schedules = null; //json object
let sessionOne = null; //date
let sessionTwo = null; //date
const checkedElement = document.getElementById("checkbox");
const minuteTolerated = 5;

function getZero(i) {
  return i < 10 ? "0" + i : i;
}

function startTime(hour, minutes, seconds) {
  document.getElementById("txt").innerHTML =
    getZero(hour) + ":" + getZero(minutes) + ":" + getZero(seconds);
}

function showNotif(title, body, icon, image) {
  // show notification
  const options = {
    body,
    icon: `assets/${icon}.png`,
    image: `assets/${image}.png`,
    tag: "default",
    renotify: true,
  };

  new Notification(title, options);
}

function requestNotificationPermission() {
  //cek browsernya support notif tydac
  if ("Notification" in window) {
    Notification.requestPermission().then((result) => {
      if (result === "denied") {
        console.log("Notification not allowed.");
        return;
      } else if (result === "default") {
        console.log("You did not choose one either");
        return;
      }

      // permission granted
      console.log("Notification granted");
      showNotif(
        "Hello!",
        "Anti Salah Kumpul Bot Initiated.\nHave a great day!",
        "icon",
        ""
      );
    });
  } else {
    console.error("This browser does not support notification.");
  }
}

function fetchSchedule() {
  fetch("./data.json")
    .then((response) => response.json())
    .then((json) => {
      schedules = json;
      console.log(json);
    });
}

function setSession() {
  if (schedules.currentType === "default") {
    sessionOne = new Date(schedules.default.session.one);
    sessionTwo = new Date(schedules.default.session.two);
  } else if (schedules.currentType === "friday") {
    sessionOne = new Date(schedules.friday.session.one);
    sessionTwo = new Date(schedules.friday.session.two);
  } else if (schedules.currentType === "saturday") {
    sessionOne = new Date(schedules.saturday.session.one);
    sessionTwo = new Date(schedules.saturday.session.two);
  } else if (schedules.currentType === "project") {
    sessionTwo = new Date(schedules.project.session.two);
  }
}

//main logic dari notifnya
function setNotif(hour, minutes, seconds) {
  setSession();

  // kondisi : tampilin notif selama satu menit dg interval 10 detik
  const isSessionOne =
    hour == sessionOne.getHours() &&
    seconds % 10 == 0 &&
    minutes == sessionOne.getMinutes() &&
    schedules.currentType !== "project";

  const isSessionTwo =
    hour == sessionTwo.getHours() &&
    minutes == sessionTwo.getMinutes() &&
    seconds % 10 == 0;

  const isSessionOneChecked =
    hour == sessionOne.getHours() &&
    seconds % 10 == 0 &&
    minutes == sessionOne.getMinutes() &&
    schedules.currentType !== "project" &&
    checkedElement.checked === false;

  const isSessionTwoChecked =
    hour == sessionTwo.getHours() &&
    minutes == sessionTwo.getMinutes() + minuteTolerated &&
    seconds % 10 == 0 &&
    checkedElement.checked === false;

  if (isSessionOne) {
    showNotif(
      "Reminder Session One!",
      "Please Upload Your Answer Now!",
      "normalbot",
      "notif-img"
    );
  } else if (isSessionTwo) {
    showNotif(
      "Reminder Session Two!",
      "Please Upload Your Answer Now!",
      "normalbot",
      "notif-img"
    );
  }

  if (isSessionOneChecked) {
    showNotif(
      "Reminder Session One!",
      "You are not checking your uploaded answer yet!\nPlease check it now!",
      "angrybot",
      "last-notif-img"
    );
  } else if (isSessionTwoChecked) {
    showNotif(
      "Reminder Session Two!",
      "You are not checking your uploaded answer yet!\nPlease check it now!",
      "angrybot",
      "last-notif-img"
    );
  }
}

function startLoop() {
  let date = null;
  let hour = null;
  let minutes = null;
  let seconds = null;

  setInterval(() => {
    date = new Date();
    hour = date.getHours();
    minutes = date.getMinutes();
    seconds = date.getSeconds();

    setNotif(hour, minutes, seconds);
    startTime(hour, minutes, seconds);
  }, 1000);
}

function initBot() {
  requestNotificationPermission();
  fetchSchedule();
  startLoop();
}

initBot();

// Test bot
document.getElementById("test-notif-1").onclick = () => {
  showNotif("Hello!", "Anti Salah Kumpul Bot Initated\n", "icon", "");
};

document.getElementById("test-notif-2").onclick = () => {
  showNotif(
    "Reminder Session One!",
    "Please Upload Your Answer Now!",
    "normalbot",
    "notif-img"
  );
};

document.getElementById("test-notif-3").onclick = () => {
  showNotif(
    "Reminder Session Two!",
    "You are not checking your uploaded answer yet!\nPlease check it now!",
    "angrybot",
    "last-notif-img"
  );
};
