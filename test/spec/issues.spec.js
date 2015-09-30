describe('issues test', function () {
   it('should test the issues page', function () {
      browser.get('http://localhost:9000/#!/issues');
      var issueList = element.all(by.repeater('issue in issues'));

      expect(issueList.count()).toEqual(1);
   });
});