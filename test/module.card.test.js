import { PropertyCard} from '../module/card.js';
var assert = require('assert');

describe('Module/Card', function() {
  describe('Card', function() {
    it('should create a output html', function() {
      //assert.equal([1,2,3].indexOf(4), -1);
      let testObj = {"address":"test Address"};
      let card  = new PropertyCard(testObj);
      console.log(card.html());

    });
  });
});