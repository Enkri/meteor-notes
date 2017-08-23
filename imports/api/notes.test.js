import { Meteor } from 'meteor/meteor';
import expect from 'expect';
import { Notes } from './notes.js';

if (Meteor.isServer) {
  describe('notes', function() {
    const noteOne = {
      _id: 'testNoteId1',
      title: 'My title',
      body: 'My body',
      updatedAt: 0,
      userId: 'testUserId1'
    };
    const noteTwo = {
      _id: 'testNoteId2',
      title: 'Thins to Buy',
      body: 'Matress',
      updatedAt: 0,
      userId: 'testUserId2'
    };
    beforeEach(function() {
      Notes.remove({});
      Notes.insert(noteOne);
      Notes.insert(noteTwo);
    });

    it('should insert new note', function() {
      const userId = 'testid';
      const _id = Meteor.server.method_handlers['notes.insert'].apply({ userId: userId });
      expect(Notes.findOne({ _id: _id, userId: userId })).toExist();
    });

    it('shoulld not insert note if not authenticated', function() {
      expect(() => {
        Meteor.server.method_handlers['notes.insert']();
      }).toThrow();
    });

    it('should remove note', function() {
      Meteor.server.method_handlers['notes.remove'].apply({ userId: noteOne.userId }, [noteOne._id]);
      expect(Notes.findOne({ _id: noteOne._id, userId: noteOne.userId })).toNotExist();
    });

    it('should not remove note if unauthenticated', function() {
      expect(() => {
        Meteor.server.method_handlers['notes.remove'].apply({}, [noteOne._id]);
      }).toThrow();
    });

    it('should not remove note if _id is invalid', function() {
      expect(() => {
        Meteor.server.method_handlers['notes.remove'].apply({ userId: noteOne.userId }, []);
      }).toThrow();
    });

    it('should update note', function() {
      const title = 'This is the updated title';
      Meteor.server.method_handlers['notes.update'].apply({
        userId: noteOne.userId,
      }, [noteOne._id, {
        title: title
      }]);
      const note = Notes.findOne(noteOne._id);
      expect(note.updatedAt).toBeGreaterThan(0);
      expect(note).toInclude({ title, body: noteOne.body });
    });

    it('should throw error if extra updates', function() {
      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({
          userId: 'noteOne.userId',
        }, [noteOne._id, {
          name: 'Chen'
        }]);
      }).toThrow();
    });

    it('should not update note if user was not creator', function () {
      const title = 'This is the updated title';
      Meteor.server.method_handlers['notes.update'].apply({
        userId: 'testid',
      }, [noteOne._id, {
        title: title
      }]);
      const note = Notes.findOne(noteOne._id);
      expect(note).toInclude(noteOne);
    });

    it('should not update note if unauthenticated', function() {
      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({}, [noteOne._id]);
      }).toThrow();
    });

    it('should not update note if _id is invalid', function() {
      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({ userId: noteOne.userId }, []);
      }).toThrow();
    });

    it('should return a users notes', function() {
      const result = Meteor.server.publish_handlers.notes.apply({ userId: noteOne.userId });
      const notes = result.fetch();
      expect(notes.length).toBe(1);
      expect(notes[0]).toEqual(noteOne);
    });

    it('should return zero notes for user that has none', function() {
      const result = Meteor.server.publish_handlers.notes.apply({ userId: 'testid3' });
      const notes = result.fetch();
      expect(notes.length).toBe(0);
    });


  });


}
