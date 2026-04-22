import type { RESTCountry } from '../interfaces/rest-countries.interfaces';
import type { Country } from '../interfaces/country.interface';

export class CountryMapper {
  static mapRestItemToCountry(item: RESTCountry): Country {
    return {
      alpha3Code: item.alpha3Code,
      flag: item.flag,
      name: item.name,
      capital: item.capital,
      population: item.population,
    };
  }

  static mapRestItemsToCountryArray(items: RESTCountry[]): Country[] {
    return items.map((restCountry) => CountryMapper.mapRestItemToCountry(restCountry));
  }
}
