// LanguageSwitcher.js
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import axios from 'axios';

const LanguageSwitcher = ({ className }) => {
  const { i18n } = useTranslation();
  const languageFlags = {
    es: 'https://flagcdn.com/es.svg',
    en: 'https://flagcdn.com/gb.svg',
    fr: 'https://flagcdn.com/fr.svg',
    it: 'https://flagcdn.com/it.svg',
    ind: 'https://flagcdn.com/id.svg'
  };

  useEffect(() => {
    const fetchFlags = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v2/all');
        const countries = response.data;
        countries.forEach(country => {
          if (Object.keys(languageFlags).includes(country.languages[0]?.iso639_1.toLowerCase()) && country.flags?.svg) {
          }
        });
      } catch (error) {
        console.error('Error fetching flags:', error);
      }
    };
    fetchFlags();
  }, []);

  const changeLanguage = (language) => {
    i18n.changeLanguage(language.value);
  };

  const languageOptions = Object.keys(languageFlags).map((languageCode) => ({
    value: languageCode,
    label: (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={languageFlags[languageCode]} alt={languageCode} className="mr-1" style={{ height: '20px', width: '20px', borderRadius: '50%' }} />
        {languageCode.toUpperCase()}
      </div>
    ),
  }));

  return (
    <div className={`absolute top-4 left-4 ${className}`}>
      <Select
        id="language"
        onChange={changeLanguage}
        options={languageOptions}
        defaultValue={languageOptions.find(option => option.value === i18n.language)}
        styles={{
          control: provided => ({
            ...provided,
            backgroundColor: 'transparent', // Fondo transparente
            width: '110px', // Ancho ajustado
          }),
          menu: provided => ({
            ...provided,
            width: '110px', // Ancho ajustado
            backgroundColor: 'transparent', // Fondo transparente
          }),
          option: provided => ({
            ...provided,
            color: 'white', // Color del texto blanco
          }),
          singleValue: provided => ({
            ...provided,
            color: 'white', // Color del texto blanco para el Select cerrado
          }),
        }}
      />
    </div>
  );
};

export default LanguageSwitcher;
