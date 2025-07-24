# Indra Analyzer

## 🎯 Amaç

Bu proje, hem Windows hem de Linux işletim sistemlerinde çalışan, terminal tabanlı gelişmiş bir işlem analiz aracıdır. Kullanıcılara belirli bir sürecin bellek ve CPU kullanımı, başlatılma zamanı ve çalıştırılabilir yolu gibi temel bilgilerini sağlamanın yanı sıra, sürecin sembol tablosunu (symbol table) analiz etme yeteneği sunar. Uygulama, çoklu dil desteği, kullanıcı dostu menü tabanlı arayüz ve rapor dışa aktarma gibi profesyonel özelliklerle donatılmıştır.

## ⚙️ Kurulum

Process Analyzer'ı yerel sisteminizde çalıştırmak için aşağıdaki adımları izleyin:

1.  **Depoyu Klonlayın:**

    ```bash
    git clone https://github.com/your-username/process-analyzer.git
    cd process-analyzer
    ```

2.  **Bağımlılıkları Yükleyin:**

    Proje, Node.js ve npm kullanılarak geliştirilmiştir. Gerekli tüm bağımlılıkları yüklemek için aşağıdaki komutu çalıştırın:

    ```bash
    npm install
    ```

    Bu komut, `inquirer`, `figlet`, `chalk`, `pidusage`, `i18n` gibi kütüphaneleri ve `child_process` gibi Node.js yerleşik modüllerini kuracaktır.

## 🖥️ Kullanım

Uygulamayı başlatmak için proje dizininde aşağıdaki komutu çalıştırın:

```bash
npm start
```

Uygulama başlatıldığında, öncelikle büyük bir ASCII art logosu ile karşılanacak ve ardından dil seçeneği sunulacaktır (Türkçe/İngilizce). Dil seçimi yapıldıktan sonra ana menüye yönlendirileceksiniz. Ana menüden aşağıdaki işlemleri gerçekleştirebilirsiniz:

*   **İşlem Detayları:** Belirli bir PID'ye (Process ID) ait bellek ve CPU kullanımı, başlatılma zamanı ve çalıştırılabilir yol gibi bilgileri görüntüler.
*   **Sembol Analizi:** Belirli bir PID'ye ait çalıştırılabilir dosyanın sembol tablosunu analiz eder ve ilk 20 sembolü gösterir. İsteğe bağlı olarak tüm sembolleri bir dosyaya aktarabilirsiniz.
*   **Raporu Dışa Aktar:** Analiz edilen tüm işlem bilgilerini (detaylar ve semboller) zaman damgalı bir `.txt` dosyası olarak `export/` dizinine kaydeder.
*   **Dili Değiştir:** Uygulamanın dilini Türkçe veya İngilizce arasında değiştirmenizi sağlar.
*   **Çıkış:** Uygulamadan çıkar.

## 🧩 Özellikler

*   **Terminal Arayüzü (Menülü):** Kullanıcı dostu, menü tabanlı etkileşimli terminal arayüzü.
*   **ASCII Art Logos:** Uygulama başlangıcında etkileyici bir ASCII art logosu gösterimi.
*   **Çoklu Dil Desteği (i18n):** Türkçe ve İngilizce dil desteği ile kolayca dil değiştirme imkanı. Tüm metinler `lang/tr.json` ve `lang/en.json` dosyalarından yönetilir.
*   **Kapsamlı İşlem İncelemesi:** PID'ye göre bellek kullanımı (MB), CPU kullanımı (%), başlatılma zamanı ve çalıştırılabilir yol gibi detaylı işlem bilgileri.
*   **Platforma Duyarlı Sembol Analizi:** Windows için `dumpbin` (veya benzeri) ve Linux için `nm` veya `objdump` komutları kullanılarak platforma özel sembol tablosu analizi. İlk 20 sembolün gösterimi ve tüm sembollerin dışa aktarımı.
*   **Çıktı Dışa Aktarımı:** Tüm analiz raporlarını ve sembol listelerini zaman damgalı `.txt` dosyaları olarak `export/` dizinine kaydetme yeteneği.
*   **Modüler Dosya Yapısı:** Kolay bakım ve genişletilebilirlik için iyi organize edilmiş, modüler kod tabanı.
*   **Gerekli Kütüphaneler:** `inquirer` (menüler için), `figlet` (ASCII art için), `chalk` (renkli çıktı için), `pidusage` (RAM & CPU analizi için), `i18n` (çoklu dil desteği için) ve `child_process` (sistem komutlarını çalıştırmak için).
*   **Otomatik Platform Algılama:** Uygulamanın çalıştığı işletim sistemini otomatik olarak algılayarak uygun sembol analiz araçlarını kullanır.

## 📸 Ekran Görüntüleri

### Uygulama Başlangıcı ve Dil Seçimi

```
  
██▓ ███▄ █ ▓█████▄ ██▀███ ▄▄▄ ▄▄▄ ███▄ █ ▄▄▄ ██▓ ▓██ ██▓▒███████▒▓█████ ██▀███ ▓██▒ ██ ▀█ █ ▒██▀ ██▌▓██ ▒ ██▒▒████▄ ▒████▄ ██ ▀█ █ ▒████▄ ▓██▒ ▒██ ██▒▒ ▒ ▒ ▄▀░▓█ ▀ ▓██ ▒ ██▒ ▒██▒▓██ ▀█ ██▒░██ █▌▓██ ░▄█ ▒▒██ ▀█▄ ▒██ ▀█▄ ▓██ ▀█ ██▒▒██ ▀█▄ ▒██░ ▒██ ██░░ ▒ ▄▀▒░ ▒███ ▓██ ░▄█ ▒ ░██░▓██▒ ▐▌██▒░▓█▄ ▌▒██▀▀█▄ ░██▄▄▄▄██ ░██▄▄▄▄██ ▓██▒ ▐▌██▒░██▄▄▄▄██ ▒██░ ░ ▐██▓░ ▄▀▒ ░▒▓█ ▄ ▒██▀▀█▄ ░██░▒██░ ▓██░░▒████▓ ░██▓ ▒██▒ ▓█ ▓██▒ ▓█ ▓██▒▒██░ ▓██░ ▓█ ▓██▒░██████▒ ░ ██▒▓░▒███████▒░▒████▒░██▓ ▒██▒ ░▓ ░ ▒░ ▒ ▒ ▒▒▓ ▒ ░ ▒▓ ░▒▓░ ▒▒ ▓▒█░ ▒▒ ▓▒█░░ ▒░ ▒ ▒ ▒▒ ▓▒█░░ ▒░▓ ░ ██▒▒▒ ░▒▒ ▓░▒░▒░░ ▒░ ░░ ▒▓ ░▒▓░ ▒ ░░ ░░ ░ ▒░ ░ ▒ ▒ ░▒ ░ ▒░ ▒ ▒▒ ░ ▒ ▒▒ ░░ ░░ ░ ▒░ ▒ ▒▒ ░░ ░ ▒ ░▓██ ░▒░ ░░▒ ▒ ░ ▒ ░ ░ ░ ░▒ ░ ▒░ ▒ ░ ░ ░ ░ ░ ░ ░ ░░ ░ ░ ▒ ░ ▒ ░ ░ ░ ░ ▒ ░ ░ ▒ ▒ ░░ ░ ░ ░ ░ ░ ░ ░░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ 



? Please select a language / Lütfen bir dil seçin: (Use arrow keys)
â€º English 
  Türkçe 
```

### Ana Menü

```
  
██▓ ███▄ █ ▓█████▄ ██▀███ ▄▄▄ ▄▄▄ ███▄ █ ▄▄▄ ██▓ ▓██ ██▓▒███████▒▓█████ ██▀███ ▓██▒ ██ ▀█ █ ▒██▀ ██▌▓██ ▒ ██▒▒████▄ ▒████▄ ██ ▀█ █ ▒████▄ ▓██▒ ▒██ ██▒▒ ▒ ▒ ▄▀░▓█ ▀ ▓██ ▒ ██▒ ▒██▒▓██ ▀█ ██▒░██ █▌▓██ ░▄█ ▒▒██ ▀█▄ ▒██ ▀█▄ ▓██ ▀█ ██▒▒██ ▀█▄ ▒██░ ▒██ ██░░ ▒ ▄▀▒░ ▒███ ▓██ ░▄█ ▒ ░██░▓██▒ ▐▌██▒░▓█▄ ▌▒██▀▀█▄ ░██▄▄▄▄██ ░██▄▄▄▄██ ▓██▒ ▐▌██▒░██▄▄▄▄██ ▒██░ ░ ▐██▓░ ▄▀▒ ░▒▓█ ▄ ▒██▀▀█▄ ░██░▒██░ ▓██░░▒████▓ ░██▓ ▒██▒ ▓█ ▓██▒ ▓█ ▓██▒▒██░ ▓██░ ▓█ ▓██▒░██████▒ ░ ██▒▓░▒███████▒░▒████▒░██▓ ▒██▒ ░▓ ░ ▒░ ▒ ▒ ▒▒▓ ▒ ░ ▒▓ ░▒▓░ ▒▒ ▓▒█░ ▒▒ ▓▒█░░ ▒░ ▒ ▒ ▒▒ ▓▒█░░ ▒░▓ ░ ██▒▒▒ ░▒▒ ▓░▒░▒░░ ▒░ ░░ ▒▓ ░▒▓░ ▒ ░░ ░░ ░ ▒░ ░ ▒ ▒ ░▒ ░ ▒░ ▒ ▒▒ ░ ▒ ▒▒ ░░ ░░ ░ ▒░ ▒ ▒▒ ░░ ░ ▒ ░▓██ ░▒░ ░░▒ ▒ ░ ▒ ░ ░ ░ ░▒ ░ ▒░ ▒ ░ ░ ░ ░ ░ ░ ░ ░░ ░ ░ ▒ ░ ▒ ░ ░ ░ ░ ▒ ░ ░ ▒ ▒ ░░ ░ ░ ░ ░ ░ ░ ░░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ 


  

Ana Menü
────────────────────────────────────────
? Lütfen bir eylem seçin: (Use arrow keys)
â€º âœ— Ä°ÅŸlem DetaylarÄ± 
  âš¡ Sembol Analizi 
  âœ° Raporu DÄ±ÅŸa Aktar 
  âš¡ Dili DeÄŸiÅŸtir 
  âœ– ÇÄ±kÄ±ÅŸ 
```

### İşlem Detayları Örneği

```
? Lütfen bir PID girin: 12345

Ä°ÅŸlem DetaylarÄ±:
--------------------
Bellek KullanÄ±mÄ±: 60.54 MB
CPU KullanÄ±mÄ±: 0.00%
BaÅŸlatÄ±lma ZamanÄ±: 12/31/1969, 7:00:42 PM
ÇalÄ±ÅŸtÄ±rÄ±labilir Yol: /home/ubuntu/.nvm/versions/node/v22.13.0/bin/node
? Devam etmek için herhangi bir tuÅŸa basÄ±n... 
```

## 🔧 Geliştirici Notları

*   **Platform Uyumluluğu:** Uygulama, hem Windows hem de Linux ortamlarında sorunsuz çalışacak şekilde tasarlanmıştır. Sembol analizi için platforma özgü komutlar (`dumpbin` ve `nm`/`objdump`) kullanılır.
*   **Hata Yönetimi:** Kullanıcı girişi doğrulaması ve sistem komutlarının yürütülmesi sırasında oluşabilecek hatalar için kapsamlı hata yönetimi uygulanmıştır.
*   **Genişletilebilirlik:** Modüler yapı sayesinde yeni analiz özellikleri veya dışa aktarma formatları kolayca eklenebilir.

## 📄 Lisans

Bu proje MIT Lisansı altında lisanslanmıştır. Daha fazla bilgi için `LICENSE` dosyasına bakın. 

