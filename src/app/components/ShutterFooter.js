import React from 'react';
import './ShutterFooter.css'; // Make sure to import the CSS file

const Footer = ({ onClose }) => {
  return (
    <div className="footer">
      <div className="footerLeft" onClick={onClose}>
        <div className="crossLine">
          <div className="crossHorizontal"></div>
          <div className="crossVertical"></div>
        </div>
      </div>
      <div className="footerRight">
        <div>Instagram➚</div>
        <div>LinkedIn➚</div>
        <div>Medium➚</div>
        <div>Github➚</div>
      </div>
    </div>
  );
};

export default Footer;
