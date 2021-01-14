import { Input, OnChanges } from '@angular/core';
import { Configuration } from './models';
/**
 * This is a super class of components that can be configured by passing
 * a configuration to their inputs and running 'processConfiguration' in 
 * 'ngOnChanges'.
 *
 * E.g. given a configuration '{"ComponentName": { "ComponentProperty": value }}' 
 * if "ComponentName" is the name of the subclass component then
 * 'processConfiguration' will update its property with name
 * "ComponentProperty" to this value. If configuration uses wildcard "*" then
 * all components that have a property with name "ComponentProperty" will
 * update to this value.
 **/
export class ConfigurableComponent implements OnChanges {
   /**
    * the configuration
    **/
   @Input() configuration: Configuration;
   /**
    * index of configuration_listeners pointing to primary name of component
    **/
   private readonly primary_name_index: number = 1;
   /**
    * list of configuration keys 
    **/
   protected configuration_listeners: string[] = [ '*', this.constructor.name ];

   /**
    * Process configuration by updating properties to given values if the keys
    * in configuration_listeners are part of the configuration.
    **/
   protected processConfiguration(){
      this.configuration_listeners.forEach(key =>{
         if (key in this.configuration){
            Object.getOwnPropertyNames(this.configuration[key]).forEach(conf_key =>{
               if (conf_key in this){
                  this[conf_key] = this.configuration[key][conf_key]
               }
            });
         }
      });
   }
   /**
    * Add a further configuration key
    **/
   public addConfigurationName(configuration_listener: string){
      if (this.configuration_listeners.indexOf(configuration_listener) == -1){
         this.configuration_listeners.push(configuration_listener);
      }
   }
   /**
    * Get the primary name of the component.
    **/
   public getConfigurationName(): string {
      return this.configuration_listeners[this.primary_name_index];
   }
  /**
   * update configuration
   **/
  ngOnChanges (){
      if (this.configuration != null){
         this.processConfiguration();
      }
  }
  public static updateConfiguration(oldConfiguration: Configuration, newConfiguration: Configuration): Configuration {
      if (oldConfiguration != null){
         Object.getOwnPropertyNames(newConfiguration).forEach(key =>{
            if (key in oldConfiguration && typeof oldConfiguration[key] == 'object' && typeof newConfiguration[key] == 'object') {
                  oldConfiguration[key] = this.updateConfiguration(oldConfiguration[key], newConfiguration[key]);
            } else {
               oldConfiguration[key] = newConfiguration[key]
            }
         }); return oldConfiguration;
      } else {
         return newConfiguration;
      }
  }
}
