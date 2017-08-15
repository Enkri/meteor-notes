import React from 'react';
import PropTypes from 'prop-types';

const PrivateHeader = (props) => {
  const logOut = () => {
    Accounts.logout();
  }
  return (
    <div className="header">
      <div className="header__content">
        <h1 className="header__title">{props.title}</h1>
        <button className="button button--link-text" onClick={logOut}>Logout</button>
      </div>
    </div>

  );
};
PrivateHeader.PropTypes = {
  title: React.PropTypes.string.isRequired
}

export default PrivateHeader;
