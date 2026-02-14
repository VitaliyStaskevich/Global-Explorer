import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CountryService } from './services/country.service';

describe('CountryService', () => {
  let service: CountryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CountryService]
    });

    service = TestBed.inject(CountryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should search countries by name', () => {
    const mockResponse = [{ name: { common: 'Belarus' } }];
    const countryName = 'belarus';

    service.searchByName(countryName).subscribe((countries) => {
      expect(countries.length).toBe(1);
      expect(countries[0].name.common).toEqual('Belarus');
    });

    const req = httpMock.expectOne(`https://restcountries.com/v3.1/name/${countryName}`);
    expect(req.request.method).toBe('GET');
    
    req.flush(mockResponse);
  });

  it('should get country by alpha code', () => {
    const mockResponse = [{ name: { common: 'Belarus' }, cca2: 'BY' }];
    const code = 'BY';

    service.getByCode(code).subscribe((data) => {
      expect(data[0].name.common).toBe('Belarus');
    });

    const req = httpMock.expectOne(`https://restcountries.com/v3.1/alpha/${code}`);
    req.flush(mockResponse);
  });
});
///map component test
import { ComponentFixture } from '@angular/core/testing';
import { WorldMapComponent } from './pages/world-map/world-map.component';
import { Router } from '@angular/router';
import { TUI_DARK_MODE } from '@taiga-ui/core';
import { PLATFORM_ID } from '@angular/core';
import { signal } from '@angular/core';

describe('WorldMapComponent', () => {
  let component: WorldMapComponent;
  let fixture: ComponentFixture<WorldMapComponent>;
  let router: jasmine.SpyObj<Router>;
  
  const darkModeMock = signal(false);
  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [WorldMapComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: TUI_DARK_MODE, useValue: darkModeMock },
        { provide: PLATFORM_ID, useValue: 'browser' }
      ]
    }).compileComponents();

    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture = TestBed.createComponent(WorldMapComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the map on browser platform', () => {
    const initSpy = spyOn(component, 'initMap').and.callThrough();
    
    fixture.detectChanges(); 
    
    expect(initSpy).toHaveBeenCalled();
  });

  it('should dispose the map on destroy', () => {
    fixture.detectChanges();
    const disposeSpy = spyOn((component as any).root, 'dispose');
    
    component.ngOnDestroy();
    
    expect(disposeSpy).toHaveBeenCalled();
  });
});