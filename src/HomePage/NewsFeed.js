import React, { Component } from 'react'
import Loader from './Loader'
import './NewsFeed.css'
export default class NewsFeed extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            url :['https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=8a52ce73ab0249168cd1bb8a4dfc9d2f',
                    'https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=8a52ce73ab0249168cd1bb8a4dfc9d2f',
                    'https://newsapi.org/v2/everything?domains=wsj.com&apiKey=8a52ce73ab0249168cd1bb8a4dfc9d2f',
                    'https://newsapi.org/v2/everything?q=bitcoin&from=2020-04-09&sortBy=publishedAt&apiKey=8a52ce73ab0249168cd1bb8a4dfc9d2f',
                    'https://newsapi.org/v2/everything?q=apple&from=2020-05-08&to=2020-05-08&sortBy=popularity&apiKey=8a52ce73ab0249168cd1bb8a4dfc9d2f'
                ],
            newsFeed:[],
            loading:true,
            error:'',
            count:0
        }
        this.getDetails=this.getDetails.bind(this)
        this.getDetailsBack=this.getDetailsBack.bind(this)

    }
    

    componentDidMount() {
        fetch(this.state.url[this.state.count])
          .then(res => res.json())
          .then(
            (result) => {
                console.log(result);
                
              this.setState({

                loading: false,
                newsFeed: result.articles,
                count : this.state.count + 1
              });
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              this.setState({
                loading: false,
                error:error
              });
            }
          )
      }

    getDetails(){
        this.setState({

            loading: true
          })
        fetch(this.state.url[this.state.count])
          .then(res => res.json())
          .then(
            (result) => {
                console.log(result);
                
              this.setState({

                loading: false,
                newsFeed: result.articles,
                count:this.state.count + 1
              });
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              this.setState({
                loading: false,
                error:error
              });
            }
          )
    }
    getDetailsBack(){
        this.setState({

            loading: true,
            // count : this.state.count 1
          })
        fetch(this.state.url[this.state.count - 2])
          .then(res => res.json())
          .then(
            (result) => {
                console.log(result);
                
              this.setState({

                loading: false,
                newsFeed: result.articles,
                count:this.state.count - 1
              });
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              this.setState({
                loading: false,
                error:error
              });
            }
          )

    }
    
    render() {
        const {loading,newsFeed,error}=this.state
        { if(loading){ return <Loader/>} }
      
        return ( 
            <div >
                 {newsFeed.map(elem => {
                        return ( <div className = 'newsCard'>
                                    <div className = 'imgDiv'><img src={elem.urlToImage} alt="Image" height="122" width="282"/></div>
                                        <div className = 'newsData'>
                                        <h4>{elem.title}</h4>
                                        <p>{elem.description}</p>
                                        {/* <ol>{elem.content}</ol> */}
                                        <a href= {elem.url} className = 'clickLink'>Read More</a>
                                        </div>
                                </div>

                        )
                })} 
                <br></br>
            <div className = 'btn'><button className = 'buttonBack' onClick = {this.getDetailsBack}>Back</button><button className = 'buttonNext' onClick = {this.getDetails}>Next</button></div>
            </div>
        )
    }
}
