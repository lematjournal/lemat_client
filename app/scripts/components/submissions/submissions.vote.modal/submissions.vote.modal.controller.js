// export default class SubmissionsVoteModalController {
//   /*@ngInject*/
//   constructor($scope, $rootScope, $uibModalInstance, AuthFactory, SubFactory, submission) {
//     this.$scope = $scope;
//     this.$rootScope = $rootScope;
//     this.$uibModalInstance = $uibModalInstance;
//     this.AuthFactory = AuthFactory;
//     this.SubFactory = SubFactory;
//     this.userId = AuthFactory.session.id;
//     this.comment = {
//       user_id: this.userId,
//       submission_id: submission.id,
//       body: ''
//     };
//     $scope.customMenu = [
//       ['bold', 'italic', 'underline', 'strikethrough', 'subscript', 'superscript'],
//       ['remove-format'],
//       ['ordered-list', 'unordered-list', 'outdent', 'indent'],
//       ['code', 'quote', 'paragraph'],
//       ['link']
//     ];
//   }
//
//   //  AuthFactory.setUser(); <-- todo: move this to router
//
//   setSubmission() {
//     this.master = {};
//     this.submission = submission;
//     angular.copy(this.submission, this.master);
//     this.$scope.index = this.submission.votes_array.length;
//     this.submission.votes_array[this.$scope.index] = {
//       user_id: this.userId,
//       vote: undefined,
//       weight: this.AuthFactory.session.weight
//     };
//   }
//
//   //  setSubmission(); <-- move this to router
//
//   incrementVotes(index) {
//     if (this.currentSubmissions[index].votes_array[this.currentSubmissions[index].length]) {
//       this.currentSubmissions[index].votes.total_votes++;
//     } else if (!this.currentSubmissions[index].votes_array[this.currentSubmissions[index].length]) {
//       this.currentSubmissions[index].votes.total_votes--;
//     }
//   }
//
//   ok() {
//     this.SubFactory.upsertComment(this.comment);
//     this.submission.comments.push(this.comment);
//     this.$uibModalInstance.close(this.submission);
//   }
//
//   cancel() {
//     angular.copy(this.master, this.submission); // resets submission, prevents vote duplication
//     this.$uibModalInstance.dismiss('cancel');
//   }
// }
