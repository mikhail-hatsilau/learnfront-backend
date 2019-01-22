import { TransformableInfo } from 'logform';

const print = (info: TransformableInfo) => {
    const {
        level,
        message,
        timestamp
    } = info;

    return `${timestamp} ${level}: ${message}`;
};

export default print;
