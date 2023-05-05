import { notification } from 'antd';
import { ArgsProps } from "antd/es/notification/interface";

export const AntdNotification = {
    open: (options: ArgsProps): void => {
        notification.open(options);
    },
    success: (options: ArgsProps): void => {
        notification.success(options);
    },
    error: (options: ArgsProps): void => {
        notification.error(options);
    },
    info: (options: ArgsProps): void => {
        notification.info(options);
    },
    warning: (options: ArgsProps): void => {
        notification.warning(options);
    },
};
