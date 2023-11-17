/* ------------------- Email --------------------- */

/* ------------------- Notification --------------------- */

/* ------------------- OTP --------------------- */

export const GenerateOtp = () => {
  const otp = Math.floor(10000 + Math.random() * 900000);
  let expiry = new Date();
  expiry.setTime(new Date().getTime() + 30 * 60 * 1000);

  return { otp, expiry };
};

export const onRequestOTP = async (otp?: number, toPhoneNumber?: string) => {
  try {
    const accountSid = "AC69351d3b60c9083f563194e784620a77";
    const authToken = "2a68260b77b8444f14e9ffeeb5ae306e";
    const client = require("twilio")(accountSid, authToken);
    const twilioNumber = process.env.TWILIO_FROM_PHONE;
    const response = client.messages.create({
      body: `Your OTP is ${otp}`,
      from: twilioNumber,
      to: "whatsapp:+923075969727",
    });

    return response;
  } catch (error) {
    return false;
  }
};

/* ------------------- Payment --------------------- */
