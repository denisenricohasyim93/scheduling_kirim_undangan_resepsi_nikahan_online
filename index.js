var cron = require("node-cron");
const nodemailer = require("nodemailer");
const sender_credentials = require("./credentials.json");
const list_undangan = require("./list_undangan.json");

// Tentukan Jadwal Pengiriman Undangan
// Looping Prosedue Kirim E-Mail berdasarkan List Undangan
// Jalankan Script

cron.schedule("*/5 * * * *", () => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: sender_credentials.email_account,
      pass: sender_credentials.password,
    },
  });
  list_undangan.map((item, index) => {
    const mailOptions = {
      from: sender_credentials.email_account,
      to: item,
      subject: `Reminder - Undangan Kehadiran Resepsi Online Pernikahan (Nama Mempelai Pria) & (Nama Mempelai Wanita)`,
      text: `
      Ya Allah, dengan Rahmat dan Ridho-Mu perkenankanlah tautan cinta buah hati kami :
      ${"\n"}
        (Nama Mempelai Wanita)
      ${"\n"}
      Putri ke-2 dari Bpk. (Nama Ayah) & Ibu (Nama Ibu)
      ${"\n"}
      Dengan
      ${"\n"}
        (Nama Mempelai Pria)
      ${"\n"}
      Putra ke-2 dari Bpk. (Nama Ayah) & Ibu (Nama Ibu)
      ${"\n"}
      Akad nikah Insya Allah akan dilaksanakan pada :
      ${"\n"}
      Hari : 25 Juli 2020
      ${"\n"}
      Waktu : 10:00 WIB
      ${"\n"}
      Tempat : Link Zoom (bit.ly/zoom_resepsi_pria_dan_wanita)
      `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      console.log(error);
      console.log(info);
    });
  });

  console.log("running a task every 5 minutes");
});
