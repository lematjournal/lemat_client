import { Injectable, Inject } from 'ng-forward';
import ServerUrl from '../../constants.module';
import slug from 'slug';
import 'babel-polyfill';
import 'reflect-metadata';

@Injectable()
@Inject('$filter', '$http')
export default class EntriesFactory {
  constructor($filter, $http) {
    this.$http = $http;
    this.$filter = $filter;
    this.entries = [];
    this.entry = {};
  }

  async delete(id) {
    try {
      await this.$http.delete(ServerUrl + '/news/entries/' + id);
      this.entries.splice(this.findIndexById(id), 1);
    } catch (error) {
      console.error(error);
    }
  }

  findIndexById(id) {
    for (let i = 0; i < this.entry.length; i++) {
      if (this.entry[i].id === id) {
        return i;
      }
    }
  }

  async get(title) {
    try {
      let response = await this.$http.get(ServerUrl + '/news/entries/' + title);
      return angular.copy(response.data, this.entry);
    } catch (error) {
      console.error(error);
    }
  }

  async query() {
    try {
      if (this.entries.length === 0) {
        let response = await this.$http.get(ServerUrl + '/news/entries/');
        angular.copy(response.data, this.entries);
        let latest = this.$filter('orderBy')(response.data, '-created_at')[0];
        angular.copy(latest, this.entry);
        return response.data;
      } else {
        return this.entries;
      }
    } catch (error) {
      console.error(error);
    }
  }

  reset() {
    angular.copy({}, this.entry);
  }

  async upsert(entry) {
    let params = {
      entry: {
        title: entry.title,
        content: entry.content,
        user_id: entry.user_id,
        image_url: entry.image_url,
        title_url: slug(entry.title)
      }
    };
    try {
      if (entry.id) {
        let response = await this.$http.patch(ServerUrl + '/news/entries/' + entry.id, params);
        console.log(response);
      } else {
        let response = await this.$http.post(ServerUrl + '/news/entries/', params);
        console.log(response);
      }
    } catch (error) {
      console.error(error);
    }
  }
}
