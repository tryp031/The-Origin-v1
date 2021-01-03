import { notification } from "antd";

export const NOTIFICATION = {
  TYPE: {
    ERROR: "error",
    INFO: "info",
    WARNING: "warning",
    SUCCESS: "success",
  },
  PLACEMENT: "topRight",
};

const openNotification = ({ type, title, message }) => {
  switch (type) {
    case NOTIFICATION.TYPE.ERROR:
      openNotificationError(title, message);
      return;

    case NOTIFICATION.TYPE.INFO:
      openNotificationInfo(title, message);
      return;

    case NOTIFICATION.TYPE.WARNING:
      openNotificationWarning(title, message);
      return;

    case NOTIFICATION.TYPE.SUCCESS:
      openNotificationSuccess(title, message);
      return;
  }
};

const openNotificationInfo = (title, message) => {
  notification.info({
    message: title,
    description: message,
    placement: NOTIFICATION.PLACEMENT,
  });
};

const openNotificationWarning = (title, message) => {
  notification.warning({
    message: title,
    description: message,
    placement: NOTIFICATION.PLACEMENT,
  });
};

const openNotificationError = (title, message) => {
  notification.error({
    message: title,
    description: message,
    placement: NOTIFICATION.PLACEMENT,
  });
};

const openNotificationSuccess = (title, message) => {
  notification.success({
    message: title,
    description: message,
    placement: NOTIFICATION.PLACEMENT,
  });
};

export default openNotification;
