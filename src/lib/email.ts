import { dbRun, Booking, Service } from "./db";

function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

async function logEmail(
  recipient: string,
  subject: string,
  body: string,
  emailType: string,
  bookingId?: string | null
) {
  await dbRun(
    `INSERT INTO email_log (recipient, subject, body, email_type, booking_id, status)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [recipient, subject, body, emailType, bookingId || null, "sent"]
  );
}

export async function sendBookingConfirmation(booking: Booking, service: Service) {
  const paymentUrl = booking.payment_token
    ? `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/pay/${booking.payment_token}`
    : null;

  const subject = `Booking Confirmed - ${service.name} on ${booking.booking_date}`;
  const body = `Hi ${booking.customer_name},

Thank you for booking with Grill Revival Co.! Your appointment has been confirmed.

Booking Details:
- Booking ID: ${booking.id}
- Service: ${service.name}
- Date: ${booking.booking_date}
- Time: ${booking.booking_time}
- Address: ${booking.customer_address}, ${booking.customer_city}, ${booking.customer_state} ${booking.customer_zip}
- Total: ${formatPrice(booking.total_cents)}

${paymentUrl ? `Pay online: ${paymentUrl}\n` : ""}Payment is collected at the time of service unless paid online in advance.

A technician will be assigned and you'll receive a reminder before your appointment.

If you need to reschedule or cancel, please contact us:
- Email: info@grillrevivalco.com
- Phone: (513) 555-GRILL

Thank you for choosing Grill Revival Co.!`;

  await logEmail(booking.customer_email, subject, body, "booking_confirmation", booking.id);
}

export async function sendBookingReminder(booking: Booking, service: Service) {
  const subject = `Reminder: ${service.name} Tomorrow at ${booking.booking_time}`;
  const body = `Hi ${booking.customer_name},

This is a friendly reminder that your grill cleaning appointment is tomorrow!

Appointment Details:
- Service: ${service.name}
- Date: ${booking.booking_date}
- Time: ${booking.booking_time}
- Address: ${booking.customer_address}, ${booking.customer_city}, ${booking.customer_state} ${booking.customer_zip}

Please ensure your grill is accessible and the area around it is clear.

If you need to reschedule, please contact us as soon as possible:
- Email: info@grillrevivalco.com
- Phone: (513) 555-GRILL

See you tomorrow!
Grill Revival Co.`;

  await logEmail(booking.customer_email, subject, body, "booking_reminder", booking.id);

  await dbRun("UPDATE bookings SET reminder_sent = 1 WHERE id = ?", [booking.id]);
}

export async function sendPaymentConfirmation(booking: Booking, service: Service) {
  const subject = `Payment Received - ${service.name} on ${booking.booking_date}`;
  const body = `Hi ${booking.customer_name},

We've received your payment of ${formatPrice(booking.total_cents)} for your upcoming grill cleaning.

Booking Details:
- Booking ID: ${booking.id}
- Service: ${service.name}
- Date: ${booking.booking_date}
- Time: ${booking.booking_time}
- Amount Paid: ${formatPrice(booking.total_cents)}

You're all set! We'll see you on ${booking.booking_date}.

Thank you,
Grill Revival Co.`;

  await logEmail(booking.customer_email, subject, body, "payment_confirmation", booking.id);
}
