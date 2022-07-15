import convertRupiah from "rupiah-format";

const dataTranscation = [
  {
    id: 1,
    users: "Debbyidha Apriyanti",
    imgPayment: "bni.jpg",
    productTitle: "Kami Lintang Terus Saya Apa ?",
    totalPayment: <>{convertRupiah.convert("69000")}</>,
    statusPayment: ["Approve"],
  },
  {
    id: 2,
    users: "Azerino Gatit Subriti",
    imgPayment: "bca.jpg",
    productTitle: "Just You and Me Aku Merasa Bahagia",
    totalPayment: <>{convertRupiah.convert("49200")}</>,
    statusPayment: ["Approve"],
  },
  {
    id: 3,
    users: "Bayu Setyi",
    imgPayment: "permata.jpg",
    productTitle: "RENCANA BESAR Untuk Mati Dengan Tenang",
    totalPayment: <>{convertRupiah.convert("88000")}</>,
    statusPayment: ["Pending"],
  },
  {
    id: 4,
    users: "Ahmad Syarifudin",
    imgPayment: "permata.jpg",
    productTitle: "Ayahku adalah ayahnya juga :')",
    totalPayment: <>{convertRupiah.convert("103800")}</>,
    statusPayment: ["Cancel"],
  },
];

export default dataTranscation;
