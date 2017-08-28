import { Metror } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Notes } from './../api/notes.js';
import { Session } from 'meteor/session';

import React from 'react';
import PropTypes from 'prop-types';
import NoteListHeader from './NoteListHeader.js';
import NoteListItem from './NoteListItem';
import NoteListEmptyItem from './NoteListEmptyItem';

export const NoteList = (props) => {

  return (
    <div className="item-list">
      <NoteListHeader/>
      { props.notes.length === 0 ? <NoteListEmptyItem/> : undefined }
      {
          props.notes.map(function(note) {
            return <NoteListItem key={note._id} note={note}/>;
          })
      }
    </div>
  );
};

NoteList.propTypes = {
  notes: PropTypes.array.isRequired
}

export default createContainer(() => {
  const selectedNoteId = Session.get('selectedNoteId');
  Meteor.subscribe('notes');
  return {
    notes: Notes.find({}, {sort : {updatedAt: -1}}).fetch().map((note) => {
      return {
        ...note,
        selected: note._id === selectedNoteId
      }
    })
  };
}, NoteList);
