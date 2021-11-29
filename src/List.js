import { useState, useEffect } from 'react'
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer'
import InfiniteLoader from "react-window-infinite-loader";
import axios from 'axios'

import './list.css'

function Row({ index, style, data }) {
  const elem = data[index]

  return (
    <div
      style={style}
    >
      <div className="list-item">
      {elem.dish}
      </div>
    </div>
  )
}

function List() {
  const [data, setData] = useState([])
  const maxSize = 1000

  useEffect(() => {
    getData(setData)
  }, [])

  async function getData() {
    try {
      const { data: results } = await axios({
        method: 'get',
        url: 'https://random-data-api.com/api/food/random_food',
        params: {
          size: 100
        }
      })

      setData(data => data.concat(results))
    } catch(error) {
      console.error(error)
    }
  }

  const stopLoadMore = data.length >= maxSize

  return (
    <div
      className='list'
    >
      <AutoSizer>
        {({height, width}) => (
          <InfiniteLoader
            isItemLoaded={index => stopLoadMore ? true : index < data.length - 1}
            itemCount={data.length}
            loadMoreItems={() => getData()}
          >
            {({ onItemsRendered, ref }) => (
              <FixedSizeList
                height={height}
                width={width}
                itemSize={40}
                itemData={data}
                itemCount={data.length}
                onItemsRendered={onItemsRendered}
                ref={ref}
              >
              {Row}
              </FixedSizeList>
            )}
          </InfiniteLoader>
        )}
      </AutoSizer>
    </div>
  );
}

export default List
