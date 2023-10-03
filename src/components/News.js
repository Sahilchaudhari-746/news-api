import React, { Component } from 'react'
import Newitems from './Newitems'

import '../styles/navitems.css'

export class News extends Component {
    constructor() {
        super();
        console.log("hello from news comp");
        this.state = {
            articles: [],
            loading: false,
            page:1,
          
        }
    }
    async componentDidMount() {
        console.log("cdm");
        let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=9dccc74402244d5c8c8c3e104f3f6adc&page=1&pageSize=20";
        let data = await fetch(url);
        let parseddata = await data.json()
        console.log(parseddata);
        this.setState({ articles: parseddata.articles ,totalResults:parseddata.totalResults})
    }
    handlenextclick =async () => {
        console.log('next');
        if(this.state.page+1> Math.ceil(this.state.totalResults/20)){

        }
        else{
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=9dccc74402244d5c8c8c3e104f3f6adc&page=${this.state.page+1}&pageSize=20`;
        let data = await fetch(url);
        let parseddata = await data.json()
        console.log(parseddata);
        this.setState({
            page:this.state.page+1,
            articles: parseddata.articles 
        })
    }
    }
     handleprevclick =async () => {
        console.log('prev');
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=9dccc74402244d5c8c8c3e104f3f6adc&page=${this.state.page-1}&pageSize=20`
        let data = await fetch(url);
        let parseddata = await data.json()
        console.log(parseddata);
        this.setState({
            page:this.state.page-1,
            articles: parseddata.articles 
        })
    }
    render() {
        return (
            <div className='container my-3'>
                <h2 className='text-center'> Top  News Headlines</h2>
                <div className='row'>
                    {this.state.articles.map((element) => {

                        return <div className='col-md-4' key={element.url}>
                            <Newitems title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imgurl={!element.urlToImage ? "https://ngs-space1.sgp1.digitaloceanspaces.com/am/uploads/mediaGallery/image/1696070901680.jpg-org" : element.urlToImage} newsurl={element.url} />
                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handleprevclick}>&larr; Prev</button>
                    <button type="button" className="btn btn-dark" onClick={this.handlenextclick}> Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News
