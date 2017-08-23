import { Metror } from 'meteor/meteor';
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Notes } from './../api/notes.js';
import PropTypes from 'prop-types';
import NoteListHeader from './NoteListHeader.js';
import NoteListItem from './NoteListItem';

export const NoteList = (props) => {
  return (
    <div>
      NoteList { props.notes.length }
      <NoteListHeader/>
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
