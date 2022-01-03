import { NEWLINE } from "../const/const.js";

export const byte2str = (chunk) => {
    return String(chunk, "utf8");
};

export const strParser = (str) => {
    let obj = {};
    let lines = str.split(NEWLINE);

    for (const idx in lines) {
        let context = lines[idx];
        let slicepostion = context.indexOf(":");
        let key = context.slice(0, slicepostion);
        let value = context.slice(slicepostion + 2);

        if (idx == 0) {
            obj.method = key.split(" ")[0];
        } else {
            obj[key] = value;
        }
    }

    return obj;
};
