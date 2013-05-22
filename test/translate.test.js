var should = require('should');
var Translate = require('../model/translate.js');

var translate = new Translate();

describe('Translate', function(){
  describe('#geturl', function(){
    it('パラメータでstring以外を渡すとfalse', function(){
      translate.geturl_([], "en", "ja").should.be.false;
    })
    it('パラメータの文字列長が0だとfalse', function(){
      translate.geturl_("", "en", "ja").should.be.false;
    })
    it('パラメータの文字列長が1000以上だとfalse', function(){
      var str_ = new Array(1002).join("a")
      translate.geturl_(str_, "en", "ja").should.be.false;
    })

    it('"hello"を与えると、"q=hello"を含むURLを返す', function(){
      var str_ = "hello"
      translate.geturl_(str_, "en", "ja").should.match(/^https.+q=hello$/)
    })

    it('"this is a pen"を与えると、"q=this%20is%20a%20pen"とエスケープqueryのURLを返す', function(){
      var str_ = "this is a pen"
      translate.geturl_(str_, "en", "ja").should.match(/^https.+q=this%20is%20a%20pen$/)
    })
  })
})
