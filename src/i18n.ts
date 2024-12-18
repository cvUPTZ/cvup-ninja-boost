import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      fr: {
        common: {
          'hero.cvSent': 'CV envoyés',
          'hero.interviews': 'Entretiens',
          'hero.hired': 'Recrutés',
          'hero.trainings': 'Formations',
          'hero.description': 'Nous aidons les jeunes algériens à décrocher leur emploi idéal grâce à des CV professionnels et une préparation aux entretiens.'
        }
      }
    },
    lng: 'fr',
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;