import ServerUrl from '../../services/constants.module';
import slug from 'slug';
import 'babel-polyfill';

export default class EntriesFactory {
  /*@ngInject*/
  constructor($filter, $http, $window) {
    this.$http = $http;
    this.$filter = $filter;
    this.$window = $window;
    this.entries = [];
    this.entry = {};
  }

  resetEntry() {
    angular.copy({}, this.entry);
  }

  getLatestEntry() {
    let entry = this.$filter('orderBy')(this.entries, '-created_at')[0];
    angular.copy(entry, this.entry);
  }

  async getEntries() {
    try {
      let response = await this.$http.get(ServerUrl + '/news/entries/');
      angular.copy(response.data, this.entries);
      let latest = this.$filter('orderBy')(response.data, '-created_at')[0];
      angular.copy(latest, this.entry);
    } catch (error) {
      console.error(error);
    }
  }

  async getEntry(id) {
    try {
      let response = await this.$http.get(ServerUrl + '/news/entries/' + id);
      angular.copy(response.data, this.entry);
    } catch (error) {
      console.error(error);
    }
  }

  upsertEntry(entry) {
    let params = {
      entry: {
        title: entry.title,
        content: entry.content,
        user_id: entry.user_id,
        image_url: entry.image_url,
        title_url: slug(entry.title)
      }
    };

    if (entry.id) {
      return this.$http.patch(ServerUrl + '/news/entries/' + entry.id, params);
    } else {
      return this.$http.post(ServerUrl + '/news/entries/', params).then((response) => {
        this.getEntry(response.data.id);
      });
    }
  }

  async deleteEntry(id) {
    try {
      await this.$http.delete(ServerUrl + '/news/entries/' + id);
      this.entries.splice(this.findEntryIndexById(id), 1);
    } catch (error) {
      console.error(error);
    }
  }

  findEntryIndexById(id) {
    for (let i = 0; i < this.entry.length; i++) {
      if (this.entry[i].id === id) {
        return i;
      }
    }
  }
}
