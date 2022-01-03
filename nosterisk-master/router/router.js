import logger from "../util/logger.js";
import { REGISTER } from "../const/const.js";
import { strParser } from "../util/string.js";
import { REGISTER_200 } from "../util/body.js";

function router(context) {
    try {
        let parser = strParser(context);
        let method = parser.method;

        switch (method) {
            case REGISTER:
                return REGISTER_200(parser);

            default:
                break;
        }
    } catch (err) {}
}

export default router;
