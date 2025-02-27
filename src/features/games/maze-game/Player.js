import React from "react";

export default function Player() {
  return <figure className="player"><img src={`${process.env.PUBLIC_URL}/img/gojo03.png`} alt="player" /></figure>;
}