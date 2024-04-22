import { React, useState, createContext, useContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import fr from '../assets/svg/flags/fr.svg'
import en from '../assets/svg/flags/gb.svg'
import de from '../assets/svg/flags/de.svg'
import es from '../assets/svg/flags/es.svg'
import it from '../assets/svg/flags/it.svg'
import pt from '../assets/svg/flags/pt.svg'
import ru from '../assets/svg/flags/ru.svg'
import lv from '../assets/svg/flags/lv.svg'

const LanguageContext = createContext();

export const useLanguages = () => {
  return useContext(LanguageContext);
};

export const LanguageProvider = ({ children }) => {

  const languages = [
    {
      code: 'en',
      name: 'English',
      country_code: 'us',
      flag: en
    },
    {
      code: 'lv',
      name: 'Latviešu',
      country_code: 'lv',
      flag: lv
    },
  ];

  const learningLanguages = [
    {
        code: 'en',
        name: 'english',
        country_code: 'us',
        flag: en
    },
    {
      code: 'lv',
      name: 'latviešu',
      country_code: 'lv',
      flag: lv
    },
    {
        code: 'fr',
        name: 'français',
        country_code: 'fr',
        flag: fr
    },
    {
        code: 'de',
        name: 'deutsch',
        country_code: 'de',
        flag: de
    },
    {
        code: 'es',
        name: 'español',
        country_code: 'es',
        flag: es
    },
    {
        code: 'it',
        name: 'italiano',
        country_code: 'it',
        flag: it
    },
    {
        code: 'pt',
        name: 'português',
        country_code: 'pt',
        flag: pt
    },
    {
        code: 'ru',
        name: 'pусский',
        country_code: 'ru',
        flag: ru
    },
  ]

  const { i18n } = useTranslation();

  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedLanguageObject, setSelectedLanguageObject] = useState(languages[0]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setSelectedLanguage(lng);
    setSelectedLanguageObject(languages.find((language) => language.code === lng));
    localStorage.setItem('selectedLanguage', lng);
  };

  useEffect(() => {
    const localLanguage = localStorage.getItem('selectedLanguage');
    if (localLanguage) {
      setSelectedLanguage(selectedLanguage);
      setSelectedLanguageObject(languages.find((language) => language.code === selectedLanguage));
      changeLanguage(localLanguage);
    }
  }, []);

  const value = {
    languages,
    selectedLanguage,
    learningLanguages,
    selectedLanguageObject,
    setSelectedLanguage,
    changeLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
