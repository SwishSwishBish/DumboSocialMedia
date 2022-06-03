import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { register } from 'timeago.js';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n.use(LanguageDetector).use(initReactI18next).init({
    resources: {
        en: {
            translations: {
                'Sign Up': 'Sign Up',
                'Login': 'Login',
                'Logout': 'Logout',
                'Username': 'Username',
                'Display Name': 'Display Name',
                'Password': 'Password',
                'Confirm Password': 'Confirm Password',
                'Password mismatch!': 'Password mismatch!',
                ' Unauthorized access!': ' Unauthorized access!',
                'Users': 'Users',
                'Search': 'Search',
                'search by username': 'search by username',
                ' Page failed to load!': ' Page failed to load!',
                'User not found!': 'User not found!',
                'Change Display Name': 'Change Display Name',
                'Edit': 'Edit',
                'Delete': 'Delete',
                'Save': 'Save',
                'Cancel': 'Cancel',
                'My Profile': 'My Profile',
                'Settings': 'Settings',
                'Join us!': 'Join us!',
                'Name :': 'Name :',
                'Followers': 'Followers',
                'Following': 'Following',
                'Notifications': 'Notifications',
                'Make a publication': 'Make a publication',
                'What are you thinking?': 'What are you thinking?',
                'Share': 'Share',
                'There are no posts here!': 'There are no posts here!',
                'Show more posts!': 'Show more posts!',
                'Like': 'Like',
                'Comment': 'Comment',
                'There are new posts!': 'There are new posts!',
                'Delete post': 'Delete post',
                'This post will be permanently deleted.': 'This post will be permanently deleted.',
                'Are you sure?': 'Are you sure?',
                'Warning!': 'Warning!',
                'Your account will be permanently deleted.': 'Your account will be permanently deleted.',
                'Delete My Account': 'Delete My Account',
                'About Us': 'About Us',
                'Topics': 'Topics',
                'DONATE': 'DONATE',
                'Popular post': 'Popular post', 'Tesla and SpaceX CEO Elon Musk shared an animation simulating a manned mission to the planet Mars, which is expected to launch in 2030.': 'Tesla and SpaceX CEO Elon Musk shared an animation simulating a manned mission to the planet Mars, which is expected to launch in 2030.',
                'Dumbo is developed with the contributions of the participants. Do you want to support the dumbo?': 'Dumbo is developed with the contributions of the participants. Do you want to support the dumbo?'
            }
        },
        tr: {
            translations: {
                'Sign Up': 'Kayıt Ol',
                'Login': 'Giriş Yap',
                'Logout': 'Çıkış',
                'Username': 'Kullanıcı Adı',
                'Display Name': 'Rumuz',
                'Password': 'Şifre',
                'Confirm Password': 'Şifreyi Onayla',
                'Password mismatch!': 'Şifreler eşleşmiyor!',
                ' Unauthorized access!': ' Yetkisiz erişim!',
                'Users': 'Kullanıcılar',
                'Search': 'Ara',
                'search by username': 'kullanıcı adı ile sorgula',
                ' Page failed to load!': ' Sayfa yüklenemedi!',
                'User not found!': 'Kullanıcı bulunamadı!',
                'Change Display Name': 'Rumuzu Düzenle',
                'Edit': 'Düzenle',
                'Delete': 'Hesabı Sil',
                'Save': 'Kaydet',
                'Cancel': 'Vazgeç',
                'My Profile': 'Profilim',
                'Settings': 'Ayarlar',
                'Join us!': 'Bize katıl!',
                'Name :': 'İsim :',
                'Followers': 'Takipçiler',
                'Following': 'Takip Edilenler',
                'Notifications': 'Bildirimler',
                'Make a publication': 'Yayında bulun',
                'What are you thinking?': 'Ne düşünüyorsun?',
                'Share': 'Paylaş',
                'There are no posts here!': 'Burada gönderi bulunmuyor!',
                'Show more posts!': 'Daha fazla gönderi göster!',
                'Like': 'Beğeni',
                'Comment': 'Yorum',
                'There are new posts!': 'Yeni gönderiler var!',
                'Delete post': 'Gönderiyi Sil',
                'This post will be permanently deleted.': 'Bu gönderi kalıcı olarak silinecek.',
                'Are you sure?': 'Emin misin?',
                'Warning!': 'Uyarı!',
                'Your account will be permanently deleted.': 'Hesabın kalıcı olarak silinecek.',
                'Delete My Account': 'Hesabımı Sil',
                'About Us': 'Hakkımızda',
                'Topics': 'Gündem',
                'DONATE': 'BAĞIŞ',
                'Popular post': 'Popüler gönderi',
                'Tesla and SpaceX CEO Elon Musk shared an animation simulating a manned mission to the planet Mars, which is expected to launch in 2030.': 'Tesla ve SpaceX CEOsu Elon Musk, 2030dan itibaren başlatılması beklenen Mars gezegenine yönelik insanlı görevin simüle edildiği bir animasyon paylaştı.',
                'Dumbo is developed with the contributions of the participants. Do you want to support the dumbo?': 'Dumbo, katılımcıların katkılarıyla geliştiriliyor. Dumboya destek olmak ister misin?'
            }
        }
    },
    fallbackLng: 'en',
    ns: ['translations'],
    defaultNS: 'translations',
    keySeparator: false,
    detection: {
        order: ['queryString', 'cookie'],
        cache: ['cookie']
    },
    interpolation: {
        escapeValue: false,
        formatSeparator: ','
    },
    react: {
        wait: true
    }
});

const timeageTR = (number, index) => {
    return [
        ['az önce', 'şimdi'],
        ['%s saniye önce', '%s saniye içinde'],
        ['1 dakika önce', '1 dakika içinde'],
        ['%s dakika önce', '%s dakika içinde'],
        ['1 saat önce', '1 saat içinde'],
        ['%s saat önce', '%s saat içinde'],
        ['1 gün önce', '1 gün içinde'],
        ['%s gün önce', '%s gün içinde'],
        ['1 hafta önce', '1 hafta içinde'],
        ['%s hafta önce', '%s hafta içinde'],
        ['1 ay önce', '1 ay içinde'],
        ['%s ay önce', '%s ay içinde'],
        ['1 yıl önce', '1 yıl içinde'],
        ['%s yıl önce', '%s yıl içinde']
    ][index];
};
register('tr', timeageTR);

export default i18n;