import { PostsFactory, UsersFactory } from '../core/core.module';

export default class CheckUsers {
  /*@ngInject*/
  constructor($localStorage, PostsFactory, UsersFactory) {
    if (!UsersFactory.users) {
      UsersFactory.getUsers();
    } else if ($localStorage.usersGrabDate && ($localStorage.usersGrabDate.valueOf() - Date.now().valueOf()) > (1000 * 60 * 60 * 72)) {
      UsersFactory.getUsers();
    }

    if (!PostsFactory.tags) {
      PostsFactory.getTags();
    } else if ($localStorage.tagsGrabDate && ($localStorage.tagsGrabDate.valueOf() - Date.now().valueOf()) > (1000 * 60 * 60)) {
      PostsFactory.getTags();
    }
  }

  static init($localStorage, PostsFactory, UsersFactory) {
    CheckUsers.instance = new CheckUsers($localStorage, PostsFactory, UsersFactory);
    return CheckUsers.instance;
  }
}
