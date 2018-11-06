import React from "react";
import ReactDOM from "react-dom";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import "./growth.css"
import "./style.css";
import Article from './article.js'

class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      news: [],
      category: '',
      search: '',
      isLoading: true,
      country: 'us'
    }
    this.getCategory = this.getCategory.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.getUpdatedNews = this.getUpdatedNews.bind(this)
    this.updateSearch = this.updateSearch.bind(this)
    this.getCountry = this.getCountry.bind(this)
  }

  componentDidMount() {
    fetch(`https://newsapi.org/v2/top-headlines?country=` + this.state.country + `&category=` + this.state.category + `&apiKey=d9d14bec60fb45d39b5f0c8ff1930242`)
      .then(response => response.json())
      .then(response => {
        console.log(response.articles)
        this.setState({
          news: response.articles,
          isLoading: false
        })
      })
  }

  getCategory(event) { this.setState({ category: event.target.value }, () => this.getUpdatedNews()) }

  getUpdatedNews() {
    fetch(`https://newsapi.org/v2/top-headlines?country=`  + this.state.country +  `&category=` + this.state.category + `&apiKey=d9d14bec60fb45d39b5f0c8ff1930242`)
      .then(response => response.json())
      .then(response => {
        this.setState({
          news: response.articles,
          isLoading: false
        })
      })
  }

  handleSearch(event) { this.setState({ search: event.target.value }, () => this.updateSearch()) }

  updateSearch() {
    if (this.state.search == '') {
      this.getUpdatedNews()
    } else {
      fetch(`https://newsapi.org/v2/everything?q=` + this.state.search + `&apiKey=d9d14bec60fb45d39b5f0c8ff1930242`)
        .then(response => response.json())
        .then(response => {
          this.setState({
            news: response.articles,
            isLoading: false
          })
        })
    }
  }

  getCountry(event) {
    this.setState ({
      country: event.target.value
    })
  }

  render() {

    return (
      <div>

        <div className='container-fluid'>
          <form>
            <div className="form-group">
              <div className='row col-12'>
                <input type="text" className="col-9 form-control font-weight-bold text-primary text-center" placeholder="search" value={this.state.search} onChange={this.handleSearch} />
                <select name="carlist" form="carform" className='col-3 form-control font-weight-bold text-primary' onChange={this.getCountry}>
                  <option className='font-weight-bold text-primary' value="us">United states</option>
                  <option className='font-weight-bold text-primary' value="eg">Egypt</option>   
                  <option className='font-weight-bold text-primary' value="fr">France</option>
                  <option className='font-weight-bold text-primary' value="ar">Argentina</option>
                  <option className='font-weight-bold text-primary' value="gb">England</option>
                  <option className='font-weight-bold text-primary' value="ru">Russia</option>
                </select>
              </div>
            </div>
          </form>

          <div className='text-center'>
            <button type="button" onClick={this.getCategory} value="" className={this.state.category == '' ? 'btn btn-success' : 'btn btn-primary'}> All news </button>
            <button type="button" onClick={this.getCategory} value="Technology" className={this.state.category == 'Technology' ? 'btn btn-success' : 'btn btn-primary'}> Technology </button>
            <button type="button" onClick={this.getCategory} value="Business" className={this.state.category == 'Business' ? 'btn btn-success' : 'btn btn-primary'}> Business </button>
            <button type="button" onClick={this.getCategory} value="Science" className={this.state.category == 'Science' ? 'btn btn-success' : 'btn btn-primary'}> Science </button>
            <button type="button" onClick={this.getCategory} value="Entertainment" className={this.state.category == 'Entertainment' ? 'btn btn-success' : 'btn btn-primary'}> Entertainment </button>
            <button type="button" onClick={this.getCategory} value="Health" className={this.state.category == 'Health' ? 'btn btn-success' : 'btn btn-primary'}> Health </button>
            <button type="button" onClick={this.getCategory} value="Sports" className={this.state.category == 'Sports' ? 'btn btn-success' : 'btn btn-primary'}> Sports </button>
          </div>
        </div>

        <div className='container-fluid'>

          <ul className="list-group">

            <div className='d-block bg-primary'>
              {this.state.isLoading == true ? <li><div className='loader' styles={{ marginTop: '50px', paddingBottom: '50px', textAlign: 'center' }}></div></li> : ''}
            </div>
            <ReactCSSTransitionGroup
              transitionName="list-item"
              transitionAppear={true}
              transitionAppearTimeout={500}
              transitionEnter={true}
              transitionEnterTimeout={500}
              transitionLeave={true}
              transitionLeaveTimeout={300}>
              {this.state.news.map((article) =>
                <Article url={article.url} source={article.source.name} title={article.title} />
              )}
            </ReactCSSTransitionGroup>
          </ul>


        </div>
        <div className="container footer">
          <p className='text-primary text-center font-weight-bold'>Built with React, Bootstrap4 and Open news API</p>
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);