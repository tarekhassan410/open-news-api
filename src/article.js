import React from 'react'
import ReactDom from 'react-dom'

class Article extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <li className='list-group-item border-left-0 border-right-0' key={this.props.url}>
        <div className="row">
          <div className='col-12'>
            <a className='text-primary font-weight-bold' href={this.props.url} target="_blank">
              {this.props.title}
            </a>
            <span className='text-secondary font-weight-bold float-right'> {this.props.source} </span>
          </div>

          {/*
            <div className="col-2">
              <a href={article.url} className="thumbnail">
                <img src={article.urlToImage != null ? article.urlToImage : 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9144d03989599996b0108a4fa2f32dca&w=1000&q=80'} className="img-fluid" />
              </a>
            </div>
            */}
        </div>
      </li>
    )
  }
}

export default Article;