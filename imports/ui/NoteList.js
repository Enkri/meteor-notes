import { Metror } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Notes } from './../api/notes.js';

import React from 'react';
import PropTypes from 'prop-types';
import NoteListHeader from './NoteListHeader.js';
import NoteListItem from './NoteListItem';
import NoteListEmptyItem from './NoteListEmptyItem';

export const NoteList = (props) => {

  return (
    <div>
      NoteList { props.notes.length }
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
  Meteor.subscribe('notes');
  return {
    notes: Notes.find().fetch()
  };
}, NoteList);
