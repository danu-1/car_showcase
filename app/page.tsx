"use client";

import { CarCard, CustomFilter, Hero, SearchBar } from "@/components";
import { fetchCars } from "@/utils";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [allCars, setAllCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fuel, setFuel] = useState("");
  const [year, setYear] = useState("");

  const fuelOptions = ["Gas", "Electric", "Gasoline"];
  const yearOptions = ["2020", "2021", "2022", "2023", "2024"];

  useEffect(() => {
    const getCars = async () => {
      setLoading(true);
      try {
        const result = await fetchCars();
        setAllCars(result);
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setLoading(false);
      }
    };

    getCars();
  }, []);

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;



  return (
      <main className="overflow-hidden">
       <Hero /> 


       <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold"> Car Calogue</h1>
          <p>Explore the cars you might like</p>
        </div>

        <div className="home__filters">
          <SearchBar />

          <div className="home__filter-container">
            <CustomFilter 
              title="Fuel Type" 
              options={fuelOptions}
              selected={fuel}
              setSelected={setFuel}
            />
            <CustomFilter 
              title="Year" 
              options={yearOptions}
              selected={year}
              setSelected={setYear}
            />
          </div>
        </div>

        {loading ? (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">Loading cars...</h2>
          </div>
        ) : !isDataEmpty ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars?.map((car, index) => (
                <CarCard key={index} car={car} />
              ))}
            </div>
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">Oops, no results</h2>
            <p>No cars found matching your criteria.</p>
          </div>
        )}

       </div>
      </main>
  )
}
