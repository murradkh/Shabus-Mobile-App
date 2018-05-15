// import { TestBed, ComponentFixture } from '@angular/core/testing';
// import { IonicModule } from 'ionic-angular';
// import { } from 'jasmine';
// import { MyClientPage } from './my-client';
// import { NavController, AlertController } from 'ionic-angular';
// import { Authunication } from '../../services/service'
// import { LoadingController } from 'ionic-angular';
// import { AlertControllerMock, NavControllerMock, LoadingControllerMock } from 'ionic-mocks';
// import { HttpModule } from '@angular/http';
// import { DebugElement } from "@angular/core";
// import { By } from "@angular/platform-browser";
// // import {  XHRBackend } from '@angular/http';


// describe('MyClientPage Component:', () => {

//   let fixture: ComponentFixture<MyClientPage>;
//   let component: MyClientPage;
//   let el: DebugElement;
//   let authService: Authunication;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [MyClientPage],
//       imports: [
//         HttpModule,
//         IonicModule.forRoot(MyClientPage)
//       ],
//       providers: [
//         { provide: NavController, useClass: NavControllerMock },
//         { provide: LoadingController, useClass: LoadingControllerMock },
//         { provide: AlertController, useClass: AlertControllerMock },
//         //   { provide: XHRBackend, useClass: MockBackend },
//         Authunication
//       ]
//     })


//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(MyClientPage);
//     component = fixture.componentInstance;
//     authService = TestBed.get(Authunication);
//     //   let el: DebugElement; 
//     //   el = fixture.debugElement.query(By.css('ion-icon')); 

//   });

//   it('MyClientPage should be created', () => {
//     expect(component instanceof MyClientPage).toBe(true);
//   });

//   describe('Checking initial values:', () => {
//     it('Client Counter value have to be 1', () => {
//       expect(component.clientCounter).toBe(1);
//       //    component.removeClient();
//       //    component.removeClient();
//       // expect(component.clientCounter).toBe(1);
//     });
//     it('PhoneNumer have to defined', () => {
//       expect(component.phoneNumber).toBeDefined();
//     });
//   });

//   describe('Checking the functions validition:', () => {
//     it("addClient function:Client Counter maximum have to be 5", () => {
//       component.addClient();
//       expect(component.clientCounter).toBe(2);
//       component.clientCounter = 5;
//       component.addClient();
//       expect(component.clientCounter).toBeLessThan(6);
//     });
//     it('removeClient function:Client Counter value have to be minium 1', () => {
//       component.removeClient();
//       component.removeClient();
//       expect(component.clientCounter).toBeGreaterThan(0);
//     });
  
//   });
//   describe("Checking the Template:", () => {

//     it("The title of the page Should be 'זיהוי נוסע'", () => {

//       el = fixture.debugElement.query(By.css('ion-title'));
//       expect(el.nativeElement.textContent.trim()).toBe('זיהוי נוסע');

//     });
//     it("Testing 'Change detection' of the PhoneNumber Input", () => {
//       el = fixture.debugElement.query(By.css('ion-input'));
//       fixture.detectChanges();
//       expect(el.attributes["ng-reflect-model"]).toBe("");
//       component.phoneNumber = "052";
//       fixture.detectChanges();
//       expect(el.attributes["ng-reflect-model"]).toBe("052");
//     });
//     xit("Testing 'Change detection' of the Client Counter", () => {
//       // el = fixture.debugElement.query(By.css('.add'));
//       // console.log(el);
//       // el = fixture.debugElement.query(By.css('ion-icon'));
//       // console.log(el);
//       // el = fixture.debugElement.query(By.css('ion-content'));
//       // console.log(el);
//       // el = fixture.debugElement.query(By.css('[class="add"]'));
//       // console.log(el);
//       // let ionicInputEl = fixture.debugElement.query( By.css( '[formControlName="ionicInputControl"]' ) ).nativeElement;
//       // debugElementArray = fixture.elementRef.nativeElement  getAllByCss(fixture, 'ion-col button');
//       // let ionicInputEl = fixture.debugElement.get( By.css( 'ion-content' ) ).nativeElement;
//       // ionicInputEl.children[0].value = "some value"
//       // component.clientCounter++;
//       // fixture.detectChanges();
//       // console.log(el);
//     });
//     xit("Testing 'Change detection' of the Add button", () => {
//       el = fixture.debugElement.query(By.css("ion-item"));
//       //console.log(el);

//       // expect(component.removeClient).toHaveBeenCalled();

//     });
//     xit("Testing 'Change detection' of the Remove button", () => {

//     });
//     xit("Authincation service 'send' function have to been called when User press on 'הירשם לנסיעה'", () => {
//             el = fixture.debugElement.query(By.css('button'));
//             console.log(el);
//         //  component.send();
//        // expect(authService.send).toHaveBeenCalled();
//       // debugElementArray[0].triggerEventHandler('click', null);

//     });
//   });
// });
