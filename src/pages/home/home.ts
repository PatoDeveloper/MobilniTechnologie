import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TranslationProvider } from '../../providers/translation/translation';
import { HistoryProvider } from '../../providers/history/history';
import { TextToSpeech } from '@ionic-native/text-to-speech';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public translationResult : string;
  public userInput:string;
  private textToSpech:TextToSpeech;

  constructor(
    public navCtrl: NavController, 
    private translationProvider : TranslationProvider, 
    private historyProvider:HistoryProvider, private textToSpeach:TextToSpeech) {
      this.textToSpech = textToSpeach;
  }

  btnTranslateClicked(userInput:string) : void {
    console.log(userInput);
    this.translationProvider.getTranslation(userInput).subscribe(
      (response)=>{
        this.translationResult = response.responseData.translatedText;
        this.userInput = userInput;
        
        this.historyProvider.saveToStorage(userInput,this.translationResult);
        this.textToSpech.speak(this.translationResult).then(() => console.log('Conplete'));
      }

    );


  }



}
