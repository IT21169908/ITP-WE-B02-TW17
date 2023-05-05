
import { Star, ArrowsMove, Trash } from "react-bootstrap-icons";
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { Cards } from "../frame/CardFrame";
import { Card } from './styled-elements';

interface NoteCardProps {
  data: any;
  listeners?: any;
}

function NoteCard(props: NoteCardProps) {

  const { title, key, description, stared, label } = props.data;

  const onHandleDelete = () => {
  };

  const addToFavorites = () => {
  };

  return (
    <Card className={label}>
      <Cards headless>
        <h4>
          <span>
            {title}
            <span className={`status-bullet ${label}`} />
          </span>
          <div {...props.listeners}>
            <ArrowsMove />
          </div>
        </h4>
        <p>{description}</p>
        <div className="actions">
          <span>
            <Link
              className={stared ? 'star active' : 'star'}
              onClick={() => addToFavorites()}
              to="#"
            >
              <Star />
            </Link>
            <Link onClick={() => onHandleDelete()} to="#">
              <Trash />
            </Link>
          </span>
        </div>
      </Cards>
    </Card>
  );
}

NoteCard.propTypes = {
  data: PropTypes.object,
};
export default NoteCard;
