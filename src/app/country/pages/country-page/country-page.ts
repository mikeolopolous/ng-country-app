import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';

import { CountryService } from './../../services/country';
import { NotFound } from '../../../shared/components/not-found/not-found';
import { CountryInformation } from './country-information/country-information';

@Component({
  selector: 'app-country-page',
  imports: [NotFound, CountryInformation],
  templateUrl: './country-page.html',
})
export class CountryPage {
  // countryCode = toSignal<string>(
  //   inject(ActivatedRoute).params.pipe(map((params) => params['country-code'])),
  // );

  CountryService = inject(CountryService);
  countryCode = inject(ActivatedRoute).snapshot.params['country-code'];

  countryResource = rxResource({
    params: () => ({ code: this.countryCode }),
    stream: ({ params }) => {
      return this.CountryService.searchCountryByAlphaCode(params.code);
    },
  });
}
