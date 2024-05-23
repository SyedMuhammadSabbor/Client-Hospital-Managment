import { SampleNotifications } from "../../sampleData/sampleNotification";

export const sendNotification = (fromID, toID, fromName, title, message) => {
  SampleNotifications.unshift({
    id: SampleNotifications.length,
    fromId: parseInt(fromID),
    toId: parseInt(toID),
    title: title,
    dated: Date.now(),
    viewedBy: {
      doctor: false,
      admin: false,
      patient: false,
    },
    from: fromName,
    message: message,
  });
  console.log("SampleNotifications: ", SampleNotifications)
};
