// server/controllers/userController.js
import { Webhook } from 'svix';
import User from '../models/userModel.js';

export const handleWebhook = async (req, res) => {
  try {
    const payloadString = req.body.toString();
    const svixHeaders = req.headers;

    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET_KEY);
    const evt = wh.verify(payloadString, svixHeaders);
    const { id, ...attributes } = evt.data;

    const eventType = evt.type;
    if (eventType === 'user.created') {
      console.log(`User ${id} was ${eventType}`);

      const firstName = attributes.first_name;
      const lastName = attributes.last_name;

      
      const emailAddresses = attributes.email_addresses;
      let email = null;

      if (Array.isArray(emailAddresses) && emailAddresses.length > 0) {
        email = emailAddresses[0].email_address;
      }
     

      const user = new User({
        clerkUserId: id,
        firstName: firstName,
        lastName: lastName,
        email: email,
      });

      await user.save();
      console.log('User saved to database');
    }
    res.status(200).json({
      success: true,
      message: 'Webhook received',
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};
