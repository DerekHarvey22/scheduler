//imports
import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  });

  const formatSpots = (spot) => {
    if (spot === 0) {
      return (`no spots remaining`);
    }
    if (spot === 1) {
      return (`1 spot remaining`);
    }
    if (spot > 1) {
      return (`${spot} spots remaining`);
    }
  }

  return (
    <li className={dayClass} onClick={props.setDay}>
      <h2 className="text--regular">{props.name}</h2>
      {formatSpots()}
    </li>
  );
}