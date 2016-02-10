import { Service } from 'a1atscript';
import ServerUrl from '../../constants.module';
import slug from 'slug';
import 'babel-polyfill';

@Service('EntriesFactory', ['$filter', '$http', '$window'])
export default class EntriesFactory {
  constructor($filter, $http, $window) {
    this.$http = $http;
    this.$filter = $filter;
    this.$window = $window;
    this.entries = [];
    this.entry = {};
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

  async getEntry(title) {
    console.log(title);
    try {
      let response = await this.$http.get(ServerUrl + '/news/entries/' + title);
      angular.copy(response.data, this.entry);
    } catch (error) {
      console.error(error);
    }
  }

  resetEntry() {
    angular.copy({}, this.entry);
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
}
