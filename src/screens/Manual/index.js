import { Container, Title, Break, Paragraph } from "./styles";
import { ScrollView } from "react-native";

const Manual = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Container>
        <Title>Foydalanish shartlari</Title>
        <Break>1.0</Break>
        <Paragraph>
          Ushbu operatorlar uchun mo'ljallangan dastur tizim egalarining shaxsiy
          mulki hisoblanadi va faqatgina ular tomonidan taqdim etilgan
          shahslargagina foydalanishga ruhsat etiladi.
        </Paragraph>
        <Break>1.1</Break>
        <Paragraph>
          Ushbu ilovani tizim egalarining ruhsatisiz ulashish, ular tomonidan
          yaratilgan va uchunchi shahsga {"(Operatorga)"} foydalanish uchun
          topshirilgan profil malumotlarini {"(Login, Parol)"} o'z boshimchalik
          bilan tizimga aloqador bo'lmagan begona shahslarga{" "}
          {"(Operator bo'lmagan)"} berish yoki qastdan tarqatish qonuniy
          javobgarlikka tortilishga sabab bo'ladi.
        </Paragraph>
        <Break>2.0</Break>
        <Paragraph>
          Dastur foydalanuchisi {"(Operator)"} buyurtmani qabul qilgandan so'ng
          1 soat {"(60 daqiqa)"}
          ichida mijoz bilan bog'lanmasa buyurtma boshqa operatorga topshiriladi
          va operator hisobidan 1000 so'm miqdoridagi pul mablag'i jarima
          sifatida avftomatik ravishda yechib olinadi. Ushbu holat qayta
          takrorlanganda operator profili tizim tomonidan bloklanadi. Operator
          hisobini qayta faollashtirish tizim adminlari tomonidan ko'rib
          chiqiladi.
        </Paragraph>
        <Break>2.1</Break>
        <Paragraph>
          Har qanday noqonuniy va shubxali holatlar vujudga kelganda tizim
          admini operator hisobini bloklaydi va uning mablag'lari to'lab
          berilmaydi.
        </Paragraph>
        <Break>3.0</Break>
        <Paragraph>
          Operator qabul qilgan barcha buyurtmalarning nazoratiga to'g'ridan
          to'g'ri masuldir. Jumladan: mijoz bilan bo'glanish, buyurtma
          holatining doimiy nazorati va holatni o'z vaqtida belgilash.
        </Paragraph>
        <Break />
        <Paragraph style={{ marginBottom: 40, color: "#000" }}>
          Tizim bilan muammo kelib chiqqan holda tizim taminotchilari bilan
          bo'laning. +998976382481
        </Paragraph>
      </Container>
    </ScrollView>
  );
};

export default Manual;
