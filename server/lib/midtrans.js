import midtransClient from "midtrans-client";
const { CoreApi } = midtransClient;

let coreApi = new CoreApi({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

export default coreApi;
