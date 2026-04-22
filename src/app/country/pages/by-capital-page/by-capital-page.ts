import { Component, inject, signal } from '@angular/core';
import { SearchInput } from '../../components/country-search-input/search-input';
import { CountryList } from '../../components/country-list/country-list';
import { CountryService } from '../../services/country';

import type { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInput, CountryList],
  templateUrl: './by-capital-page.html',
})
export class ByCapitalPage {
  countryService = inject(CountryService);

  isLoading = signal(false);
  isError = signal<string | null>(null);
  countries = signal<Country[]>([]);

  onSearch(value: string) {
    if (this.isLoading()) return;

    this.isLoading.set(true);
    this.isError.set(null);

    this.countryService.searchByCapital(value).subscribe((country) => {
      this.isLoading.set(false);
      this.countries.set(country);

      console.log(country);
    });
  }
}
