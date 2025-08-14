// 代码生成时间: 2025-08-15 01:18:38
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'page-hash-calculator',
  templateUrl: 'hash_calculator.html'
})
export class HashCalculatorPage {
  // Input to be hashed
  public inputText: string = '';
  // Hash algorithms available
  public algorithms: string[] = ['SHA-256', 'MD5'];
  // Selected algorithm
  public selectedAlgorithm: string = this.algorithms[0];
  // Resulting hash value
  public hashResult: string = '';

  constructor(public navCtrl: NavController) {}

  // Calculate hash function
  calculateHash() {
    if (!this.inputText) {
      // No input text, show an error message
      alert('Please enter some text to hash.');
      return;
    }

    try {
      // Depending on the selected algorithm, calculate the hash
      if (this.selectedAlgorithm === 'SHA-256') {
        this.hashResult = CryptoJS.SHA256(this.inputText).toString();
      } else if (this.selectedAlgorithm === 'MD5') {
        this.hashResult = CryptoJS.MD5(this.inputText).toString();
      } else {
        // Unknown algorithm, show an error message
        alert('Selected algorithm is not supported.');
        return;
      }
    } catch (error) {
      // Handle any errors that occur during hashing
      alert('An error occurred while hashing: ' + error.message);
    }
  }

  // Change the selected algorithm
  selectAlgorithm(algorithm: string) {
    this.selectedAlgorithm = algorithm;
  }
}
