import nodemailer from 'nodemailer'

export async function POST(req) {
  try {
    const body = await req.json()
    const { name, email, subject, message } = body

    if (!name || !email || !subject || !message) {
      return new Response(JSON.stringify({ message: 'All fields are required' }), { status: 400 })
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    await transporter.sendMail({
      from: `"ZenFlora Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `ZenFlora Contact: ${subject}`,
      html: `
        <h3>New message from ${name}</h3>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
      replyTo: email,
    })

    return new Response(JSON.stringify({ message: 'Email sent successfully' }), { status: 200 })
  } catch (error) {
    console.error('Email send error:', error)
    return new Response(JSON.stringify({ message: 'Failed to send email' }), { status: 500 })
  }
}
