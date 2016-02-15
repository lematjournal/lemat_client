import { Component } from 'ng-forward';
import { providers, TestComponentBuilder } from 'ng-forward/testing';
import { AdminModalComponent } from '../app/scripts/components/admin/admin.modal/admin.modal.component';
import sinon from 'sinon';
import 'reflect-metadata';

let mockUsersData = [{
  bio: 'some kind of twit',
  entries: [],
  email: [],
  id: 1,
  images: [],
  pieces: [],
  role: 'editor',
  username: 'twit',
  wieght: 1
}];

let mockObjectData = [{
  title: 'mallawalawaa',
  content: '<p>theory bullshit and a half</p>',
  user: mockUsersData[0],
  tags: mockTagsData,
  created_at: Date.now(),
  updated_at: Date.now()
}];

let mockTagsData = ['sup', 'arse'];

let usersQuerySpy = sinon.stub().returns(mockUsersData);
let tagsQuerySpy = sinon.stub().returns(mockTagsData);
let objectQuerySpy = sinon.stub().returns(mockObjectData);

@Component({
  selector: 'test-cmp',
  template: '<div></div>'
})
class Test {}

describe('AdminModalComponent', () => {
  let component, tcb, html, $uibModalInstance, $http, TagsFactory, UsersFactory, factory, object, selector, edit;
  tcb = new TestComponentBuilder();
  beforeEach(providers(provide => {
      $uibModalInstance = {
        result: {
            then: function(confirmCallback, cancelCallback) {
              this.confirmCallBack = confirmCallback;
              this.cancelCallback = cancelCallback;
            }
          },
          close: function(item) {
            this.result.confirmCallBack(item);
          },
          dismiss: function(type) {
            this.result.cancelCallback(type);
          }
      };
      UsersFactory = {
        query: usersQuerySpy
      }

      TagsFactory = {
        query: tagsQuerySpy
      }

      factory = {
        query: objectQuerySpy,
        upsert: objectQuerySpy
      }

    return [
      provide('$uibModalInstance', { useValue: $uibModalInstance }),
      provide(UsersFactory, { useValue: UsersFactory }),
      provide(TagsFactory, { useValue: TagsFactory })
    ];
  }));

  it('has a valid $uibModalInstance service mock', () => {
    expect($uibModalInstance).toBeDefined();
    expect($uibModalInstance.result).toBeDefined();
    expect($uibModalInstance.close).toBeDefined();
    expect($uibModalInstance.dismiss).toBeDefined();
  });

  it('has a valid UsersFactory service mock', () => {
    expect(UsersFactory).toBeDefined();
    expect(UsersFactory.query).toBeDefined();
    expect(UsersFactory.query()).toEqual(mockUsersData);
  });

  it('successfully compiles', (done) => {
    html = '<admin-modal></admin-modal>';
    tcb.overrideTemplate(Test, html)
      .createAsync(Test).then(fixture => {
        let adminModalComponent = fixture.debugElement.componentViewChildren[0];
        expect(adminModalComponent).toBeDefined();
        done();
      })
  });

  it('overrides providers', (done) => {
    html = '<admin-modal></admin-modal>';
    tcb.overrideTemplate(Test, html)
      // .overrideProviders(Test, ('$uibModalInstance', TagsFactory, UsersFactory))
      .createAsync(Test).then(fixture => {
        let tagsFactory = fixture.debugElement.getLocal(TagsFactory);
        expect(tagsFactory.query()).toEqual(mockTagsData);
        let factory = fixture.debugElement.getLocal(factory);
        expect(factory).toBeDefined();
        expect(factory.query()).toEqual(mockObjectData);
        expect(factory.upsert()).toEqual(mockObjectData);
        // let object = fixture.debugElement.getLocal(object);
        // expect(object).toBeDefined();
      });
    done();
  });
});
