import React, { useState, useEffect } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";
import '../App.css'

const News = (props) => {

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [searchText, setSearchText] = useState("")
  const [searchFlag, setSearchFlag] = useState(false)
  const [totalResults, setTotalResults] = useState(0)

  const updateNews = async () => {

    const url = searchFlag ? `https://newsapi.org/v2/everything?q=${searchText}&searchIn=title,description&apiKey=${props.apiKey}&pageSize=${props.pageSize}&page=${page}` : `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}&page=${page}`

    // const url = searchFlag ? `https://newsdata.io/api/1/news?language=en&q=${searchText}&qInTitle&apikey=${props.apiKey}&page=${page}` : `https://newsdata.io/api/1/news?language=en&country=in&category=${props.category}&apikey=${props.apiKey}&page=${page}`

    setLoading(true)
    props.setProgress(10)
    const fetchedData = await fetch(url)
    props.setProgress(40)
    const parsedData = await fetchedData.json();
    props.setProgress(70)

    setArticles(parsedData.articles)
    // setArticles(parsedData.results)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100)
  }
  const handleSearchClick = async () => {

    setSearchFlag(true)

    const url = `https://newsapi.org/v2/everything?q=${searchText}&searchIn=title,description&apiKey=${props.apiKey}&pageSize=${props.pageSize}&page=${page}`

    // const url = `https://newsdata.io/api/1/news?language=en&q=${searchText}&apikey=${props.apiKey}&page=${page}`

    setLoading(true)
    props.setProgress(10)
    const fetchedData = await fetch(url)
    props.setProgress(40)
    const parsedData = await fetchedData.json();
    props.setProgress(70)

    setArticles(parsedData.articles)
    // setArticles(parsedData.results)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100)
  }
  useEffect(() => {

    document.title = `${props.category} - NewsMonkey`
    updateNews();
  }, [])
  const handleSearchChange = (event) => {

    setSearchText(event.target.value)
  }
  const fetchMoreData = async () => {

    setPage(page + 1)

    const url = searchFlag ? `https://newsapi.org/v2/everything?q=${searchText}&searchIn=title,description&apiKey=${props.apiKey}&pageSize=${props.pageSize}&page=${page + 1}` : `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}&page=${page + 1}`

    // const url = searchFlag ? `https://newsdata.io/api/1/news?language=en&q=${searchText}&qInTitle&apikey=${props.apiKey}&page=${page + 1}` : `https://newsdata.io/api/1/news?language=en&country=in&category=${props.category}&apikey=${props.apiKey}&page=${page + 1}`

    const fetchedData = await fetch(url)
    const parsedData = await fetchedData.json();

    setArticles(articles.concat(parsedData.articles))
    // setArticles(articles.concat(parsedData.results))
  }
  return (
    <>
      <div className="container d-flex fixed-top searchBox" >
        <input className="form-control me-2" placeholder="Search" value={searchText} onChange={handleSearchChange} />
        <button className="btn btn-outline-success" onClick={handleSearchClick}>Search</button>
      </div>
      <div className="container" style={{ marginTop: '90px' }}>

        {searchFlag && <h2 className="text-center my-3">Top Results in {searchText}</h2>}
        {!searchFlag && <h2 className="text-center my-3">Top Headlines in {props.category}</h2>}

        {loading && !searchFlag && <Spinner />}

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length < totalResults}
          loader={<Spinner />}
        >
          <div className="row my-3 mx-3 text-center">
            {!loading && articles.map((ele) => {

              return <div className="col-md-4" key={ele.url}>
                <NewsItem title={ele.title} desc={ele.description} imageUrl={ele.urlToImage} url={ele.url} source={ele.source.name} date={(new Date(ele.publishedAt)).toDateString()} />
                {/* <NewsItem title={ele.title} desc={ele.description} imageUrl={ele.image_url} url={ele.url} source={ele.source_id} date={(new Date(ele.pubDate)).toDateString()} /> */}
              </div>
            })}
          </div>
        </InfiniteScroll>
      </div>
    </>
  )
}

export default News