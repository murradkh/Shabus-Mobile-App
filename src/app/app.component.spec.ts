// //first note: we have to test every class (or component) in isolation, to make sure every one is working . during the isolation testing, if we find the class is depending on other class , so we need to mock the dependency (becuse we want in isolation). isolation is better becouse it will make us focusing on specific class(or specific unit).
// import {  TestBed } from '@angular/core/testing';
// import { IonicModule, Platform } from 'ionic-angular';
// import {} from 'jasmine';
// import { StatusBar } from '@ionic-native/status-bar';
// import { SplashScreen } from '@ionic-native/splash-screen';
// import { MyApp } from './app.component';
// import { Geolocation } from '@ionic-native/geolocation';
// import { HttpModule} from '@angular/http';

// import {
//   PlatformMock,
//   StatusBarMock,
//   SplashScreenMock
// } from '../../test-config/mocks-ionic';

// describe('App Component Testing', () => {



//   let fixture;
//   let MyAppComponent;
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [MyApp],
//       imports: [
//         HttpModule,
//         IonicModule.forRoot(MyApp)
//       ],
//       providers: [
//         { provide: StatusBar, useClass: StatusBarMock },
//         { provide: SplashScreen, useClass: SplashScreenMock },
//         { provide: Platform, useClass: PlatformMock },
//         Authunication,
//         Geolocation
//       ]
//     })
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(MyApp);
//     MyAppComponent = fixture.componentInstance;
//   });

//   it('should be created', () => {
//    expect(MyAppComponent instanceof MyApp).toBe(true);
   
//   });
//   it("The Root page is MyDriverLoginPage"),()=>{
//     expect(MyAppComponent.rootPage instanceof MyDriverLoginPage).toBe(true);
//   }
//   it('should have Three pages', () => {
//     expect(MyAppComponent.pages.length).toBe(3);
//   });
// });