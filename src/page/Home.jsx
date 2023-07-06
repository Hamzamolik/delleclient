import React, { useEffect, useState } from 'react'
import { Loader, Card, FormField } from '../components'


const RenderCard = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post) => <Card key={post._id} {...post} />)
  }
  return (
    <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">{title}</h2>
  )
}

const Home = () => {
  const [loading, setloading] = useState(false)
  const [searchResult, setsearchResult] = useState(null)
  const [searchTimeout, setsearchTimeout] = useState(null)
  const [allPost, setAllPost] = useState(null)
  const [searchtext, setSearchtext] = useState('')

  useEffect(() => {
    const fetchpost = async () => {
      setloading(true)
      try {
        const response = await fetch('https://delle1.vercel.app/api/v1/post', {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
          }
        })
        if (response.ok) {
          const result = await response.json()
          setAllPost(result.data.reverse())
        }
      } catch (error) {
        alert(error)
      } finally {
        setloading(false)
      }
    }


    fetchpost()
  }, [])

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout)
    setSearchtext(e.target.value)

    setsearchTimeout(
      setTimeout(() => {
        const searchResults = allPost.filter((item) => item.name.toLowerCase().includes(searchtext.toLowerCase()) || item.prompt.toLowerCase().includes(searchtext.toLowerCase()))
        setsearchResult(searchResults)
      }, 500)
      )
  }

return (
  <section className="max-w-7xl mx-auto">
    <div>
      <h1 className="font-extrabold text-[32px] text-[#222328]">The Community Showcase</h1>
      <p className="mt-2 text-[#666e75] text-[16px] max-w-[500px]">Browse through a collection of imagination and visually stunning images generated by DALL-E AI</p>
    </div>
    <div className="mt-16">
      <FormField
      labelName="Search Post"
      type="text"
      name="text"
      placeholder="Search post"
      value={searchtext}
      handleChange={handleSearchChange}
      />
    </div>
    <div className="mt-10">
      {loading ? (
        <div className="flex  items-center justify-center ">
          <Loader />
        </div>
      ) : (
        <>
          {searchtext && (
            <h2 className="font-medium text-[#666e75] text-xl mb-3">
              Showing result for <span className='text-[#222328]' >{searchtext}</span>
            </h2>
          )}
          <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1">
            {searchtext ? (
              <RenderCard
                data={searchResult}
                title="No search results found"
              />
            ) : (
              <RenderCard
                data={allPost}
                title="No posts found"
              />
            )}
          </div>
        </>
      )}

    </div>
  </section>
)
}

export default Home