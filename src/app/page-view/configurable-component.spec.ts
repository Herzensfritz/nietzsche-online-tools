import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Configuration} from './models';
import { ConfigurableComponent } from './configurable-component';

const conf: Configuration = { '*': { 'success': true }}

class Test extends ConfigurableComponent {
   success: boolean = false;
   configuration: Configuration = conf;

   constructor(){ super() }
   testConfig(){
      this.processConfiguration();
   }
}

describe('ConfigurableComponent', () => {
   it('should create the Object', ()=>{
      expect(new ConfigurableComponent()).toBeTruthy();
   }); 
   it('should have a proper name', ()=>{
      let test = new Test();
      expect(test.getConfigurationName()).toEqual('Test');
   }); 
   it('should process * config', ()=>{
      let test = new Test();
      test.testConfig()
      expect(test.success).toBeTruthy();
   }); 
   it('should update configuration', ()=>{
      let a: Configuration = { 'a': { 'b': true, 'c': false}}
      let b: Configuration = { 'a': { 'b': false}}
      a = ConfigurableComponent.updateConfiguration(a, b)
      expect(a).toEqual({ 'a': { 'b': false, 'c': false}});
      a = { 'a': { 'b': true, 'c': false}}
      b = { 'a': true}
      a = ConfigurableComponent.updateConfiguration(a, b)
      expect(a).toEqual({ 'a': true});
      a = { 'a': { 'b': true, 'c': false}}
      b = { 'a': { 'd': true}}
      a = ConfigurableComponent.updateConfiguration(a, b)
      expect(a).toEqual({ 'a': { 'b': true, 'c': false, 'd': true}});
   }); 

});
