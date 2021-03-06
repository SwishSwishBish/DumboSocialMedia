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
                'Sign Up': 'Kay??t Ol',
                'Login': 'Giri?? Yap',
                'Logout': '????k????',
                'Username': 'Kullan??c?? Ad??',
                'Display Name': 'Rumuz',
                'Password': '??ifre',
                'Confirm Password': '??ifreyi Onayla',
                'Password mismatch!': '??ifreler e??le??miyor!',
                ' Unauthorized access!': ' Yetkisiz eri??im!',
                'Users': 'Kullan??c??lar',
                'Search': 'Ara',
                'search by username': 'kullan??c?? ad?? ile sorgula',
                ' Page failed to load!': ' Sayfa y??klenemedi!',
                'User not found!': 'Kullan??c?? bulunamad??!',
                'Change Display Name': 'Rumuzu D??zenle',
                'Edit': 'D??zenle',
                'Delete': 'Hesab?? Sil',
                'Save': 'Kaydet',
                'Cancel': 'Vazge??',
                'My Profile': 'Profilim',
                'Settings': 'Ayarlar',
                'Join us!': 'Bize kat??l!',
                'Name :': '??sim :',
                'Followers': 'Takip??iler',
                'Following': 'Takip Edilenler',
                'Notifications': 'Bildirimler',
                'Make a publication': 'Yay??nda bulun',
                'What are you thinking?': 'Ne d??????n??yorsun?',
                'Share': 'Payla??',
                'There are no posts here!': 'Burada g??nderi bulunmuyor!',
                'Show more posts!': 'Daha fazla g??nderi g??ster!',
                'Like': 'Be??eni',
                'Comment': 'Yorum',
                'There are new posts!': 'Yeni g??nderiler var!',
                'Delete post': 'G??nderiyi Sil',
                'This post will be permanently deleted.': 'Bu g??nderi kal??c?? olarak silinecek.',
                'Are you sure?': 'Emin misin?',
                'Warning!': 'Uyar??!',
                'Your account will be permanently deleted.': 'Hesab??n kal??c?? olarak silinecek.',
                'Delete My Account': 'Hesab??m?? Sil',
                'About Us': 'Hakk??m??zda',
                'Topics': 'G??ndem',
                'DONATE': 'BA??I??',
                'Popular post': 'Pop??ler g??nderi',
                'Tesla and SpaceX CEO Elon Musk shared an animation simulating a manned mission to the planet Mars, which is expected to launch in 2030.': 'Tesla ve SpaceX CEOsu Elon Musk, 2030dan itibaren ba??lat??lmas?? beklenen Mars gezegenine y??nelik insanl?? g??revin sim??le edildi??i bir animasyon payla??t??.',
                'Dumbo is developed with the contributions of the participants. Do you want to support the dumbo?': 'Dumbo, kat??l??mc??lar??n katk??lar??yla geli??tiriliyor. Dumboya destek olmak ister misin?'
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
        ['az ??nce', '??imdi'],
        ['%s saniye ??nce', '%s saniye i??inde'],
        ['1 dakika ??nce', '1 dakika i??inde'],
        ['%s dakika ??nce', '%s dakika i??inde'],
        ['1 saat ??nce', '1 saat i??inde'],
        ['%s saat ??nce', '%s saat i??inde'],
        ['1 g??n ??nce', '1 g??n i??inde'],
        ['%s g??n ??nce', '%s g??n i??inde'],
        ['1 hafta ??nce', '1 hafta i??inde'],
        ['%s hafta ??nce', '%s hafta i??inde'],
        ['1 ay ??nce', '1 ay i??inde'],
        ['%s ay ??nce', '%s ay i??inde'],
        ['1 y??l ??nce', '1 y??l i??inde'],
        ['%s y??l ??nce', '%s y??l i??inde']
    ][index];
};
register('tr', timeageTR);

export default i18n;