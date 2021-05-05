import { adresseIP } from "../variables";

function GenerateQRCode (_hash) {

    const hash = "http://" + adresseIP +":3000/verification-id?" + _hash
    const link = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data="
    const result = link + hash

    return result
}
export default GenerateQRCode;