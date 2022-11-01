import { Injectable } from "@angular/core";
import { LoggingLevel, ConfigService } from './config.model';

@Injectable({
  providedIn: 'root'
})


//a class that logs all the messages to the console, the detail depends of the configuration in the config.json file
//there are 4 possible value: None, Verbose, Info, Warnings, Errors
export class LoggerService {
  private level = LoggingLevel.Warnings;

  constructor(config: ConfigService) {
    if(config.loggingLevel) {
      this.level = config.loggingLevel;
    }
  }


  //function that logs all the messages to the console
  log(message: any, level = LoggingLevel.Warnings, ...optionalParams: any []){
    if(this.shouldLog(level)){
      switch(level) {
        case LoggingLevel.Errors:
            console.error(message, optionalParams);
            break;
        case LoggingLevel.Warnings:
          console.warn(message, optionalParams);
          break;
        case LoggingLevel.Info:
          console.info(message, optionalParams);
          break;
        default:
          console.debug(message, optionalParams);
      }
    }
  }

  logError(message: any, ...optionalParams: any[]):void {
    this.log(message, LoggingLevel.Errors, optionalParams);
  }

  logWarning(message:any, optionalParams: any[]) : void {
    this.log(message, LoggingLevel.Warnings, optionalParams);
  }

  logVerbose(message: any, ...optionalParams: any[]) : void {
    this.log(message, LoggingLevel.Verbose, optionalParams);
  }

  private shouldLog(level: LoggingLevel ){
    if(this.level === LoggingLevel.None){
      return false;
    } else if(this.level === LoggingLevel.Errors){
      return level === LoggingLevel.Errors;
    } else if (this.level === LoggingLevel.Warnings){
      return level === LoggingLevel.Errors || level === LoggingLevel.Warnings;
    } else if(this.level === LoggingLevel.Info) {
      return level === LoggingLevel.Errors || level === LoggingLevel.Warnings || level === LoggingLevel.Info;

    } else {
      return true;
    }
    return true;
  }
}
