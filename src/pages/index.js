import { useState, useEffect } from "react";
import CountriesTable from "../components/CountriesTable/CountriesTable";
import Layout from "../components/Layout/Layout";
import SearchInput from "../components/SearchInput/SearchInput";
import styles from "../styles/Home.module.css";

export default function Home({ countries }) {
  const [keyword, setKeyword] = useState("");
  const [countriesFiltered, setCountriesFiltered] = useState([])

  useEffect(() => {
    const countriesFound = countries?.filter(
      (country) =>
        country.name.common.toLowerCase().includes(keyword) ||
        country.region.toLowerCase().includes(keyword) ||
        country.subregion?.toLowerCase().includes(keyword)
    );

    setCountriesFiltered(countriesFound)
  }, [keyword])
  

  const onInputChange = (e) => {
    e.preventDefault();

    setKeyword(e.target.value.toLowerCase());
  };

  return (
    <Layout>
      <div className={styles.inputContainer}>
        <div className={styles.counts}>Found {countriesFiltered.length} countries</div>

        <div className={styles.input}>
          <SearchInput
            placeholder="Filter by Name, Region or SubRegion"
            onChange={onInputChange}
          />
        </div>
      </div>

      <CountriesTable countries={countriesFiltered} />
    </Layout>
  );
}

export const getStaticProps = async () => {
  const res = await fetch("https://restcountries.com/v3.1/all");

  console.log(res);
  const countries = await res.json();

  return {
    props: {
      countries,
    },
  };
};
