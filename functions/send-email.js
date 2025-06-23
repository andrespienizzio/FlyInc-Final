export async function onRequestPost({ request, env }) {
  const body = await request.json();

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Flyance <info@flyance.com.ar>", 
      to: ["info@flyance.com.ar"],          
      subject: `Nuevo mensaje de ${body.name}`,
      html: `
        <h2>Formulario de contacto desde flyance.com.ar</h2>
        <p><strong>Nombre:</strong> ${body.name}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Teléfono:</strong> ${body.phone}</p>
        <p><strong>Mensaje:</strong><br>${body.message}</p>
      `,
    }),
  });

  const data = await response.json();
  return new Response(JSON.stringify(data), { status: response.status });
}
