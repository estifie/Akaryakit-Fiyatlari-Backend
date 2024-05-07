# Akaryakıt Fiyatları Backend

## Açıklama

Akaryakıt Fiyatları, Typescript, Nest.js ile yazılmış, kullanıcıların Türkiye'nin bütün şehirlerindeki akaryakıt fiyatlarını görebileceği bir API'dır.

API, Akaryakıt Fiyatları mobil uygulamasında kullanılmak için tasarlanmıştır.

## Kurulum

### Docker ile Kurulum

1. Projeyi kopyalayın.

```bash
git clone https://github.com/axelnt/Akaryakit-Fiyatlari-Backend.git
```

2. Proje dosyasına gidin.

```bash
cd Akaryakit-Fiyatlari-Backend
```

3. .env dosyasını oluşturun.

```bash
cp .env.example .env
```

4. Docker ile projeyi başlatın.

```bash
npm run start:docker:dev
```

5. Tarayıcınızda `http://localhost:3000` adresine gidin.

## Kullanım

API, düzenli olarak akaryakıt fiyatlarını güncellemektedir. Manuel olarak yapmak için aşağıdaki rotalar kullanılabilir.

## Token Oluşturma

Admin kullanıcı adı ve şifresini .env dosyasındaki DEFAULT_USERNAME ve DEFAULT_PASSWORD değerlerinden alabilirsiniz.

`POST` http://localhost:3000/api/v1/auth/login

```json
{
  "username": "admin",
  "password": "admin"
}
```

### Akaryakıt Fiyatlarını Güncelle

istasyonKodu: İstasyon kodu (örneğin: tp, te, sunpet, po, opet vs.)

`POST` http://localhost:3000/api/v1/stations/{istasyonKodu}/migrate
`Authorization` Bearer {token}

### Şehirdeki Akaryakıt Fiyatlarını Listele

şehirId: Şehir id'si

`POST` http://localhost:3000/api/v1/fuel/cities/{şehirId}/
