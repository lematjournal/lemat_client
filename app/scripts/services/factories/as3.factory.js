import ServerUrl from '../constants.module';

export default class AS3Factory {
  /*@ngInject*/
  constructor($http, $q) {
    this.$http = $http;
    this.$q = $q;
  }

  uploadFile(file, folder) {
    let deferred = this.$q.defer();

    return deferred.promise;
  }

  deleteFile(key) {
    console.log(key);
    let deferred = this.$q.defer();
    return deferred.promise;
  }

  uniqueString() {
    let text = "";
    let possible = "abcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 16; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;

  }
}
