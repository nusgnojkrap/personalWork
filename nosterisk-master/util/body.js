import { NEWLINE } from "../const/const.js";

export const REGISTER_200 = (obj) => {
    let body = new String();
    body += "SIP/2.0 200 OK" + NEWLINE;
    body += "Via: " + obj.Via + NEWLINE;
    body += "To: " + obj.To + " tag=65f78439" + NEWLINE;
    body += "From: " + obj.From + NEWLINE;
    body += "Call-ID: " + obj["Call-ID"] + NEWLINE;
    body += "CSeq: " + obj.CSeq + NEWLINE;
    body += "Server: Nosterisk " + NEWLINE;
    body += "Allow: " + obj.Allow + NEWLINE;
    body += "Supported: " + obj.Supported + NEWLINE;
    body += "Expires : " + obj.Expires + NEWLINE;
    body += "Content-Length: 0" + NEWLINE;

    body += NEWLINE;
    body += NEWLINE;
    return body;
};
