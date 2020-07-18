import React, { Component } from "react";

class GenMem extends Component {
  constructor() {
    super();
    this.state = {
      topText: "",
      bottomText: "",
      randomImage: "http://i.imgflip.com/1bij.jpg",
      memes: [],
    };
  }

  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then((it) => it.json())
      .then((it) => {
        const { memes } = it.data;
        console.log(memes[0]);
        this.setState({ memes });
      });
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { memes } = this.state;
    const randomIndex = Math.floor(Math.random() * memes.length);
    this.setState({ randomImage: memes[randomIndex].url });
  };

  render() {
    const { topText, bottomText, randomImage } = this.state;
    return (
      <React.Fragment>
        <form className="meme-form" onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="topText"
            placeholder="Top text"
            value={topText}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="bottomText"
            placeholder="Bottom text"
            value={bottomText}
            onChange={this.handleChange}
          />
          <button>Gen</button>
        </form>
        <div className="meme-wrapper">
          <img src={randomImage} className="random-img" alt="random" />
          <h2 className="top-text">{topText}</h2>
          <h2 className="bottom-text">{bottomText}</h2>
        </div>
      </React.Fragment>
    );
  }
}

export default GenMem;
