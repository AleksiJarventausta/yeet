import React from "react";

export default function FeedItem(props) {
  const gameItems = props.games.map(game => {
    return <span>{game + " "}</span>;
  });

  return (
    <div class="ui card">
      <div class="content">
        <div class="header">Games: {gameItems}</div>

        <div class="description">{props.description}</div>
      </div>

      <div class="extra content">
        <i class="user icon" />
        {props.username}
        {/* Nimi vasemmalle, Buttonit oikealle */}
        <button class="ui positive basic button">
          <i class="icon thumbs up" />
        </button>
        <button class="ui negative basic button">
          <i class="icon thumbs down" />
        </button>
      </div>
    </div>
  );
}
