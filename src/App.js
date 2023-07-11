import { Routes, Route, useNavigate } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import About from "./About";
import Missing from "./Missing";
import { useEffect, useState } from "react";
import { format } from "date-fns";

function App() {
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [postTitle, setPostTitle] = useState('')
  const [postBody, setPostBody] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const filteredResults = posts.filter(post => 
      ((post.body).toLowerCase()).includes(search.toLowerCase())
      || ((post.title).toLowerCase()).includes(search.toLowerCase()))
      // console.log(posts)
      // console.log(searchResults)
      console.log(filteredResults)
      setSearchResults(filteredResults.reverse())
      console.log(filteredResults)
      console.log(searchResults)
  }, [posts, search])

  // console.log(searchResults)
  const handleSubmit = (e) => {
    e.preventDefault()
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1
    const datetime = format(new Date(), 'MMMM, dd, yyyy, pp')
    const newPost = { id, title: postTitle, datetime, body: postBody}
    const allPosts = [ ...posts, newPost]
    setPosts(allPosts)
    setPostTitle('')
    setPostBody('')
    navigate("/")
  }

  const handleDelete = (id) => {
    const postList = posts.filter(post => post.id !== id)
    setPosts(postList)
    navigate('/')
  }

  return (
    <Routes>
      <Route path="/" element={<Layout
         search={search} 
         setSearch={setSearch} 
      />}>
        <Route index element={<Home posts={searchResults}/>} />
        <Route path="post">
          <Route index element={<NewPost 
            handleSubmit={handleSubmit}
            postTitle={postTitle}
            setPostTitle={setPostTitle}
            postBody={postBody}
            setPostBody={setPostBody}
          />} />
          <Route path=":id" element={<PostPage 
            posts={posts} 
            handleDelete={handleDelete}/>} />
        </Route>
        <Route path="about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
