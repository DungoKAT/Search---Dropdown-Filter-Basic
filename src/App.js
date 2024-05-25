import './App.css';
import { useState, useEffect } from 'react'

function App() {
    const [countries, setCountries] = useState([])
    const [countriesFilter, setCountriesFilter] = useState([])

    const [searchWord, setSearchWord] = useState("")
    const [dataFilterSearch] = useState(["name", "region", "capital"])

    const allRegion = ["All regions", "Africa", "Americas", "Antarctic", "Asia", "Oceania", "Europe"]
    const allPopulationRange = ["All range of populations", "< 1,000", ">= 1,000", ">= 10,000", ">= 100,000", ">= 1,000,000", ">= 10,000,000", ">= 100,000,000", ">= 1,000,000,000"]

    const [selectedRegion, setSelectedRegion] = useState("All regions")
    const [selectedPopulation, setSelectedPopulation] = useState("All range of populations")
    const [selectedPopulationNum, setSelectedPopulationNum] = useState([])

    const [page, setPage] = useState(0)
    const [numOfPage, setNumOfPage] = useState([])
    const [numOfCountries, setNumOfCountries] = useState(0)

    // Fetch Data from API
    useEffect(() => {
        fetch("https://restcountries.com/v3.1/all")
            .then(response => response.json())
            .then(data => { 
                setCountries(data)
                setCountriesFilter(data)
            })
            .catch(err => {
                console.log("ERROR: " + err);
            })
    }, [setCountries, setCountriesFilter])

    // Filter Data & Page Break
    useEffect(() => {
        // Filter Dropdown Result
        const countriesDropdownFilterResult = (allRegionBool, allPopulationBool) => {
            const countriesResult = countries.filter((item) => {
                // Check if both are TRUE
                return (allRegionBool && allPopulationBool) ? countries
                // Check if only All RegionBool is TRUE
                : (!allRegionBool && allPopulationBool) ? item.region === selectedRegion
                // Check if only All PopulationBool is TRUE
                : (allRegionBool && !allPopulationBool) ? 
                (selectedPopulationNum[0] === "<") ? 
                item.population < selectedPopulationNum[1] : item.population >= selectedPopulationNum[1]
                // Check if both are FALSE
                : (selectedPopulationNum[0] === "<") ? 
                item.region === selectedRegion && item.population < selectedPopulationNum[1] :
                item.region === selectedRegion && item.population >= selectedPopulationNum[1]
            })
            return countriesResult
        }

        // Filter Dropdown Check
        const dropdownCountries = () => {
            const allRegionCheck = () => { return (selectedRegion === "All regions") ? true : false }
            const allPopulationCheck = () => { return (selectedPopulation === "All range of populations") ? true : false }
            return countriesDropdownFilterResult(allRegionCheck(), allPopulationCheck())
        }

        // Filter Search
        const searchCountries = (countriesFilterDropdown) => {
            return countriesFilterDropdown.filter((item) => {
                return dataFilterSearch.some((filter) => {
                    return (item[filter]) ?
                        (filter === "name") ? item[filter].common.toString().toLowerCase().indexOf(searchWord.toLowerCase()) > -1
                        : (filter === "capital") ? item[filter][0].toString().toLowerCase().indexOf(searchWord.toLowerCase()) > -1
                        : item[filter].toString().toLowerCase().indexOf(searchWord.toLowerCase()) > -1
                        : null
                })
            })
        }
        const searchCountriesResult = searchCountries(dropdownCountries())

        // Page Break
        const pagination = (searchCountriesFilter) => {
            setNumOfCountries(searchCountriesFilter.length)
            const countriesPerPage = 20
            const numOfPage = Math.ceil(searchCountriesFilter.length / countriesPerPage)
            const newCountries = Array.from({length: numOfPage}, (data, index) => {
                const start = index * countriesPerPage
                return searchCountriesFilter.slice(start, start+countriesPerPage)
            })
            setNumOfPage(newCountries)
            return newCountries
        }
        const paginate = pagination(searchCountriesResult)

        // Set All filter data to CountriesFilter
        setCountriesFilter((paginate[page] !== undefined) ? paginate[page] : [])
    }, [countries, selectedRegion, selectedPopulation, selectedPopulationNum, dataFilterSearch, searchWord, page])

    const formatNumber = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    return (
        <div className="container">
            <div className="filter-container">
                <input type="text" className='search-input' placeholder='Search (country, region or capital)' onChange={(e) => setSearchWord(e.target.value)}/>
                <div className="dropdown">
                    <select className='population' 
                        onChange={(e) => {
                            const eventValue = e.target.value
                            if(eventValue !== "All range of populations") {
                                const split = e.target.value.split(" ")
                                const condition = split[0]
                                const selectedNum = parseInt(split[1].replace(/,/gi, ""))
                                setSelectedPopulationNum([condition, selectedNum])
                            }
                            setSelectedPopulation(e.target.value)
                        }} 
                        value={selectedPopulation}
                    >
                        {allPopulationRange.map((item, index) => 
                            <option key={index} value={item}>{item}</option>
                        )}
                    </select>
                    <select className='region' 
                        onChange={(e) => {
                            setSelectedRegion(e.target.value)
                        }}
                        value={selectedRegion}
                    >
                        {allRegion.map((item, index) => 
                            <option key={index} value={item}>{item}</option>
                        )}
                    </select>
                </div>
                <p className="quantity-of-countries">
                    Number of countries : {numOfCountries}
                </p>
            </div>
            <ul className='row'>
                {countriesFilter.map((item, index) => 
                    <li key={index}>
                        <div className="card">
                            <div className="card-title">
                                <img src={item.flags.png} alt={item.flags.alt} />
                            </div>
                            <div className="card-body">
                                <div className="card-description">
                                    <h2>{item.name.common}</h2>
                                    <ol className='card-list'>
                                        <li>Population(s) : <span>{formatNumber(item.population)}</span></li>
                                        <li>Region : <span>{item.region}</span></li>
                                        <li>Capital : <span>{item.capital}</span></li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </li>
                )}
            </ul>
            <div className="pagination-container">
                {numOfPage.map((data, index) => 
                    <button key={index} className={(page === index) ? "active" : null} onClick={() => setPage(index)}>{index+1}</button>
                )}
            </div>
        </div>
    );
}

export default App;