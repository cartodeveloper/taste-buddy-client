import Context from "../Context";
import React, { Component } from "react";
import TastingItem from "./TastingItem";

class TastingList extends Component {
  static contextType = Context;
  state = {
    filter: {
      wineName: "",
    },
    filterValue: "all",
  };

  setFilter = (key, value) => {
    this.setState({
      filter: { ...this.state.filter, [key]: value },
    });
  };

  filterTastings = () => {
    let { tastings = [] } = this.context;
    let { filter } = this.state;

    if (filter.wineName !== "") {
      tastings = tastings.filter((t) =>
        t.wineName.toLowerCase().includes(filter.wineName.toLowerCase())
      );
    }

    if (filter.varietal && filter.varietal !== "all") {
      tastings = tastings.filter((t) => t.varietal === filter.varietal);
    }
    if (filter.vintage && filter.vintage !== "all") {
      tastings = tastings.filter((t) => t.vintage === filter.vintage);
    }
    if (filter.score && filter.score !== "all") {
      tastings = tastings.filter((t) => t.score === filter.score);
    }
    return tastings;
  };

  render() {
    const tastings = this.filterTastings();
    return (
      <section className="tasting-list">
        <h2>Viewing {this.context.tastings.length} wine tasting sheets</h2>
        <section className="input-search">
          <input
            type="text"
            id="search-term"
            placeholder="Wine Name"
            onChange={(e) => this.setFilter("wineName", e.target.value)}
          ></input>
        </section>
        <div className="all-filters">
          <section className="varietal-filter">
            <label>Varietal:</label>
            <select
              onChange={(e) => this.setFilter("varietal", e.target.value)}
            >
              <option value="all">All</option>
              {[...new Set(this.context.tastings.map((t) => t.varietal))].map(
                (varietal) => (
                  <option value={varietal}>{varietal}</option>
                )
              )}
            </select>
          </section>
          <section className="vintage-filter">
            <label>Vintage:</label>
            <select onChange={(e) => this.setFilter("vintage", e.target.value)}>
              <option value="all">All</option>
              {[...new Set(this.context.tastings.map((t) => t.vintage))]
                .sort()
                .map((vintage) => (
                  <option value={vintage}>{vintage}</option>
                ))}
            </select>
          </section>
          <section className="score-filter">
            <label>Score:</label>
            <select onChange={(e) => this.setFilter("score", e.target.value)}>
              <option value="all">All</option>
              {[...new Set(this.context.tastings.map((t) => t.score))]
                .sort()
                .map((score) => (
                  <option value={score}>{score}</option>
                ))}
            </select>
          </section>
        </div>
        <ul className="ul-tasting-list" aria-live="polite">
          {tastings.map((tasting) => (
            <TastingItem
              key={tasting.id}
              {...tasting}
              deleteTasting={this.context.deleteTasting}
              {...this.props}
            />
          ))}
        </ul>
      </section>
    );
  }
}

export default TastingList;
