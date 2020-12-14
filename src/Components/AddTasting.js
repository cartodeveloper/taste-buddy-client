import React, { Component } from "react";
import config from "../config";
import Context from "../Context";
import { CountryDropdown } from "react-country-region-selector";

class AddTasting extends Component {
  static contextType = Context;
  state = {
    error: null,
    checked: true,
    newTasting: {},
  };

  selectCountry(val) {
    this.setState({ country: val });
  }

  handleChange(e) {
    this.setState({
      newTasting: { ...this.state.newTasting, [e.target.name]: e.target.value },
    });
  }
  handleClickCancel = () => {
    this.props.history.push("/home");
  };
  //Submit Form Tastings

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ error: null });
    /*fetch(`${config.API_BASE_URL}/tastings`, {
      method: "POST",
      body: JSON.stringify(this.state.newTasting),
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${config.API_KEY}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((error) => {
            throw error;
          });
        }
        return res.json();
      })
      .then((newTasting) => {
        e.target.reset();
        this.setState({
          tastings: [...this.state.tastings, newTasting],
          newTasting: {},
        });
      })
      .catch((e) => {
        this.setState({ error: e.message });
      });*/

    this.context.addTasting(this.state.newTasting);
    this.props.history.push("/tastings");
  };

  render() {
    const { country, error } = this.state;
    return (
      <div>
        <h2>DEDUCTIVE FORMAT</h2>
        <form
          className="add-tasting"
          aria-label="add-tasting"
          onSubmit={(e) => this.handleSubmit(e)}
        >
          {error && <p className="error">{error}</p>}
          <div className="wine-name">
            <label htmlFor="wine-name" aria-label="wine-name">
              Name:
            </label>
            <input
              placeholder="eg. Yacochuya"
              type="text"
              id="wine-name"
              name="wineName"
              onChange={(e) => this.handleChange(e)}
            />
          </div>
          <div className="producer">
            <label htmlFor="producer" aria-label="producer">
              Producer:
            </label>
            <input
              placeholder="eg.The Etcharts"
              type="text"
              id="producer"
              name="producer"
              onChange={(e) => this.handleChange(e)}
            />
          </div>
          <div className="varietal">
            <label htmlFor="varietal" aria-label="varietal">
              Varietal:
            </label>
            <input
              placeholder="eg.Malbec"
              type="text"
              id="varietal"
              name="varietal"
              onChange={(e) => this.handleChange(e)}
            />
          </div>
          <div className="vintage">
            <label htmlFor="vintage" aria-label="vintage">
              Vintage:
            </label>
            <input
              placeholder="eg.2017"
              type="number"
              id="vintage"
              name="vintage"
              onChange={(e) => this.handleChange(e)}
            />
          </div>
          <div className="score">
            <label htmlFor="score" aria-label="score">
              Score:
            </label>
            <select name="score" onChange={(e) => this.handleChange(e)}>
              <option value="">Select...</option>
              <option value="50-74">50-74</option>
              <option value="75-79">75-79</option>
              <option value="80-84">80-84</option>
              <option value="85-89">85-89</option>
              <option value="90-94">90-94</option>
              <option value="95-100">95-100</option>
            </select>
          </div>
          <div className="hiding-form">
            {/*
          <div className="country">
            <label htmlFor="country" aria-label="country">
              Country:
            </label>
            <CountryDropdown
              value={country}
              onChange={(val) => this.selectCountry(val)}
            />
          </div>
          <div className="region">
            <label htmlFor="region" aria-label="region">
              Region:
            </label>
            <input
              placeholder="eg.Salta's Cafayete valle"
              type="text"
              id="region"
              name="region"
              onChange={(e) => this.handleChange(e)}
            />
          </div>
          <fieldset>
            <legend>Sigh</legend>
            <div className="condition">
              <label htmlFor="condition" aria-label="condition">
                Condition:
              </label>
              <select name="condition" onChange={(e) => this.handleChange(e)}>
                <option value="">Select...</option>
                <option value="clear">Clear</option>
                <option value="hazy">Hazy</option>
                <option value="turbid">Turbid</option>
              </select>
            </div>
            <div className="concentration">
              <label htmlFor="concentration" aria-label="concentration">
                Concentration:
              </label>
              <select
                name="concentration"
                onChange={(e) => this.handleChange(e)}
              >
                <option value="">Select...</option>
                <option value="pale">Pale</option>
                <option value="medium">Medium</option>
                <option value="deep">Deep</option>
              </select>
            </div>
            <div className="color">
              <h3>Color</h3>
              <div className="colorWhite">
                <label htmlFor="colorWhite" aria-label="colorWhite">
                  White Wines:
                </label>
                <select
                  name="colorWhite"
                  onChange={(e) => this.handleChange(e)}
                >
                  <option value="">Select...</option>
                  <option value="water-white">Water White</option>
                  <option value="straw">Straw</option>
                  <option value="yellow">Yellow</option>
                  <option value="gold">Gold</option>
                </select>
              </div>
              <div className="colorRed">
                <label htmlFor="colorRed" aria-label="colorRed">
                  Red Wines:
                </label>
                <select name="colorRed" onChange={(e) => this.handleChange(e)}>
                  <option value="">Select...</option>
                  <option value="purple">Purple</option>
                  <option value="ruby">Ruby</option>
                  <option value="red">Red</option>
                  <option value="garnet">Garnet</option>
                </select>
              </div>
              <div className="colorRose">
                <label htmlFor="colorRose" aria-label="colorRose">
                  Roses:
                </label>
                <select name="colorRose" onChange={(e) => this.handleChange(e)}>
                  <option value="">Select...</option>
                  <option value="ligth-pink">Ligth Pink</option>
                  <option value="ligth-orange">Ligth Orange</option>
                  <option value="tart-cherry">Tart Cherry</option>
                  <option value="dark-pink">Dark Pink</option>
                </select>
              </div>
            </div>
            <div className="radio-buttons">
              <h3>Rim Variation</h3>
              <input
                id="yes-rim"
                value="rim"
                name="rim"
                type="radio"
                onChange={(e) => this.handleChange(e)}
              />
              Yes
              <input
                id="no-rim"
                value="rim"
                name="rim"
                type="radio"
                onChange={(e) => this.handleChange(e)}
              />
              No
            </div>
            <div className="extract">
              <label htmlFor="extract" aria-label="extract">
                Extract/Staning:
              </label>
              <select name="extract" onChange={(e) => this.handleChange(e)}>
                <option value="">Select...</option>
                <option value="Ligth">Ligth </option>
                <option value="Medium">Medium</option>
                <option value="Heavy">Heavy</option>
              </select>
            </div>
            <div className="tearing">
              <label htmlFor="tearing" aria-label="tearing">
                Tearing:
              </label>
              <select name="tearing" onChange={(e) => this.handleChange(e)}>
                <option value="">Select...</option>
                <option value="LigthT">Ligth </option>
                <option value="MediumT">Medium</option>
                <option value="HeavyT">Heavy</option>
              </select>
            </div>
            <div className="radio-buttons">
              <h3>Gas Evidence</h3>
              <input
                id="yes-gas"
                value="gas"
                name="gas"
                type="radio"
                onChange={(e) => this.handleChange(e)}
              />
              Yes
              <input
                id="no-gas"
                value="gas"
                name="gas"
                type="radio"
                onChange={(e) => this.handleChange(e)}
              />
              No
            </div>
          </fieldset>
          <fieldset>
            <legend>Nose</legend>
            <div className="conditionNose">
              <label htmlFor="conditionNose" aria-label="conditionNose">
                Condition:
              </label>
              <select
                name="conditionNose"
                onChange={(e) => this.handleChange(e)}
              >
                <option value="">Select...</option>
                <option value="tca">TCA</option>
                <option value="h2s">H2S</option>
                <option value="volatile-acidity">Volatile Acidity</option>
                <option value="ethyl-acetate">Ethyl Acetate</option>
                <option value="brettanomyces">Brettanomyces</option>
                <option value="oxidation">Oxidation</option>
                <option value="none">None</option>
              </select>
            </div>
            <div className="intensity">
              <label htmlFor="intensity" aria-label="intensity">
                Intensity:
              </label>
              <select name="intensity" onChange={(e) => this.handleChange(e)}>
                <option value="">Select...</option>
                <option value="delicate">Delicate </option>
                <option value="moderate">Moderate</option>
                <option value="powerfull">Powerfull</option>
              </select>
            </div>
            <div className="ageAssessment">
              <label htmlFor="ageAssesment" aria-label="ageAssesment">
                Age Assessment:
              </label>
              <select
                name="ageAssesment"
                onChange={(e) => this.handleChange(e)}
              >
                <option value="">Select...</option>
                <option value="youthful">Youthful </option>
                <option value="moderate">Developing</option>
                <option value="powerfull">Vinous</option>
              </select>
            </div>
            <div className="fruitN">
              <h3>Fruit Notes</h3>
              <div className="fruitNWhite">
                <label htmlFor="fruitNWhite" aria-label="fruitNWhite">
                  White Wines:
                </label>
                <select
                  name="fruitNWhite"
                  onChange={(e) => this.handleChange(e)}
                >
                  <option value="">Select...</option>
                  <option value="water-white">Water White</option>
                  <option value="straw">Straw</option>
                  <option value="yellow">Yellow</option>
                  <option value="gold">Gold</option>
                </select>
              </div>
              <div className="colorRed">
                <label htmlFor="colorRed" aria-label="colorRed">
                  Red Wines:
                </label>
                <select name="colorRed" onChange={(e) => this.handleChange(e)}>
                  <option value="">Select...</option>
                  <option value="purple">Purple</option>
                  <option value="ruby">Ruby</option>
                  <option value="red">Red</option>
                  <option value="garnet">Garnet</option>
                </select>
              </div>
              <div className="colorRose">
                <label htmlFor="colorRose" aria-label="colorRose">
                  Roses:
                </label>
                <select name="colorRose" onChange={(e) => this.handleChange(e)}>
                  <option value="">Select...</option>
                  <option value="ligth-pink">Ligth Pink</option>
                  <option value="ligth-orange">Ligth Orange</option>
                  <option value="tart-cherry">Tart Cherry</option>
                  <option value="dark-pink">Dark Pink</option>
                </select>
              </div>
            </div>
            
          </fieldset> 
          Hiding rest of the form -functionality..then edit*/}
          </div>
          <button type="button" onClick={this.handleClickCancel}>
            Cancel
          </button>
          <button type="submit">Add Tasting</button>
        </form>
      </div>
    );
  }
}
export default AddTasting;
